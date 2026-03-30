import { useEffect, useState } from 'react';
import { Messages } from '../../constants/messages';
import { getTaskList, getProjectList, getProgressStatus, getDeployStatus, deleteTask, createTask } from './api';
import { getRowKey } from './utils';
import type { TodoList, MstProject, MstCode, RowErrors } from './types';

/**
 * タスクリスト画面の状態とロジックを管理するカスタムフック。
 * UI コンポーネントはこのフックが返す値とハンドラのみを使用する。
 */
export const useTaskList = () => {
  // ── マスタデータ ──────────────────────────────────────────────────────────
  const [projectsCodes, setProjectsCodes] = useState<MstProject[]>([]);
  const [statusCodes,   setStatusCodes]   = useState<MstCode[]>([]);
  const [deployCodes,   setDeployCodes]   = useState<MstCode[]>([]);

  // ── タスク一覧・選択状態 ──────────────────────────────────────────────────
  const [tasks,        setTasks]        = useState<TodoList[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  // ── フィルタ（入力値 / 適用済みの2段階管理） ─────────────────────────────
  const [filterProjectCd, setFilterProjectCd] = useState("");
  const [filterStatusCd,  setFilterStatusCd]  = useState("");
  const [filterDeployCd,  setFilterDeployCd]  = useState("");
  /** 「絞込」ボタン押下時に確定するフィルタ値 */
  const [appliedFilter, setAppliedFilter] = useState({ projectCd: "", statusCd: "", deployCd: "" });

  // ── 入力バリデーションエラー ──────────────────────────────────────────────
  const [taskErrors, setTaskErrors] = useState<RowErrors>({});

  // 初回レンダリング時にタスク一覧・マスタデータを並列取得する
  useEffect(() => {
    (async () => {
      try {
        const [lst, sc, dc, pc] = await Promise.all([
          getTaskList(), getProgressStatus(), getDeployStatus(), getProjectList(),
        ]);
        setTasks(lst);
        setStatusCodes(sc);
        setDeployCodes(dc);
        setProjectsCodes(pc);
      } catch (_) {}
    })();
  }, []);

  /**
   * 登録ボタン押下: バリデーション確認後にタスクを一括登録・更新する。
   * プロジェクトCDとチケット番号が空の行は登録対象から除外する。
   */
  const handleRegister = async () => {
    if (Object.values(taskErrors).some(r => Object.keys(r).length > 0)) {
      alert("入力内容にエラーがあります。"); return;
    }
    if (!window.confirm("登録してもよろしいですか？")) return;
    try {
      const t = tasks.filter(t => t.projectCd.trim() !== "" && t.ticketNo.trim() !== "");
      if (!t.length) { alert("登録可能なデータがありません。"); return; }
      const res = await createTask(t);
      if (res.status === "OK") {
        alert("登録しました。");
        setTasks(await getTaskList());
        setTaskErrors({});
      } else {
        alert("登録に失敗しました");
      }
    } catch (_) { alert("登録に失敗しました。"); }
  };

  /**
   * 追加ボタン押下: 入力用の空行をタスク一覧の末尾に追加する。
   * systemCd / projectCd には仮のUUIDをセットし、一意キーとして利用する。
   */
  const handleAddRow = () => setTasks([...tasks, {
    systemCd: crypto.randomUUID(), projectCd: crypto.randomUUID(), ticketNo: "",
    systemName: "", projectName: "", statusNm: "", deployNm: "",
    revisionNo: "", statusCd: "0", deployCd: "0", note: "", biko: "", yukoFlag: "0",
  }]);

  /**
   * セル値変更時の処理。
   * 変更値をstateに反映しつつ、フィールドごとの最大文字数バリデーションを行う。
   * @param index - 変更対象の行インデックス（tasks配列上の位置）
   * @param field - 変更対象のフィールド名
   * @param value - 変更後の値
   */
  const handleChange = (index: number, field: keyof TodoList, value: string) => {
    const nt = [...tasks];
    nt[index] = { ...nt[index], [field]: value };
    setTasks(nt);

    let e = "";
    if      (field === "ticketNo"   && value.length > Messages.maxLength.ticketNo)   e = Messages.error.todo.ticketNo;
    else if (field === "revisionNo" && value.length > Messages.maxLength.revisionNo) e = Messages.error.todo.revisionNo;
    else if (field === "note"       && value.length > Messages.maxLength.note)       e = Messages.error.todo.note;
    else if (field === "biko"       && value.length > Messages.maxLength.biko)       e = Messages.error.todo.biko;

    // エラーメッセージを行・フィールド単位で更新する
    setTaskErrors(prev => {
      const r = { ...(prev[index] || {}) };
      if (e) r[field] = e; else delete r[field];
      if (!Object.keys(r).length) { const n = { ...prev }; delete n[index]; return n; }
      return { ...prev, [index]: r };
    });
  };

  /** チェックボックス単体の選択/解除 */
  const handleSelectRow = (key: string, checked: boolean) => {
    const s = new Set(selectedKeys);
    checked ? s.add(key) : s.delete(key);
    setSelectedKeys(s);
  };

  /** ヘッダーチェックボックスによる全件選択/解除（フィルタ表示中の行のみ対象） */
  const handleSelectAll = (checked: boolean, filteredTasks: TodoList[]) =>
    setSelectedKeys(checked ? new Set(filteredTasks.map(getRowKey)) : new Set());

  /** 「絞込」ボタン押下: フィルタ入力値を確定し、選択状態をリセットする */
  const handleApplyFilter = () => {
    setAppliedFilter({ projectCd: filterProjectCd, statusCd: filterStatusCd, deployCd: filterDeployCd });
    setSelectedKeys(new Set());
  };

  /**
   * 削除ボタン押下: 選択行をサーバーおよびローカルstateから削除する。
   * チケット番号が空の行（未保存の追加行）はAPI呼び出しをスキップしてローカルのみ削除する。
   */
  const handleDelete = async () => {
    if (!selectedKeys.size) { alert("削除する行を選択してください。"); return; }
    if (!window.confirm(`選択した ${selectedKeys.size} 件を削除してもよろしいですか？`)) return;
    try {
      const sel   = tasks.filter(t => selectedKeys.has(getRowKey(t)));
      // チケット番号がある行（DB保存済み）のみAPIで削除する
      const saved = sel.filter(t => t.ticketNo !== "");
      if (saved.length) await deleteTask(saved);
      setTasks(tasks.filter(t => !selectedKeys.has(getRowKey(t))));
      setSelectedKeys(new Set());
      setTaskErrors({});
      alert("削除しました。");
    } catch (_) { alert("削除に失敗しました。"); }
  };

  /** 適用済みフィルタ条件に基づいてタスク一覧を絞り込む（空条件は全件マッチ） */
  const filteredTasks = tasks.filter(t =>
    (!appliedFilter.projectCd || t.projectCd === appliedFilter.projectCd) &&
    (!appliedFilter.statusCd  || t.statusCd  === appliedFilter.statusCd)  &&
    (!appliedFilter.deployCd  || t.deployCd  === appliedFilter.deployCd)
  );

  return {
    // マスタデータ
    projectsCodes, statusCodes, deployCodes,
    // タスク・フィルタ後タスク
    tasks, filteredTasks,
    // 選択状態
    selectedKeys,
    // フィルタ入力値
    filterProjectCd, setFilterProjectCd,
    filterStatusCd,  setFilterStatusCd,
    filterDeployCd,  setFilterDeployCd,
    // エラー
    taskErrors,
    // ハンドラ
    handleRegister, handleAddRow, handleChange,
    handleSelectRow, handleSelectAll, handleApplyFilter, handleDelete,
  };
};
