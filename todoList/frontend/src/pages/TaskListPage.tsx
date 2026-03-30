import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { apiFetch } from '../common/apiClient';
import { Messages } from '../constants/messages';
import Button from '@mui/material/Button';
import { Checkbox, MenuItem, Stack, TextField } from '@mui/material';


export interface MstProject {
  systemCd: string;
  cd: string;
  projectName: string;
}

export interface MstCode {
  grCd: string;
  cd: string;
  cdName: string;
  color: string;
}

export interface TodoListKey {
  systemCd: string;
  projectCd: string;
  ticketNo: string;

}


export interface TodoList extends TodoListKey {
  systemName:string;
  projectName:string;
  statusNm:string;
  deployNm:string;
  revisionNo: string;
  statusCd: string;
  deployCd: string;
  note: string;
  biko: string;
  yukoFlag: string;
/*
  insDate: Date;
  insUserId: string;
  updDate: Date;
  updUserId: string;
*/
}

/** エラー状態の型 */
type RowErrors = { [idx: number]: { [field: string]: string } };

/**
 * TODOリストの取得
 * @returns
 */
const getTaskList = async (): Promise<TodoList[]>  => {
      const res = await apiFetch("api/todoList", {
        method:"POST",
      });

      if(!res.ok){
        throw new Error("fetch failed");
      }
      return  await  res.json();
}


const getProjectList = async (): Promise<MstProject[]>  => {
      const data: MstProject = {
        systemCd:"001",
        cd:"",
        projectName:""
      }
      const res = await apiFetch("api/getMstProjectCbbList", {
        method:"POST",
        body:JSON.stringify(data),
      });

      if(!res.ok){
        throw new Error("fetch failed");
      }

      return  await  res.json();
}

/**
 * 進捗状態の取得
 * @returns
 */
const getProgressStatusName = async():Promise<MstCode[]> => {

      const data: MstCode = {
        grCd:"001",
        cd:"",
        cdName:"",
        color:""
      }
      const res = await apiFetch("api/getMstCodeCbbList", {
        method:"POST",
        body:JSON.stringify(data),
      });
      if(!res.ok){
        throw new Error("fetch failed");
      }

      return await res.json();
}

/**
 * デプロイ状態の取得
 * @returns
 */
const getDeployStatusName = async():Promise<MstCode[]> => {
      const data: MstCode = {
        grCd:"002",
        cd:"",
        cdName:"",
        color:""
      }
      const res = await apiFetch("api/getMstCodeCbbList", {
        method:"POST",
        body:JSON.stringify(data),
      });
      if(!res.ok){
        throw new Error("fetch failed");
      }

      return await res.json();
}

/**
 * TODOリストの削除
 * @param tasks 削除対象リスト
 * @returns 処理結果
 */
const deleteTask = async (tasks: TodoList[]) => {
  const res = await apiFetch("api/todoDelete", {
    method: "POST",
    body: JSON.stringify(tasks),
  });

  if (!res.ok) {
    throw new Error("fetch failed");
  }

  return await res.json();
};

/**
 * TODOリストの登録
 * @param tasks
 * @returns
 */
const createTask = async (tasks:TodoList[]) => {
  const res = await apiFetch("api/todoRegister", {
    method:"POST",
    body:JSON.stringify(tasks),
  });

  if(!res.ok){
    throw new Error("fetch failed");
  }

  return  await  res.json();
}


/**
 * TODOリストのページ
 * @returns
 */
/**
 * 行を一意に識別するキーを生成する
 * @param row TODOリスト行
 * @returns 複合キー文字列
 */
const getRowKey = (row: TodoList): string => {
  return `${row.systemCd}_${row.projectCd}_${row.ticketNo}`;
};

/**
 * TODOリストのページ
 * @returns
 */
const TaskListPage = () => {
  const [projectsCodes, setProjectsCodes] = useState<MstProject[]>([]);
  const [statusCodes, setStatusCodes] = useState<MstCode[]>([]);
  const [deployCodes, setDeployCodes] = useState<MstCode[]>([]);
  const [tasks, setTasks] = useState<TodoList[]>([]);
  /** 選択行のキーセット（マルチ選択削除用） */
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  /** 絞込み入力値 */
  const [filterProjectCd, setFilterProjectCd] = useState("");
  const [filterStatusCd, setFilterStatusCd] = useState("");
  const [filterDeployCd, setFilterDeployCd] = useState("");
  /** 適用済み絞込み条件 */
  const [appliedFilter, setAppliedFilter] = useState({ projectCd: "", statusCd: "", deployCd: "" });

  /** インラインエラー状態 */
  const [taskErrors, setTaskErrors] = useState<RowErrors>({});

  /**
   * TODOリストの初期化
   */
  useEffect(() =>  {

    const init = async () => {
      const lst = await getTaskList();
      setTasks(lst);
      const statusCdList = await getProgressStatusName();
      setStatusCodes(statusCdList);
      const deployCdList = await getDeployStatusName();
      setDeployCodes(deployCdList);
      const projectList = await getProjectList();
      setProjectsCodes(projectList);

    }
    try{
      init();
      console.log(tasks.length);
    }catch(e){

    }

  },[]);

  const handleRegister = async() => {
    // インラインエラーチェック
    const hasErrors = Object.values(taskErrors).some(row => Object.keys(row).length > 0);
    if (hasErrors) {
      alert("入力内容にエラーがあります。確認してください。");
      return;
    }
    try{
      const entry = window.confirm("登録してもよろしいですか？");
      if(!entry){
        return;
      }
      // プロジェクトCDとチケット番号が入力済みの行のみ登録対象とする
      const saveTargets = tasks.filter(
        t => t.projectCd.trim() !== "" && t.ticketNo.trim() !== ""
      );
      if (saveTargets.length === 0) {
        alert("登録可能なデータがありません。プロジェクトとチケット番号を入力してください。");
        return;
      }
      const result = await createTask(saveTargets);
      if (result.status === "OK") {
        alert("登録しました。");
        // 登録完了後に再描画
        const newList = await getTaskList();
        setTasks(newList);
        setTaskErrors({});
      } else {
        alert("登録に失敗しました");
      }

    }catch(e){
      alert("登録に失敗しました。");
    }
  }

  /**
   * TODOリストの行追加処理
   */
  const handleAddRow = () => {
    setTasks([...tasks, {
      systemCd: crypto.randomUUID(),
      projectCd: crypto.randomUUID(),
      ticketNo: "",
      systemName: "",
      projectName: "",
      statusNm: "",
      deployNm: "",
      revisionNo: "",
      statusCd: "0",
      deployCd: "0",
      note: "",
      biko: "",
      yukoFlag: "0"
    }]);
  }

  /**
   * 入力データを反映する処理
   * @param index 行インデックス
   * @param field 変更フィールド
   * @param value 変更値
   */
  const handleChange  =  (
    index:number,
    field:keyof TodoList,
    value:string
  ) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);

    // フィールドバリデーション
    let errMsg = "";
    if (field === "ticketNo" && value.length > Messages.maxLength.ticketNo) {
      errMsg = Messages.error.todo.ticketNo;
    } else if (field === "revisionNo" && value.length > Messages.maxLength.revisionNo) {
      errMsg = Messages.error.todo.revisionNo;
    } else if (field === "note" && value.length > Messages.maxLength.note) {
      errMsg = Messages.error.todo.note;
    } else if (field === "biko" && value.length > Messages.maxLength.biko) {
      errMsg = Messages.error.todo.biko;
    }

    setTaskErrors(prev => {
      const rowErrs = { ...(prev[index] || {}) };
      if (errMsg) {
        rowErrs[field] = errMsg;
      } else {
        delete rowErrs[field];
      }
      if (Object.keys(rowErrs).length === 0) {
        const next = { ...prev };
        delete next[index];
        return next;
      }
      return { ...prev, [index]: rowErrs };
    });
  }

  /**
   * 行のチェックボックス変更処理
   * @param key 行の一意キー
   * @param checked チェック状態
   */
  const handleSelectRow = (key: string, checked: boolean) => {
    const newKeys = new Set(selectedKeys);
    if (checked) {
      newKeys.add(key);
    } else {
      newKeys.delete(key);
    }
    setSelectedKeys(newKeys);
  };

  /**
   * 絞込み条件を適用する処理
   */
  const handleApplyFilter = () => {
    setAppliedFilter({ projectCd: filterProjectCd, statusCd: filterStatusCd, deployCd: filterDeployCd });
    setSelectedKeys(new Set());
  };

  /** 絞込み条件で絞り込んだ表示用タスクリスト */
  const filteredTasks = tasks.filter(t =>
    (appliedFilter.projectCd === "" || t.projectCd === appliedFilter.projectCd) &&
    (appliedFilter.statusCd === "" || t.statusCd === appliedFilter.statusCd) &&
    (appliedFilter.deployCd === "" || t.deployCd === appliedFilter.deployCd)
  );

  /**
   * 全選択・全解除処理（絞込み結果に対して適用）
   * @param checked チェック状態
   */
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedKeys(new Set(filteredTasks.map(getRowKey)));
    } else {
      setSelectedKeys(new Set());
    }
  };

  /**
   * 選択行の削除処理
   * DB登録済み行はAPIで物理削除、未登録行はUIから除去する
   */
  const handleDelete = async () => {
    if (selectedKeys.size === 0) {
      alert("削除する行を選択してください。");
      return;
    }
    const entry = window.confirm(`選択した ${selectedKeys.size} 件を削除してもよろしいですか？`);
    if (!entry) {
      return;
    }
    try {
      // 選択行を分類：DB登録済み（ticketNoあり）と未登録（追加のみ）
      const selectedRows = tasks.filter(t => selectedKeys.has(getRowKey(t)));
      const savedRows = selectedRows.filter(t => t.ticketNo !== "");

      // DB登録済み行のみAPI削除
      if (savedRows.length > 0) {
        await deleteTask(savedRows);
      }

      // UIから選択行を除去
      setTasks(tasks.filter(t => !selectedKeys.has(getRowKey(t))));
      setSelectedKeys(new Set());
      setTaskErrors({});
      alert("削除しました。");
    } catch (e) {
      alert("削除に失敗しました。");
    }
  };


  return (
    <div style={{ width: "100%", minWidth: 0 }}>
      {/* 絞込みエリア */}
      <Stack direction="row" spacing={2} sx={{ mb: 1 }} alignItems="center">
        <Select value={filterProjectCd} size="small" displayEmpty sx={{ minWidth: 150 }}
          onChange={(e) => setFilterProjectCd(e.target.value)}>
          <MenuItem value="">プロジェクト（全て）</MenuItem>
          {projectsCodes.map(project => (
            <MenuItem key={project.cd} value={project.cd}>{project.projectName}</MenuItem>
          ))}
        </Select>
        <Select value={filterStatusCd} size="small" displayEmpty sx={{ minWidth: 150 }}
          onChange={(e) => setFilterStatusCd(e.target.value)}>
          <MenuItem value="">進捗状態（全て）</MenuItem>
          {statusCodes.map(code => (
            <MenuItem key={code.cd} value={code.cd}>{code.cdName}</MenuItem>
          ))}
        </Select>
        <Select value={filterDeployCd} size="small" displayEmpty sx={{ minWidth: 150 }}
          onChange={(e) => setFilterDeployCd(e.target.value)}>
          <MenuItem value="">デプロイ状態（全て）</MenuItem>
          {deployCodes.map(code => (
            <MenuItem key={code.cd} value={code.cd}>{code.cdName}</MenuItem>
          ))}
        </Select>
        <Button variant="outlined" color="primary" onClick={handleApplyFilter}>
          絞込
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }} alignItems="center">
        <Button variant="contained" color="primary" onClick={handleRegister}>
          登録
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddRow}>
          追加
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}
          disabled={selectedKeys.size === 0}>
          削除
        </Button>
        {/* 選択件数表示 */}
        {selectedKeys.size > 0 && (
          <span style={{ color: "#d32f2f" }}>{selectedKeys.size} 件選択中</span>
        )}
      </Stack>
      <TableContainer component={Paper} sx={{ maxHeight: 400, width: "100%", overflowX: "auto", overflowY: "auto" }}>
          <Table sx={{ minWidth: 1300 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ backgroundColor: "#90bef3dc" }}>
                  <Checkbox
                    indeterminate={selectedKeys.size > 0 && selectedKeys.size < filteredTasks.length}
                    checked={filteredTasks.length > 0 && selectedKeys.size === filteredTasks.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </TableCell>
                <TableCell align="center" sx={{width: 150, borderRight: "1px solid #4e4c4c" ,backgroundColor:"#90bef3dc"}}>プロジェクト</TableCell>
                <TableCell align="center" sx={{ width: 150, borderRight: "1px solid #4e4c4c" ,backgroundColor:"#90bef3dc"}}>チケット番号</TableCell>
                <TableCell align="center" sx={{ width: 150, borderRight: "1px solid #4e4c4c" ,backgroundColor:"#90bef3dc"}}>リビジョン番号</TableCell>
                <TableCell align="center" sx={{ width: 150, borderRight: "1px solid rgb(78, 76, 76)" ,backgroundColor:"#90bef3dc"}}>進捗状態&nbsp;</TableCell>
                <TableCell align="center" sx={{ width: 150, borderRight: "1px solid #4e4c4c" ,backgroundColor:"#90bef3dc"}}>デプロイ状態&nbsp;</TableCell>
                <TableCell align="center" sx={{ width: 250, borderRight: "1px solid #4e4c4c" ,backgroundColor:"#90bef3dc"}}>内容&nbsp;</TableCell>
                <TableCell align="center" sx={{ width: 250, backgroundColor:"#90bef3dc"}}>備考&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map((row) => {
                // 絞込み結果でのインデックスではなく、tasks配列内の実インデックスを使用する
                const index = tasks.indexOf(row);
                // 進捗状態・デプロイ状態のカラーコードを取得
                const statusColor = statusCodes.find(s => s.cd === row.statusCd)?.color ?? "";
                const deployColor = deployCodes.find(d => d.cd === row.deployCd)?.color ?? "";
                // 行背景色：デプロイ状態の色を優先、なければ進捗状態の色
                const rowBgColor = deployColor || statusColor || "inherit";
                // 進捗状態セルの背景色：デプロイ色が存在する場合は進捗色で上書き
                const statusCellBgColor = deployColor && statusColor ? statusColor : rowBgColor;
                return (
                <TableRow
                  key={row.projectCd + row.ticketNo}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    backgroundColor: rowBgColor,
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedKeys.has(getRowKey(row))}
                      onChange={(e) => handleSelectRow(getRowKey(row), e.target.checked)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Select value={row.projectCd} size='small' fullWidth
                            onChange={(e) => handleChange(index, "projectCd", e.target.value)}>
                      <MenuItem value="">選択してください</MenuItem>
                      {projectsCodes.map(project => (
                        <MenuItem key={project.cd} value={project.cd}>{project.projectName}</MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell align="right">
                    <TextField variant='outlined' size='small'
                      value={row.ticketNo}
                      error={!!taskErrors[index]?.ticketNo}
                      helperText={taskErrors[index]?.ticketNo}
                      onChange={(e) => handleChange(index, "ticketNo", e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField variant='outlined' size='small' sx={{width:"100%"}}
                      value={row.revisionNo}
                      error={!!taskErrors[index]?.revisionNo}
                      helperText={taskErrors[index]?.revisionNo}
                      onChange={(e) => handleChange(index, "revisionNo", e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: statusCellBgColor }}>
                    <Select value={row.statusCd} size='small' fullWidth
                            onChange={(e) => handleChange(index, "statusCd", e.target.value)}>
                      <MenuItem value="">選択してください</MenuItem>
                      {statusCodes.map(code => (
                        <MenuItem key={code.cd} value={code.cd}>{code.cdName}</MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    <Select value={row.deployCd} size='small' fullWidth
                            onChange={(e) => handleChange(index, "deployCd", e.target.value)}>
                      <MenuItem value="">選択してください</MenuItem>
                      {deployCodes.map(code => (
                        <MenuItem key={code.cd} value={code.cd}>{code.cdName}</MenuItem>
                      ))}
                    </Select>

                  </TableCell>
                  <TableCell align="right">
                    <TextField variant='outlined' size='small'
                      value={row.note} sx={{width:"100%"}}
                      error={!!taskErrors[index]?.note}
                      helperText={taskErrors[index]?.note}
                      onChange={(e) => handleChange(index, "note", e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField variant='outlined' size='small' sx={{width:"100%"}}
                      value={row.biko}
                      error={!!taskErrors[index]?.biko}
                      helperText={taskErrors[index]?.biko}
                      onChange={(e) => handleChange(index, "biko", e.target.value)}
                    />
                  </TableCell>
                </TableRow>
                );
              })}
            </TableBody>
          </Table>
      </TableContainer>
    </div>
  )
}

export default TaskListPage
