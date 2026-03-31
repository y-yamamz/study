import { useEffect, useState } from 'react';
import { Messages } from '../../../constants/messages';
import { getGroupCodeList, saveGroupCodeList, deleteGroupCodeList } from './api';
import type { MstGroupCode, RowErrors } from './types';

export const useGroupCodeMaster = () => {
  const [groupCodes,   setGroupCodes]   = useState<MstGroupCode[]>([]);
  const [isSaving,     setIsSaving]     = useState(false);
  const [isChanged,    setIsChanged]    = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [errors,       setErrors]       = useState<RowErrors>({});

  useEffect(() => { getGroupCodeList().then(setGroupCodes).catch(() => {}); }, []);

  const handleSelect = (k: string, c: boolean) => {
    const n = new Set(selectedKeys);
    c ? n.add(k) : n.delete(k);
    setSelectedKeys(n);
  };

  const handleSelectAll = (c: boolean) =>
    setSelectedKeys(c ? new Set(groupCodes.map(g => g.cd)) : new Set());

  const handleAdd = () => {
    setGroupCodes([...groupCodes, { cd: '', cdName: '', note: '', biko: '', yukoFlag: '1' }]);
    setIsChanged(true);
  };

  const handleChange = (i: number, f: keyof MstGroupCode, v: string) => {
    const nl = [...groupCodes];
    nl[i] = { ...nl[i], [f]: v };
    setGroupCodes(nl);
    setIsChanged(true);
  };

  const validateAll = (list: MstGroupCode[]): boolean => {
    const newErrors: RowErrors = {};
    list.forEach((g, i) => {
      const row: { [f: string]: string } = {};
      if (g.cd.length           > Messages.maxLength.groupCodeCd)   row['cd']     = Messages.error.groupCode.cd;
      if (g.cdName.length       > Messages.maxLength.groupCodeName) row['cdName'] = Messages.error.groupCode.cdName;
      if ((g.note ?? '').length  > Messages.maxLength.note)         row['note']   = Messages.error.groupCode.note;
      if ((g.biko ?? '').length  > Messages.maxLength.biko)         row['biko']   = Messages.error.groupCode.biko;
      if (Object.keys(row).length > 0) newErrors[i] = row;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = async () => {
    if (!selectedKeys.size) return;
    if (!window.confirm(`選択した ${selectedKeys.size} 件を削除してもよろしいですか？`)) return;
    try {
      await deleteGroupCodeList(groupCodes.filter(g => selectedKeys.has(g.cd)));
      alert('削除しました。');
      setGroupCodes(await getGroupCodeList());
      setSelectedKeys(new Set());
      setErrors({});
    } catch (_) { alert('削除に失敗しました。'); }
  };

  const handleRegister = async () => {
    if (isSaving) return;
    const t = groupCodes.filter(g => g.cd.trim() !== '' && g.cdName.trim() !== '');
    if (!t.length) { alert('CD・コードグループ名称を入力してください。'); return; }
    if (!validateAll(t)) { alert('入力内容にエラーがあります。'); return; }
    if (!window.confirm('登録してもよろしいですか？')) return;
    try {
      setIsSaving(true);
      const res = await saveGroupCodeList(t);
      if (res.status === 'OK') {
        setIsChanged(false);
        alert('登録しました。');
        setGroupCodes(await getGroupCodeList());
        setErrors({});
      } else alert('登録に失敗しました。');
    } catch (_) { alert('登録に失敗しました。'); }
    finally { setIsSaving(false); }
  };

  return {
    groupCodes, isSaving, isChanged, selectedKeys, errors,
    handleSelect, handleSelectAll, handleAdd, handleChange, handleDelete, handleRegister,
  };
};
