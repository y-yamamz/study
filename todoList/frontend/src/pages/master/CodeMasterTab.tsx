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
  MstCode,
  MstGroupCode,
  RowErrors,
  getCodeList,
  saveCodeList,
  deleteCodeList,
  getGroupCodeList,
  updateRowError,
} from '../../common/masterCommon';
import { Messages } from '../../constants/messages';

/**
 * コードマスタ管理タブ
 */
const CodeMasterTab = () => {
  const [codes, setCodes] = useState<MstCode[]>([]);
  const [groupCodes, setGroupCodes] = useState<MstGroupCode[]>([]);

  /** 排他制御：登録処理中フラグ */
  const [isSavingCode, setIsSavingCode] = useState(false);

  /** 変更状態管理フラグ */
  const [isCodeChanged, setIsCodeChanged] = useState(false);

  /** 選択行のキーセット（マルチ選択削除用） */
  const [selectedCodeKeys, setSelectedCodeKeys] = useState<Set<string>>(new Set());

  /** インラインエラー状態 */
  const [codeErrors, setCodeErrors] = useState<RowErrors>({});

  /**
   * 初期データ取得
   * コード一覧とグループCD選択用にコードグループ一覧も取得する
   */
  useEffect(() => {
    const init = async () => {
      const codeList = await getCodeList();
      setCodes(codeList);
      const groupCodeList = await getGroupCodeList();
      setGroupCodes(groupCodeList);
    };

    try {
      init();
    } catch (e) {
      // error
    }
  }, []);

  /** --- コードマスタ 選択・削除 --- */

  const handleSelectCode = (key: string, checked: boolean) => {
    const next = new Set(selectedCodeKeys);
    checked ? next.add(key) : next.delete(key);
    setSelectedCodeKeys(next);
  };

  const handleSelectAllCode = (checked: boolean) => {
    setSelectedCodeKeys(checked ? new Set(codes.map(c => `${c.grCd}_${c.cd}`)) : new Set());
  };

  const handleDeleteCode = async () => {
    if (selectedCodeKeys.size === 0) return;
    if (!window.confirm(`選択した ${selectedCodeKeys.size} 件を削除してもよろしいですか？`)) return;
    try {
      const targets = codes.filter(c => selectedCodeKeys.has(`${c.grCd}_${c.cd}`));
      await deleteCodeList(targets);
      alert("削除しました。");
      const newList = await getCodeList();
      setCodes(newList);
      setSelectedCodeKeys(new Set());
      setCodeErrors({});
    } catch (e) {
      alert("削除に失敗しました。");
    }
  };

  /**
   * コードマスタのセル値変更処理
   * @param index 行インデックス
   * @param field 変更フィールド
   * @param value 変更値
   */
  const handleCodeChange = (index: number, field: keyof MstCode, value: string) => {
    const newList = [...codes];
    newList[index][field] = value;
    setCodes(newList);
    setIsCodeChanged(true);

    // フィールドバリデーション
    let errMsg = "";
    if (field === "cd" && value.length > Messages.maxLength.codeCd) {
      errMsg = Messages.error.code.cd;
    } else if (field === "cdName" && value.length > Messages.maxLength.codeName) {
      errMsg = Messages.error.code.cdName;
    } else if (field === "color" && value.length > Messages.maxLength.color) {
      errMsg = Messages.error.code.color;
    } else if (field === "note" && value.length > Messages.maxLength.note) {
      errMsg = Messages.error.code.note;
    } else if (field === "biko" && value.length > Messages.maxLength.biko) {
      errMsg = Messages.error.code.biko;
    }
    updateRowError(setCodeErrors, index, field, errMsg);
  };

  /**
   * コードマスタの行追加処理
   */
  const handleAddCode = () => {
    setCodes([...codes, { grCd: "", cd: "", cdName: "", color: "", note: "", biko: "", yukoFlag: "1" }]);
    setIsCodeChanged(true);
  };

  /**
   * コードマスタの登録処理
   * 排他制御により二重送信を防止する
   */
  const handleRegisterCode = async () => {
    // 排他制御：登録処理中は再実行を禁止
    if (isSavingCode) {
      return;
    }
    // インラインエラーチェック
    const hasErrors = Object.values(codeErrors).some(row => Object.keys(row).length > 0);
    if (hasErrors) {
      alert("入力内容にエラーがあります。確認してください。");
      return;
    }
    try {
      const entry = window.confirm("登録してもよろしいですか？");
      if (!entry) {
        return;
      }
      setIsSavingCode(true);
      // グループCD・CD・コード名称がいずれも入力済みの行のみ登録対象とする
      const saveTargets = codes.filter(
        c => c.grCd.trim() !== "" && c.cd.trim() !== "" && c.cdName.trim() !== ""
      );
      if (saveTargets.length === 0) {
        alert("登録可能なデータがありません。グループCD・CD・コード名称を入力してください。");
        return;
      }
      const result = await saveCodeList(saveTargets);
      if (result.status === "OK") {
        setIsCodeChanged(false);
        alert("登録しました。");
        // 登録完了後に再描画
        const newList = await getCodeList();
        setCodes(newList);
        setCodeErrors({});
      } else {
        alert("登録に失敗しました");
      }
    } catch (e) {
      alert("登録に失敗しました。");
    } finally {
      setIsSavingCode(false);
    }
  };

  return (
    <div>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }} alignItems="center">
        <Button variant="contained" color="primary" onClick={handleRegisterCode} disabled={isSavingCode}>
          {isSavingCode ? "登録中..." : "登録"}
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddCode} disabled={isSavingCode}>
          追加
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteCode}
          disabled={selectedCodeKeys.size === 0}>
          削除
        </Button>
        {selectedCodeKeys.size > 0 && (
          <span style={{ color: "#d32f2f" }}>{selectedCodeKeys.size} 件選択中</span>
        )}
        {/* 変更状態メッセージ */}
        {isCodeChanged && (
          <span style={{ color: "#d32f2f", fontWeight: "bold" }}>変更されています</span>
        )}
      </Stack>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: "auto" }}>
          <Table sx={{ minWidth: 700 }} aria-label="code table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ backgroundColor: "#90bef3dc" }}>
                  <Checkbox
                    indeterminate={selectedCodeKeys.size > 0 && selectedCodeKeys.size < codes.length}
                    checked={codes.length > 0 && selectedCodeKeys.size === codes.length}
                    onChange={(e) => handleSelectAllCode(e.target.checked)}
                  />
                </TableCell>
                <TableCell align="center" sx={{ width: 100, borderRight: "1px solid #4e4c4c", backgroundColor: "#90bef3dc" }}>グループCD</TableCell>
                <TableCell align="center" sx={{ width: 100, borderRight: "1px solid #4e4c4c", backgroundColor: "#90bef3dc" }}>CD</TableCell>
                <TableCell align="center" sx={{ width: 200, borderRight: "1px solid #4e4c4c", backgroundColor: "#90bef3dc" }}>コード名称</TableCell>
                <TableCell align="center" sx={{ width: 160, borderRight: "1px solid #4e4c4c", backgroundColor: "#90bef3dc" }}>カラー</TableCell>
                <TableCell align="center" sx={{ width: 250, borderRight: "1px solid #4e4c4c", backgroundColor: "#90bef3dc" }}>内容</TableCell>
                <TableCell align="center" sx={{ width: 250, borderRight: "1px solid #4e4c4c", backgroundColor: "#90bef3dc" }}>備考</TableCell>
                <TableCell align="center" sx={{ width: 100, backgroundColor: "#90bef3dc" }}>有効フラグ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {codes.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCodeKeys.has(`${row.grCd}_${row.cd}`)}
                      onChange={(e) => handleSelectCode(`${row.grCd}_${row.cd}`, e.target.checked)}
                    />
                  </TableCell>
                  <TableCell>
                    {/* グループCDはコードグループマスタから選択、表示はコードグループ名 */}
                    <Select value={row.grCd} size="small" fullWidth
                      onChange={(e) => handleCodeChange(index, "grCd", e.target.value)}>
                      <MenuItem value="">選択してください</MenuItem>
                      {groupCodes.map(gc => (
                        <MenuItem key={gc.cd} value={gc.cd}>{gc.cdName}</MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined" size="small" sx={{ width: "100%" }}
                      value={row.cd}
                      error={!!codeErrors[index]?.cd}
                      helperText={codeErrors[index]?.cd}
                      onChange={(e) => handleCodeChange(index, "cd", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined" size="small" sx={{ width: "100%" }}
                      value={row.cdName}
                      error={!!codeErrors[index]?.cdName}
                      helperText={codeErrors[index]?.cdName}
                      onChange={(e) => handleCodeChange(index, "cdName", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    {/* カラーピッカーとテキスト入力を並べて表示 */}
                    <Stack direction="row" spacing={1} alignItems="center">
                      <input
                        type="color"
                        value={row.color || "#ffffff"}
                        onChange={(e) => handleCodeChange(index, "color", e.target.value)}
                        style={{ width: 36, height: 36, border: "none", padding: 0, cursor: "pointer", borderRadius: 4 }}
                      />
                      <TextField variant="outlined" size="small" sx={{ width: 100 }}
                        value={row.color ?? ""}
                        placeholder="#FF5733"
                        error={!!codeErrors[index]?.color}
                        helperText={codeErrors[index]?.color}
                        onChange={(e) => handleCodeChange(index, "color", e.target.value)} />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined" size="small" sx={{ width: "100%" }}
                      value={row.note ?? ""}
                      error={!!codeErrors[index]?.note}
                      helperText={codeErrors[index]?.note}
                      onChange={(e) => handleCodeChange(index, "note", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined" size="small" sx={{ width: "100%" }}
                      value={row.biko ?? ""}
                      error={!!codeErrors[index]?.biko}
                      helperText={codeErrors[index]?.biko}
                      onChange={(e) => handleCodeChange(index, "biko", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Select value={row.yukoFlag} size="small" fullWidth
                      onChange={(e) => handleCodeChange(index, "yukoFlag", e.target.value)}>
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

export default CodeMasterTab;
