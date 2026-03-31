import { useEffect, useState } from 'react';
import { Messages } from '../../../constants/messages';
import { getProjectList, getSystemList, saveProjectList, deleteProjectList } from './api';
import type { MstSystem, MstProject, RowErrors } from './types';

export const useProjectMaster = () => {
  const [projects,     setProjects]     = useState<MstProject[]>([]);
  const [systems,      setSystems]      = useState<MstSystem[]>([]);
  const [isSaving,     setIsSaving]     = useState(false);
  const [isChanged,    setIsChanged]    = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [errors,       setErrors]       = useState<RowErrors>({});

  useEffect(() => {
    Promise.all([getProjectList(), getSystemList()])
      .then(([p, s]) => { setProjects(p); setSystems(s); })
      .catch(() => {});
  }, []);

  const key = (r: MstProject) => `${r.systemCd}_${r.cd}`;

  const handleSelect = (k: string, c: boolean) => {
    const n = new Set(selectedKeys);
    c ? n.add(k) : n.delete(k);
    setSelectedKeys(n);
  };

  const handleSelectAll = (c: boolean) =>
    setSelectedKeys(c ? new Set(projects.map(key)) : new Set());

  const handleAdd = () => {
    setProjects([...projects, { systemCd: '', cd: '', projectName: '', note: '', biko: '', yukoFlag: '1' }]);
    setIsChanged(true);
  };

  const handleChange = (i: number, f: keyof MstProject, v: string) => {
    const nl = [...projects];
    nl[i] = { ...nl[i], [f]: v };
    setProjects(nl);
    setIsChanged(true);
  };

  const validateAll = (list: MstProject[]): boolean => {
    const newErrors: RowErrors = {};
    list.forEach((p, i) => {
      const row: { [f: string]: string } = {};
      if (p.cd.length          > Messages.maxLength.projectCd)   row['cd']          = Messages.error.project.cd;
      if (p.projectName.length > Messages.maxLength.projectName) row['projectName']  = Messages.error.project.projectName;
      if ((p.note ?? '').length > Messages.maxLength.note)       row['note']         = Messages.error.project.note;
      if ((p.biko ?? '').length > Messages.maxLength.biko)       row['biko']         = Messages.error.project.biko;
      if (Object.keys(row).length > 0) newErrors[i] = row;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = async () => {
    if (!selectedKeys.size) return;
    if (!window.confirm(`選択した ${selectedKeys.size} 件を削除してもよろしいですか？`)) return;
    try {
      await deleteProjectList(projects.filter(p => selectedKeys.has(key(p))));
      alert('削除しました。');
      setProjects(await getProjectList());
      setSelectedKeys(new Set());
      setErrors({});
    } catch (_) { alert('削除に失敗しました。'); }
  };

  const handleRegister = async () => {
    if (isSaving) return;
    const t = projects.filter(p => p.systemCd.trim() !== '' && p.cd.trim() !== '' && p.projectName.trim() !== '');
    if (!t.length) { alert('システムCD・CD・プロジェクト名を入力してください。'); return; }
    if (!validateAll(t)) { alert('入力内容にエラーがあります。'); return; }
    if (!window.confirm('登録してもよろしいですか？')) return;
    try {
      setIsSaving(true);
      const res = await saveProjectList(t);
      if (res.status === 'OK') {
        setIsChanged(false);
        alert('登録しました。');
        setProjects(await getProjectList());
        setErrors({});
      } else alert('登録に失敗しました。');
    } catch (_) { alert('登録に失敗しました。'); }
    finally { setIsSaving(false); }
  };

  return {
    projects, systems, isSaving, isChanged, selectedKeys, errors, key,
    handleSelect, handleSelectAll, handleAdd, handleChange, handleDelete, handleRegister,
  };
};
