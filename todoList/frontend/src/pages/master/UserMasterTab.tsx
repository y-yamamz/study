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
  MstUser,
  RowErrors,
  getUserList,
  saveUserList,
  deleteUserList,
  updateRowError,
} from '../../common/masterCommon';
import { Messages } from '../../constants/messages';

const ROLE_OPTIONS = [
  { value: 'USER',  label: '一般ユーザー' },
  { value: 'ADMIN', label: '管理者' },
];

/**
 * ユーザーマスタ管理タブ
 */
const UserMasterTab = () => {
  const [users, setUsers] = useState<MstUser[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<RowErrors>({});

  useEffect(() => {
    const init = async () => {
      const list = await getUserList();
      setUsers(list);
    };
    try { init(); } catch (_) { /* error */ }
  }, []);

  /** 行選択 */
  const handleSelect = (key: string, checked: boolean) => {
    const next = new Set(selectedKeys);
    checked ? next.add(key) : next.delete(key);
    setSelectedKeys(next);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedKeys(checked ? new Set(users.map(u => u.userId)) : new Set());
  };

  /** 行追加 */
  const handleAdd = () => {
    setUsers([...users, {
      userId: '',
      userName: '',
      passwordHash: '',
      plainPassword: '',
      roleCd: 'USER',
      email: '',
      yukoFlag: '1',
    }]);
    setIsChanged(true);
  };

  /** セル値変更 */
  const handleChange = (index: number, field: keyof MstUser, value: string) => {
    const newList = [...users];
    newList[index] = { ...newList[index], [field]: value };
    setUsers(newList);
    setIsChanged(true);

    let errMsg = '';
    if (field === 'userId' && value.length > Messages.maxLength.userId) {
      errMsg = Messages.error.user.userId;
    } else if (field === 'userName' && value.length > Messages.maxLength.userName) {
      errMsg = Messages.error.user.userName;
    } else if (field === 'email' && value.length > Messages.maxLength.email) {
      errMsg = Messages.error.user.email;
    } else if (
      field === 'plainPassword' &&
      value.length > 0 &&
      value.length < Messages.maxLength.plainPasswordMin
    ) {
      errMsg = Messages.error.user.plainPassword;
    }
    updateRowError(setErrors, index, field, errMsg);
  };

  /** 削除 */
  const handleDelete = async () => {
    if (selectedKeys.size === 0) return;
    if (!window.confirm(`選択した ${selectedKeys.size} 件を削除してもよろしいですか？`)) return;
    try {
      const targets = users.filter(u => selectedKeys.has(u.userId));
      await deleteUserList(targets);
      alert('削除しました。');
      const newList = await getUserList();
      setUsers(newList);
      setSelectedKeys(new Set());
      setErrors({});
    } catch (_) {
      alert('削除に失敗しました。');
    }
  };

  /** 登録 */
  const handleRegister = async () => {
    if (isSaving) return;
    const hasErrors = Object.values(errors).some(row => Object.keys(row).length > 0);
    if (hasErrors) {
      alert('入力内容にエラーがあります。確認してください。');
      return;
    }
    const saveTargets = users.filter(u => u.userId.trim() !== '' && u.userName.trim() !== '');
    if (saveTargets.length === 0) {
      alert('登録可能なデータがありません。ユーザーIDとユーザー名を入力してください。');
      return;
    }
    // 新規行でパスワード未入力チェック
    const newRows = saveTargets.filter(u => u.passwordHash === '' && (u.plainPassword ?? '').trim() === '');
    if (newRows.length > 0) {
      alert('新規ユーザーにはパスワードの入力が必要です。');
      return;
    }
    if (!window.confirm('登録してもよろしいですか？')) return;
    try {
      setIsSaving(true);
      const result = await saveUserList(saveTargets);
      if (result.status === 'OK') {
        setIsChanged(false);
        alert('登録しました。');
        const newList = await getUserList();
        setUsers(newList);
        setErrors({});
      } else {
        alert('登録に失敗しました。');
      }
    } catch (_) {
      alert('登録に失敗しました。');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }} alignItems="center">
        <Button variant="contained" color="primary" onClick={handleRegister} disabled={isSaving}>
          {isSaving ? '登録中...' : '登録'}
        </Button>
        <Button variant="contained" color="primary" onClick={handleAdd} disabled={isSaving}>
          追加
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}
          disabled={selectedKeys.size === 0}>
          削除
        </Button>
        {selectedKeys.size > 0 && (
          <span style={{ color: '#d32f2f' }}>{selectedKeys.size} 件選択中</span>
        )}
        {isChanged && (
          <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>変更されています</span>
        )}
      </Stack>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
          <Table sx={{ minWidth: 900 }} aria-label="user table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ backgroundColor: '#90bef3dc' }}>
                  <Checkbox
                    indeterminate={selectedKeys.size > 0 && selectedKeys.size < users.length}
                    checked={users.length > 0 && selectedKeys.size === users.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </TableCell>
                <TableCell align="center" sx={{ width: 130, borderRight: '1px solid #4e4c4c', backgroundColor: '#90bef3dc' }}>ユーザーID</TableCell>
                <TableCell align="center" sx={{ width: 160, borderRight: '1px solid #4e4c4c', backgroundColor: '#90bef3dc' }}>ユーザー名</TableCell>
                <TableCell align="center" sx={{ width: 180, borderRight: '1px solid #4e4c4c', backgroundColor: '#90bef3dc' }}>
                  パスワード
                  <div style={{ fontSize: '0.7em', fontWeight: 'normal' }}>（変更する場合のみ入力）</div>
                </TableCell>
                <TableCell align="center" sx={{ width: 130, borderRight: '1px solid #4e4c4c', backgroundColor: '#90bef3dc' }}>ロール</TableCell>
                <TableCell align="center" sx={{ width: 200, borderRight: '1px solid #4e4c4c', backgroundColor: '#90bef3dc' }}>メールアドレス</TableCell>
                <TableCell align="center" sx={{ width: 100, backgroundColor: '#90bef3dc' }}>有効フラグ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedKeys.has(row.userId)}
                        onChange={(e) => handleSelect(row.userId, e.target.checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" sx={{ width: '100%' }}
                        value={row.userId}
                        error={!!errors[index]?.userId}
                        helperText={errors[index]?.userId}
                        onChange={(e) => handleChange(index, 'userId', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" sx={{ width: '100%' }}
                        value={row.userName}
                        error={!!errors[index]?.userName}
                        helperText={errors[index]?.userName}
                        onChange={(e) => handleChange(index, 'userName', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" sx={{ width: '100%' }}
                        type="password"
                        value={row.plainPassword}
                        placeholder="新規は必須 / 変更時のみ入力"
                        error={!!errors[index]?.plainPassword}
                        helperText={errors[index]?.plainPassword}
                        onChange={(e) => handleChange(index, 'plainPassword', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Select value={row.roleCd} size="small" fullWidth
                        onChange={(e) => handleChange(index, 'roleCd', e.target.value)}>
                        {ROLE_OPTIONS.map(opt => (
                          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" sx={{ width: '100%' }}
                        value={row.email ?? ''}
                        error={!!errors[index]?.email}
                        helperText={errors[index]?.email}
                        onChange={(e) => handleChange(index, 'email', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Select value={row.yukoFlag} size="small" fullWidth
                        onChange={(e) => handleChange(index, 'yukoFlag', e.target.value)}>
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

export default UserMasterTab;
