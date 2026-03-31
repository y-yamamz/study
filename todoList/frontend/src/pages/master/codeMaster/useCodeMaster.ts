import { useEffect, useState } from 'react';
import { Messages } from '../../../constants/messages';
import { getCodeList, getGroupCodeList, saveCodeList, deleteCodeList } from './api';
import type { MstCode, MstGroupCode, RowErrors } from './types';

export const useCodeMaster = () => {
  const [codes,        setCodes]        = useState<MstCode[]>([]);
  const [groupCodes,   setGroupCodes]   = useState<MstGroupCode[]>([]);
  const [isSaving,     setIsSaving]     = useState(false);
  const [isChanged,    setIsChanged]    = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [errors,       setErrors]       = useState<RowErrors>({});

  useEffect(() => {
    Promise.all([getCodeList(), getGroupCodeList()])
      .then(([c, g]) => { setCodes(c); setGroupCodes(g); })
      .catch(() => {});
  }, []);

  const key = (r: MstCode) => `${r.grCd}_${r.cd}`;

  const handleSelect = (k: string, c: boolean) => {
    const n = new Set(selectedKeys);
    c ? n.add(k) : n.delete(k);
    setSelectedKeys(n);
  };

  const handleSelectAll = (c: boolean) =>
    setSelectedKeys(c ? new Set(codes.map(key)) : new Set());

  const handleAdd = () => {
    setCodes([...codes, { grCd: '', cd: '', cdName: '', color: '', note: '', biko: '', yukoFlag: '1' }]);
    setIsChanged(true);
  };

  const handleChange = (i: number, f: keyof MstCode, v: string) => {
    const nl = [...codes];
    nl[i] = { ...nl[i], [f]: v };
    setCodes(nl);
    setIsChanged(true);
  };

  const validateAll = (list: MstCode[]): boolean => {
    const newErrors: RowErrors = {};
    list.forEach((c, i) => {
      const row: { [f: string]: string } = {};
      if (c.cd.length           > Messages.maxLength.codeCd)   row['cd']     = Messages.error.code.cd;
      if (c.cdName.length       > Messages.maxLength.codeName) row['cdName'] = Messages.error.code.cdName;
      if ((c.color ?? '').length > Messages.maxLength.color)   row['color']  = Messages.error.code.color;
      if ((c.note ?? '').length  > Messages.maxLength.note)    row['note']   = Messages.error.code.note;
      if ((c.biko ?? '').length  > Messages.maxLength.biko)    row['biko']   = Messages.error.code.biko;
      if (Object.keys(row).length > 0) newErrors[i] = row;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = async () => {
    if (!selectedKeys.size) return;
    if (!window.confirm(`選択した ${selectedKeys.size} 件を削除してもよろしいですか？`)) return;
    try {
      await deleteCodeList(codes.filter(c => selectedKeys.has(key(c))));
      alert('削除しました。');
      setCodes(await getCodeList());
      setSelectedKeys(new Set());
      setErrors({});
    } catch (_) { alert('削除に失敗しました。'); }
  };

  const handleRegister = async () => {
    if (isSaving) return;
    const t = codes.filter(c => c.grCd.trim() !== '' && c.cd.trim() !== '' && c.cdName.trim() !== '');
    if (!t.length) { alert('グループCD・CD・コード名称を入力してください。'); return; }
    if (!validateAll(t)) { alert('入力内容にエラーがあります。'); return; }
    if (!window.confirm('登録してもよろしいですか？')) return;
    try {
      setIsSaving(true);
      const res = await saveCodeList(t);
      if (res.status === 'OK') {
        setIsChanged(false);
        alert('登録しました。');
        setCodes(await getCodeList());
        setErrors({});
      } else alert('登録に失敗しました。');
    } catch (_) { alert('登録に失敗しました。'); }
    finally { setIsSaving(false); }
  };

  return {
    codes, groupCodes, isSaving, isChanged, selectedKeys, errors, key,
    handleSelect, handleSelectAll, handleAdd, handleChange, handleDelete, handleRegister,
  };
};
