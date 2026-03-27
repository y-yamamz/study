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
  MstProject,
  RowErrors,
  getSystemList,
  getProjectList,
  saveProjectList,
  deleteProjectList,
  updateRowError,
} from '../../common/masterCommon';
import { Messages } from '../../constants/messages';

/**
 * プロジェクトマスタ管理タブ
 */
const ProjectMasterTab = () => {
  const [projects, setProjects] = useState<MstProject[]>([]);
  const [systems, setSystems] = useState<MstSystem[]>([]);

  /** 排他制御：登録処理中フラグ */
  const [isSavingProject, setIsSavingProject] = useState(false);

  /** 変更状態管理フラグ */
  const [isProjectChanged, setIsProjectChanged] = useState(false);

  /** 選択行のキーセット（マルチ選択削除用） */
  const [selectedProjectKeys, setSelectedProjectKeys] = useState<Set<string>>(new Set());

  /** インラインエラー状態 */
  const [projectErrors, setProjectErrors] = useState<RowErrors>({});

  /**
   * 初期データ取得
   * プロジェクト一覧とシステムCD選択用にシステム一覧も取得する
   */
  useEffect(() => {
    const init = async () => {
      const projectList = await getProjectList();
      setProjects(projectList);
      const systemList = await getSystemList();
      setSystems(systemList);
    };

    try {
      init();
    } catch (e) {
      // error
    }
  }, []);

  /** --- プロジェクトマスタ 選択・削除 --- */

  const handleSelectProject = (key: string, checked: boolean) => {
    const next = new Set(selectedProjectKeys);
    checked ? next.add(key) : next.delete(key);
    setSelectedProjectKeys(next);
  };

  const handleSelectAllProject = (checked: boolean) => {
    setSelectedProjectKeys(checked ? new Set(projects.map(p => `${p.systemCd}_${p.cd}`)) : new Set());
  };

  const handleDeleteProject = async () => {
    if (selectedProjectKeys.size === 0) return;
    if (!window.confirm(`選択した ${selectedProjectKeys.size} 件を削除してもよろしいですか？`)) return;
    try {
      const targets = projects.filter(p => selectedProjectKeys.has(`${p.systemCd}_${p.cd}`));
      await deleteProjectList(targets);
      alert("削除しました。");
      const newList = await getProjectList();
      setProjects(newList);
      setSelectedProjectKeys(new Set());
      setProjectErrors({});
    } catch (e) {
      alert("削除に失敗しました。");
    }
  };

  /**
   * プロジェクトマスタのセル値変更処理
   * @param index 行インデックス
   * @param field 変更フィールド
   * @param value 変更値
   */
  const handleProjectChange = (index: number, field: keyof MstProject, value: string) => {
    const newList = [...projects];
    newList[index][field] = value;
    setProjects(newList);
    setIsProjectChanged(true);

    // フィールドバリデーション
    let errMsg = "";
    if (field === "cd" && value.length > Messages.maxLength.projectCd) {
      errMsg = Messages.error.project.cd;
    } else if (field === "projectName" && value.length > Messages.maxLength.projectName) {
      errMsg = Messages.error.project.projectName;
    } else if (field === "note" && value.length > Messages.maxLength.note) {
      errMsg = Messages.error.project.note;
    } else if (field === "biko" && value.length > Messages.maxLength.biko) {
      errMsg = Messages.error.project.biko;
    }
    updateRowError(setProjectErrors, index, field, errMsg);
  };

  /**
   * プロジェクトマスタの行追加処理
   */
  const handleAddProject = () => {
    setProjects([...projects, { systemCd: "", cd: "", projectName: "", note: "", biko: "", yukoFlag: "1" }]);
    setIsProjectChanged(true);
  };

  /**
   * プロジェクトマスタの登録処理
   * 排他制御により二重送信を防止する
   */
  const handleRegisterProject = async () => {
    // 排他制御：登録処理中は再実行を禁止
    if (isSavingProject) {
      return;
    }
    // インラインエラーチェック
    const hasErrors = Object.values(projectErrors).some(row => Object.keys(row).length > 0);
    if (hasErrors) {
      alert("入力内容にエラーがあります。確認してください。");
      return;
    }
    try {
      const entry = window.confirm("登録してもよろしいですか？");
      if (!entry) {
        return;
      }
      setIsSavingProject(true);
      // システムCD・CD・プロジェクト名がいずれも入力済みの行のみ登録対象とする
      const saveTargets = projects.filter(
        p => p.systemCd.trim() !== "" && p.cd.trim() !== "" && p.projectName.trim() !== ""
      );
      if (saveTargets.length === 0) {
        alert("登録可能なデータがありません。システムCD・CD・プロジェクト名を入力してください。");
        return;
      }
      const result = await saveProjectList(saveTargets);
      if (result.status === "OK") {
        setIsProjectChanged(false);
        alert("登録しました。");
        // 登録完了後に再描画
        const newList = await getProjectList();
        setProjects(newList);
        setProjectErrors({});
      } else {
        alert("登録に失敗しました");
      }
    } catch (e) {
      alert("登録に失敗しました。");
    } finally {
      setIsSavingProject(false);
    }
  };

  return (
    <div>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }} alignItems="center">
        <Button variant="contained" color="primary" onClick={handleRegisterProject} disabled={isSavingProject}>
          {isSavingProject ? "登録中..." : "登録"}
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddProject} disabled={isSavingProject}>
          追加
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteProject}
          disabled={selectedProjectKeys.size === 0}>
          削除
        </Button>
        {selectedProjectKeys.size > 0 && (
          <span style={{ color: "#d32f2f" }}>{selectedProjectKeys.size} 件選択中</span>
        )}
        {/* 変更状態メッセージ */}
        {isProjectChanged && (
          <span style={{ color: "#d32f2f", fontWeight: "bold" }}>変更されています</span>
        )}
      </Stack>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: "auto" }}>
          <Table sx={{ minWidth: 700 }} aria-label="project table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ backgroundColor: "#90bef3dc" }}>
                  <Checkbox
                    indeterminate={selectedProjectKeys.size > 0 && selectedProjectKeys.size < projects.length}
                    checked={projects.length > 0 && selectedProjectKeys.size === projects.length}
                    onChange={(e) => handleSelectAllProject(e.target.checked)}
                  />
                </TableCell>
                <TableCell align="center" sx={{ width: 100, borderRight: "1px solid #4e4c4c", backgroundColor: "#90bef3dc" }}>システムCD</TableCell>
                <TableCell align="center" sx={{ width: 100, borderRight: "1px solid #4e4c4c", backgroundColor: "#90bef3dc" }}>CD</TableCell>
                <TableCell align="center" sx={{ width: 200, borderRight: "1px solid #4e4c4c", backgroundColor: "#90bef3dc" }}>プロジェクト名</TableCell>
                <TableCell align="center" sx={{ width: 250, borderRight: "1px solid #4e4c4c", backgroundColor: "#90bef3dc" }}>内容</TableCell>
                <TableCell align="center" sx={{ width: 250, borderRight: "1px solid #4e4c4c", backgroundColor: "#90bef3dc" }}>備考</TableCell>
                <TableCell align="center" sx={{ width: 100, backgroundColor: "#90bef3dc" }}>有効フラグ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedProjectKeys.has(`${row.systemCd}_${row.cd}`)}
                      onChange={(e) => handleSelectProject(`${row.systemCd}_${row.cd}`, e.target.checked)}
                    />
                  </TableCell>
                  <TableCell>
                    {/* システムCDはシステムマスタから選択、表示はシステム名 */}
                    <Select value={row.systemCd} size="small" fullWidth
                      onChange={(e) => handleProjectChange(index, "systemCd", e.target.value)}>
                      <MenuItem value="">選択してください</MenuItem>
                      {systems.map(system => (
                        <MenuItem key={system.cd} value={system.cd}>{system.systemName}</MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined" size="small" sx={{ width: "100%" }}
                      value={row.cd}
                      error={!!projectErrors[index]?.cd}
                      helperText={projectErrors[index]?.cd}
                      onChange={(e) => handleProjectChange(index, "cd", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined" size="small" sx={{ width: "100%" }}
                      value={row.projectName}
                      error={!!projectErrors[index]?.projectName}
                      helperText={projectErrors[index]?.projectName}
                      onChange={(e) => handleProjectChange(index, "projectName", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined" size="small" sx={{ width: "100%" }}
                      value={row.note ?? ""}
                      error={!!projectErrors[index]?.note}
                      helperText={projectErrors[index]?.note}
                      onChange={(e) => handleProjectChange(index, "note", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined" size="small" sx={{ width: "100%" }}
                      value={row.biko ?? ""}
                      error={!!projectErrors[index]?.biko}
                      helperText={projectErrors[index]?.biko}
                      onChange={(e) => handleProjectChange(index, "biko", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Select value={row.yukoFlag} size="small" fullWidth
                      onChange={(e) => handleProjectChange(index, "yukoFlag", e.target.value)}>
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

export default ProjectMasterTab;
