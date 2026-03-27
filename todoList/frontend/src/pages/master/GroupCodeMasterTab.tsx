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
  MstGroupCode,
  RowErrors,
  getGroupCodeList,
  saveGroupCodeList,
  deleteGroupCodeList,
  updateRowError,
} from '../../common/masterCommon';
import { Messages } from '../../constants/messages';

/**
 * コードグループマスタ管理タブ
 */
const GroupCodeMasterTab = () => {
  const [groupCodes, setGroupCodes] = useState<MstGroupCode[]>([]);

  /** 排他制御：登録処理中フラグ */
  const [isSavingGroupCode, setIsSavingGroupCode] = useState(false);

  /** 変更状態管理フラグ */
  const [isGroupCodeChanged, setIsGroupCodeChanged] = useState(false);

  /** 選択行のキーセット（マルチ選択削除用） */
  const [selectedGroupCodeKeys, setSelectedGroupCodeKeys] = useState<Set<string>>(new Set());

  /** インラインエラー状態 */
  const [groupCodeErrors, setGroupCodeErrors] = useState<RowErrors>({});

  /**
   * 初期データ取得
   */
  useEffect(() => {
    const init = async () => {
      const groupCodeList = await getGroupCodeList();
      setGroupCodes(groupCodeList);
    };

    try {
      init();
    } catch (e) {
      // error
    }
  }, []);

  /** --- コードグループマスタ 選択・削除 --- */

  const handleSelectGroupCode = (key: string, checked: boolean) => {
    const next = new Set(selectedGroupCodeKeys);
    checked ? next.add(key) : next.delete(key);
    setSelectedGroupCodeKeys(next);
  };

  const handleSelectAllGroupCode = (checked: boolean) => {
    setSelectedGroupCodeKeys(checked ? new Set(groupCodes.map(g => g.cd)) : new Set());
  };

  const handleDeleteGroupCode = async () => {
    if (selectedGroupCodeKeys.size === 0) return;
    if (!window.confirm(`選択した ${selectedGroupCodeKeys.size} 件を削除してもよろしいですか？`)) return;
    try {
      const targets = groupCodes.filter(g => selectedGroupCodeKeys.has(g.cd));
      await deleteGroupCodeList(targets);
      alert("削除しました。");
      const newList = await getGroupCodeList();
      setGroupCodes(newList);
      setSelectedGroupCodeKeys(new Set());
      setGroupCodeErrors({});
    } catch (e) {
      alert("削除に失敗しました。");
    }
  };

  /**
   * コードグループマスタのセル値変更処理
   * @param index 行インデックス
   * @param field 変更フィールド
   * @param value 変更値
   */
  const handleGroupCodeChange = (index: number, field: keyof MstGroupCode, value: string) => {
    const newList = [...groupCodes];
    newList[index][field] = value;
    setGroupCodes(newList);
    setIsGroupCodeChanged(true);

    // フィールドバリデーション
    let errMsg = "";
    if (field === "cd" && value.length > Messages.maxLength.groupCodeCd) {
      errMsg = Messages.error.groupCode.cd;
    } else if (field === "cdName" && value.length > Messages.maxLength.groupCodeName) {
      errMsg = Messages.error.groupCode.cdName;
    } else if (field === "note" && value.length > Messages.maxLength.note) {
      errMsg = Messages.error.groupCode.note;
    } else if (field === "biko" && value.length > Messages.maxLength.biko) {
      errMsg = Messages.error.groupCode.biko;
    }
    updateRowError(setGroupCodeErrors, index, field, errMsg);
  };

  /**
   * コードグループマスタの行追加処理
   */
  const handleAddGroupCode = () => {
    setGroupCodes([...groupCodes, { cd: "", cdName: "", note: "", biko: "", yukoFlag: "1" }]);
    setIsGroupCodeChanged(true);
  };

  /**
   * コードグループマスタの登録処理
   * 排他制御により二重送信を防止する
   */
  const handleRegisterGroupCode = async () => {
    // 排他制御：登録処理中は再実行を禁止
    if (isSavingGroupCode) {
      return;
    }
    // インラインエラーチェック
    const hasErrors = Object.values(groupCodeErrors).some(row => Object.keys(row).length > 0);
    if (hasErrors) {
      alert("入力内容にエラーがあります。確認してください。");
      return;
    }
    try {
      const entry = window.confirm("登録してもよろしいですか？");
      if (!entry) {
        return;
      }
      setIsSavingGroupCode(true);
      // CD・コードグループ名称がいずれも入力済みの行のみ登録対象とする
      const saveTargets = groupCodes.filter(
        g => g.cd.trim() !== "" && g.cdName.trim() !== ""
      );
      if (saveTargets.length === 0) {
        alert("登録可能なデータがありません。CD・コードグループ名称を入力してください。");
        return;
      }
      const result = await saveGroupCodeList(saveTargets);
      if (result.status === "OK") {
        setIsGroupCodeChanged(false);
        alert("登録しました。");
        // 登録完了後に再描画
        const newList = await getGroupCodeList();
        setGroupCodes(newList);
        setGroupCodeErrors({});
      } else {
        alert("登録に失敗しました");
      }
    } catch (e) {
      alert("登録に失敗しました。");
    } finally {
      setIsSavingGroupCode(false);
    }
  };

  return (
    <div>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }} alignItems="center">
        <Button variant="contained" color="primary" onClick={handleRegisterGroupCode} disabled={isSavingGroupCode}>
          {isSavingGroupCode ? "登録中..." : "登録"}
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddGroupCode} disabled={isSavingGroupCode}>
          追加
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteGroupCode}
          disabled={selectedGroupCodeKeys.size === 0}>
          削除
        </Button>
        {selectedGroupCodeKeys.size > 0 && (
          <span style={{ color: "#d32f2f" }}>{selectedGroupCodeKeys.size} 件選択中</span>
        )}
        {/* 変更状態メッセージ */}
        {isGroupCodeChanged && (
          <span style={{ color: "#d32f2f", fontWeight: "bold" }}>変更されています</span>
        )}
      </Stack>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: "auto" }}>
          <Table sx={{ minWidth: 700 }} aria-label="group code table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ backgroundColor: "#90bef3dc" }}>
                  <Checkbox
                    indeterminate={selectedGroupCodeKeys.size > 0 && selectedGroupCodeKeys.size < groupCodes.length}
                    checked={groupCodes.length > 0 && selectedGroupCodeKeys.size === groupCodes.length}
                    onChange={(e) => handleSelectAllGroupCode(e.target.checked)}
                  />
                </TableCell>
                <TableCell align="center" sx={{ width: 100, borderRight: "1px solid #4e4c4c", backgroundColor: "#90bef3dc" }}>CD</TableCell>
                <TableCell align="center" sx={{ width: 200, borderRight: "1px solid #4e4c4c", backgroundColor: "#90bef3dc" }}>コードグループ名称</TableCell>
                <TableCell align="center" sx={{ width: 250, borderRight: "1px solid #4e4c4c", backgroundColor: "#90bef3dc" }}>内容</TableCell>
                <TableCell align="center" sx={{ width: 250, borderRight: "1px solid #4e4c4c", backgroundColor: "#90bef3dc" }}>備考</TableCell>
                <TableCell align="center" sx={{ width: 100, backgroundColor: "#90bef3dc" }}>有効フラグ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupCodes.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedGroupCodeKeys.has(row.cd)}
                      onChange={(e) => handleSelectGroupCode(row.cd, e.target.checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined" size="small" sx={{ width: "100%" }}
                      value={row.cd}
                      error={!!groupCodeErrors[index]?.cd}
                      helperText={groupCodeErrors[index]?.cd}
                      onChange={(e) => handleGroupCodeChange(index, "cd", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined" size="small" sx={{ width: "100%" }}
                      value={row.cdName}
                      error={!!groupCodeErrors[index]?.cdName}
                      helperText={groupCodeErrors[index]?.cdName}
                      onChange={(e) => handleGroupCodeChange(index, "cdName", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined" size="small" sx={{ width: "100%" }}
                      value={row.note ?? ""}
                      error={!!groupCodeErrors[index]?.note}
                      helperText={groupCodeErrors[index]?.note}
                      onChange={(e) => handleGroupCodeChange(index, "note", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined" size="small" sx={{ width: "100%" }}
                      value={row.biko ?? ""}
                      error={!!groupCodeErrors[index]?.biko}
                      helperText={groupCodeErrors[index]?.biko}
                      onChange={(e) => handleGroupCodeChange(index, "biko", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Select value={row.yukoFlag} size="small" fullWidth
                      onChange={(e) => handleGroupCodeChange(index, "yukoFlag", e.target.value)}>
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

export default GroupCodeMasterTab;
