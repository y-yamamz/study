import { useEffect, useState } from 'react';
import { Messages } from '../../../constants/messages';
import { getSystemList, saveSystemList, deleteSystemList } from './api';
import type { MstSystem, RowErrors } from './types';

export const useSystemMaster = () => {
  const [systems,      setSystems]      = useState<MstSystem[]>([]);
  const [isSaving,     setIsSaving]     = useState(false);
  const [isChanged,    setIsChanged]    = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [errors,       setErrors]       = useState<RowErrors>({});

  useEffect(() => { getSystemList().then(setSystems).catch(() => {}); }, []);

  const handleSelect = (k: string, c: boolean) => {
    const n = new Set(selectedKeys);
    c ? n.add(k) : n.delete(k);
    setSelectedKeys(n);
  };

  const handleSelectAll = (c: boolean) =>
    setSelectedKeys(c ? new Set(systems.map(s => s.cd)) : new Set());

  const handleAdd = () => {
    const max = systems.reduce((m, s) => {
      const n = parseInt(s.cd, 10);
      return isNaN(n) ? m : Math.max(m, n);
    }, 0);
    setSystems([...systems, { cd: String(max + 1).padStart(3, '0'), systemName: '', note: '', biko: '', yukoFlag: '1' }]);
    setIsChanged(true);
  };

  const handleChange = (index: number, field: keyof MstSystem, value: string) => {
    const nl = [...systems];
    nl[index] = { ...nl[index], [field]: value };
    setSystems(nl);
    setIsChanged(true);
  };

  const validateAll = (list: MstSystem[]): boolean => {
    const newErrors: RowErrors = {};
    list.forEach((s, i) => {
      const row: { [f: string]: string } = {};
      if (s.systemName.length > Messages.maxLength.systemName) row['systemName'] = Messages.error.system.systemName;
      if ((s.note ?? '').length > Messages.maxLength.note)     row['note']       = Messages.error.system.note;
      if ((s.biko ?? '').length > Messages.maxLength.biko)     row['biko']       = Messages.error.system.biko;
      if (Object.keys(row).length > 0) newErrors[i] = row;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = async () => {
    if (!selectedKeys.size) return;
    if (!window.confirm(`選択した ${selectedKeys.size} 件を削除してもよろしいですか？`)) return;
    try {
      await deleteSystemList(systems.filter(s => selectedKeys.has(s.cd)));
      alert('削除しました。');
      setSystems(await getSystemList());
      setSelectedKeys(new Set());
      setErrors({});
    } catch (_) { alert('削除に失敗しました。'); }
  };

  const handleRegister = async () => {
    if (isSaving) return;
    const t = systems.filter(s => s.systemName.trim() !== '');
    if (!t.length) { alert('システム名を入力してください。'); return; }
    if (!validateAll(t)) { alert('入力内容にエラーがあります。'); return; }
    if (!window.confirm('登録してもよろしいですか？')) return;
    try {
      setIsSaving(true);
      const res = await saveSystemList(t);
      if (res.status === 'OK') {
        setIsChanged(false);
        alert('登録しました。');
        setSystems(await getSystemList());
        setErrors({});
      } else alert('登録に失敗しました。');
    } catch (_) { alert('登録に失敗しました。'); }
    finally { setIsSaving(false); }
  };

  return {
    systems, isSaving, isChanged, selectedKeys, errors,
    handleSelect, handleSelectAll, handleAdd, handleChange, handleDelete, handleRegister,
  };
};
