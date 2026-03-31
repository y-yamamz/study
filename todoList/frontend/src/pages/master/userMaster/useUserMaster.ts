import { useEffect, useState } from 'react';
import { Messages } from '../../../constants/messages';
import { updateRowError } from '../../../common/masterCommon';
import { getUserList, saveUserList, deleteUserList } from './api';
import type { MstUser, RowErrors } from './types';
import { EXISTING_PW } from './utils';

export const useUserMaster = () => {
  const [users,        setUsers]        = useState<MstUser[]>([]);
  const [isSaving,     setIsSaving]     = useState(false);
  const [isChanged,    setIsChanged]    = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [errors,       setErrors]       = useState<RowErrors>({});

  useEffect(() => {
    getUserList()
      .then(list => setUsers(list.map(u => ({ ...u, plainPassword: EXISTING_PW }))))
      .catch(() => {});
  }, []);

  const handleSelect = (k: string, c: boolean) => {
    const n = new Set(selectedKeys);
    c ? n.add(k) : n.delete(k);
    setSelectedKeys(n);
  };

  const handleSelectAll = (c: boolean) =>
    setSelectedKeys(c ? new Set(users.map(u => u.userId)) : new Set());

  const handleAdd = () => {
    setUsers([...users, {
      userId: '', userName: '', passwordHash: '',
      plainPassword: '', roleCd: 'USER', email: '', yukoFlag: '1',
    }]);
    setIsChanged(true);
  };

  const handleChange = (i: number, f: keyof MstUser, v: string) => {
    const nl = [...users];
    nl[i] = { ...nl[i], [f]: v };
    setUsers(nl);
    setIsChanged(true);

    let e = '';
    if      (f === 'userId'        && v.length > Messages.maxLength.userId)                                        e = Messages.error.user.userId;
    else if (f === 'userName'      && v.length > Messages.maxLength.userName)                                      e = Messages.error.user.userName;
    else if (f === 'email'         && v.length > Messages.maxLength.email)                                         e = Messages.error.user.email;
    else if (f === 'plainPassword' && v !== EXISTING_PW && v.length > 0 && v.length < Messages.maxLength.plainPasswordMin) e = Messages.error.user.plainPassword;
    updateRowError(setErrors, i, f, e);
  };

  const handleDelete = async () => {
    if (!selectedKeys.size) return;
    if (!window.confirm(`選択した ${selectedKeys.size} 件を削除してもよろしいですか？`)) return;
    try {
      await deleteUserList(users.filter(u => selectedKeys.has(u.userId)));
      alert('削除しました。');
      setUsers((await getUserList()).map(u => ({ ...u, plainPassword: EXISTING_PW })));
      setSelectedKeys(new Set());
      setErrors({});
    } catch (_) { alert('削除に失敗しました。'); }
  };

  const handleRegister = async () => {
    if (isSaving) return;
    if (Object.values(errors).some(r => Object.keys(r).length > 0)) { alert('入力内容にエラーがあります。'); return; }
    const t = users.filter(u => u.userId.trim() !== '' && u.userName.trim() !== '');
    if (!t.length) { alert('ユーザーIDとユーザー名を入力してください。'); return; }
    if (t.some(u => (u.plainPassword ?? '').trim() === '')) { alert('パスワードを入力してください。'); return; }
    if (!window.confirm('登録してもよろしいですか？')) return;
    try {
      setIsSaving(true);
      const saveData = t.map(u => ({
        ...u,
        plainPassword: u.plainPassword === EXISTING_PW ? '' : u.plainPassword,
      }));
      const res = await saveUserList(saveData);
      if (res.status === 'OK') {
        setIsChanged(false);
        alert('登録しました。');
        setUsers((await getUserList()).map(u => ({ ...u, plainPassword: EXISTING_PW })));
        setErrors({});
      } else alert('登録に失敗しました。');
    } catch (_) { alert('登録に失敗しました。'); }
    finally { setIsSaving(false); }
  };

  return {
    users, isSaving, isChanged, selectedKeys, errors,
    handleSelect, handleSelectAll, handleAdd, handleChange, handleDelete, handleRegister,
  };
};
