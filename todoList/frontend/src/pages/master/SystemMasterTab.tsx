import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Checkbox, MenuItem, Select, Stack, TextField } from '@mui/material';
import {
  MstSystem,
  RowErrors,
  getSystemList,
  saveSystemList,
  deleteSystemList,
  updateRowError,
} from '../../common/masterCommon';
import { Messages } from '../../constants/messages';

/**
 * システムマスタ管理タブ
 */
const SystemMasterTab = () => {
  const [systems, setSystems] = useState<MstSystem[]>([]);

  /** 排他制御：登録処理中フラグ */
  const [isSavingSystem, setIsSavingSystem] = useState(false);

  /** 変更状態管理フラグ */
  const [isSystemChanged, setIsSystemChanged] = useState(false);

  /** 選択行のキーセット（マルチ選択削除用） */
  const [selectedSystemKeys, setSelectedSystemKeys] = useState<Set<string>>(new Set());

  /** インラインエラー状態 */
  const [systemErrors, setSystemErrors] = useState<RowErrors>({});

  /**
   * 初期データ取得
   */
  useEffect(() => {
    const init = async () => {
      const systemList = await getSystemList();
      setSystems(systemList);
    };

    try {
      init();
    } catch (e) {
      // error
    }
  }, []);

  /** --- システムマスタ 選択・削除 --- */

  const handleSelectSystem = (key: string, checked: boolean) => {
    const next = new Set(selectedSystemKeys);
    checked ? next.add(key) : next.delete(key);
    setSelectedSystemKeys(next);
  };

  const handleSelectAllSystem = (checked: boolean) => {
    setSelectedSystemKeys(checked ? new Set(systems.map(s => s.cd)) : new Set());
  };

  const handleDeleteSystem = async () => {
    if (selectedSystemKeys.size === 0) return;
    if (!window.confirm(`選択した ${selectedSystemKeys.size} 件を削除してもよろしいですか？`)) return;
    try {
      const targets = systems.filter(s => selectedSystemKeys.has(s.cd));
      await deleteSystemList(targets);
      alert("削除しました。");
      const newList = await getSystemList();
      setSystems(newList);
      setSelectedSystemKeys(new Set());
      setSystemErrors({});
    } catch (e) {
      alert("削除に失敗しました。");
    }
  };

  /**
   * システムマスタのセル値変更処理
   * @param index 行インデックス
   * @param field 変更フィールド
   * @param value 変更値
   */
  const handleSystemChange = (index: number, field: keyof MstSystem, value: string) => {
    const newList = [...systems];
    newList[index][field] = value;
    setSystems(newList);
    setIsSystemChanged(true);

    // フィールドバリデーション
    let errMsg = "";
    if (field === "systemName" && value.length > Messages.maxLength.systemName) {
      errMsg = Messages.error.system.systemName;
    } else if (field === "note" && value.length > Messages.maxLength.note) {
      errMsg = Messages.error.system.note;
    } else if (field === "biko" && value.length > Messages.maxLength.biko) {
      errMsg = Messages.error.system.biko;
    }
    updateRowError(setSystemErrors, index, field, errMsg);
  };

  /**
   * システムマスタの行追加処理
   * 既存CDの最大値+1を3桁ゼロパディングで自動採番する
   */
  const handleAddSystem = () => {
    const maxCd = systems.reduce((max, s) => {
      const num = parseInt(s.cd, 10);
      return isNaN(num) ? max : Math.max(max, num);
    }, 0);
    const nextCd = String(maxCd + 1).padStart(3, "0");
    setSystems([...systems, { cd: nextCd, systemName: "", note: "", biko: "", yukoFlag: "1" }]);
    setIsSystemChanged(true);
  };

  /**
   * システムマスタの登録処理
   * 排他制御により二重送信を防止する
   * 登録完了後に再描画確認ダイアログを表示する
   */
  const handleRegisterSystem = async () => {
    // 排他制御：登録処理中は再実行を禁止
    if (isSavingSystem) {
      return;
    }
    // インラインエラーチェック
    const hasErrors = Object.values(systemErrors).some(row => Object.keys(row).length > 0);
    if (hasErrors) {
      alert("入力内容にエラーがあります。確認してください。");
      return;
    }
    try {
      const entry = window.confirm("登録してもよろしいですか？");
      if (!entry) {
        return;
      }
      setIsSavingSystem(true);
      // システム名が未入力の行を除外して登録対象とする
      const saveTargets = systems.filter(s => s.systemName.trim() !== "");
      if (saveTargets.length === 0) {
        alert("登録可能なデータがありません。システム名を入力してください。");
        return;
      }
      const result = await saveSystemList(saveTargets);
      if (result.status === "OK") {
        setIsSystemChanged(false);
        alert("登録しました。");
        // 登録完了後に再描画
        const newList = await getSystemList();
        setSystems(newList);
        setSystemErrors({});
      } else {
        alert("登録に失敗しました");
      }
    } catch (e) {
      alert("登録に失敗しました。");
    } finally {
      setIsSavingSystem(false);
    }
  };

  return (
    <div>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }} alignItems="center">
        <Button variant="contained" color="primary" onClick={handleRegisterSystem} disabled={isSavingSystem}>
          {isSavingSystem ? "登録中..." : "登録"}
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddSystem} disabled={isSavingSystem}>
          追加
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteSystem}
          disabled={selectedSystemKeys.size === 0}>
          削除
        </Button>
        {selectedSystemKeys.size > 0 && (
          <span style={{ color: "#d32f2f" }}>{selectedSystemKeys.size} 件選択中</span>
        )}
        {/* 変更状態メッセージ */}
        {isSystemChanged && (
          <span style={{ color: "#d32f2f", fontWeight: "bold" }}>変更されています</span>
        )}
      </Stack>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: "auto" }}>
          <Table sx={{ minWidth: 700 }} aria-label="system table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ backgroundColor: "#90bef3dc" }}>
                  <Checkbox
                    indeterminate={selectedSystemKeys.size > 0 && selectedSystemKeys.size < systems.length}
                    checked={systems.length > 0 && selectedSystemKeys.size === systems.length}
                    onChange={(e) => handleSelectAllSystem(e.target.checked)}
                  />
                </TableCell>
                <TableCell align="center" sx={{ width: 100, borderRight: "1px solid #4e4c4c", backgroundColor: "#90bef3dc" }}>CD</TableCell>
                <TableCell align="center" sx={{ width: 200, borderRight: "1px solid #4e4c4c", backgroundColor: "#90bef3dc" }}>システム名</TableCell>
                <TableCell align="center" sx={{ width: 250, borderRight: "1px solid #4e4c4c", backgroundColor: "#90bef3dc" }}>内容</TableCell>
                <TableCell align="center" sx={{ width: 250, borderRight: "1px solid #4e4c4c", backgroundColor: "#90bef3dc" }}>備考</TableCell>
                <TableCell align="center" sx={{ width: 100, backgroundColor: "#90bef3dc" }}>有効フラグ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {systems.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedSystemKeys.has(row.cd)}
                      onChange={(e) => handleSelectSystem(row.cd, e.target.checked)}
                    />
                  </TableCell>
                  <TableCell>
                    {/* CDは自動採番のためreadOnly表示 */}
                    <TextField variant="outlined" size="small" sx={{ width: "100%" }}
                      value={row.cd}
                      slotProps={{ input: { readOnly: true } }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined" size="small" sx={{ width: "100%" }}
                      value={row.systemName}
                      error={!!systemErrors[index]?.systemName}
                      helperText={systemErrors[index]?.systemName}
                      onChange={(e) => handleSystemChange(index, "systemName", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined" size="small" sx={{ width: "100%" }}
                      value={row.note ?? ""}
                      error={!!systemErrors[index]?.note}
                      helperText={systemErrors[index]?.note}
                      onChange={(e) => handleSystemChange(index, "note", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined" size="small" sx={{ width: "100%" }}
                      value={row.biko ?? ""}
                      error={!!systemErrors[index]?.biko}
                      helperText={systemErrors[index]?.biko}
                      onChange={(e) => handleSystemChange(index, "biko", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Select value={row.yukoFlag} size="small" fullWidth
                      onChange={(e) => handleSystemChange(index, "yukoFlag", e.target.value)}>
                      <MenuItem value="1">有効</MenuItem>
                      <MenuItem value="0">無効</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default SystemMasterTab;
