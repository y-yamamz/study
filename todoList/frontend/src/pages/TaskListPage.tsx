import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { apiFetch } from '../common/apiClient';
import { Messages } from '../constants/messages';
import Button from '@mui/material/Button';
import { Box, Checkbox, Chip, MenuItem, Stack, TextField, Typography } from '@mui/material';

export interface MstProject  { systemCd:string; cd:string; projectName:string; }
export interface MstCode      { grCd:string; cd:string; cdName:string; color:string; }
export interface TodoListKey  { systemCd:string; projectCd:string; ticketNo:string; }
export interface TodoList extends TodoListKey {
  systemName:string; projectName:string; statusNm:string; deployNm:string;
  revisionNo:string; statusCd:string; deployCd:string; note:string; biko:string; yukoFlag:string;
}
type RowErrors = { [idx:number]:{ [field:string]:string } };

const getTaskList       = async ()=>{ const r=await apiFetch("api/todoList",{method:"POST"}); if(!r.ok)throw new Error(); return r.json(); };
const getProjectList    = async ()=>{ const r=await apiFetch("api/getMstProjectCbbList",{method:"POST",body:JSON.stringify({systemCd:"001",cd:"",projectName:""})}); if(!r.ok)throw new Error(); return r.json(); };
const getProgressStatus = async ()=>{ const r=await apiFetch("api/getMstCodeCbbList",{method:"POST",body:JSON.stringify({grCd:"001",cd:"",cdName:"",color:""})}); if(!r.ok)throw new Error(); return r.json(); };
const getDeployStatus   = async ()=>{ const r=await apiFetch("api/getMstCodeCbbList",{method:"POST",body:JSON.stringify({grCd:"002",cd:"",cdName:"",color:""})}); if(!r.ok)throw new Error(); return r.json(); };
const deleteTask        = async (t:TodoList[])=>{ const r=await apiFetch("api/todoDelete",{method:"POST",body:JSON.stringify(t)}); if(!r.ok)throw new Error(); return r.json(); };
const createTask        = async (t:TodoList[])=>{ const r=await apiFetch("api/todoRegister",{method:"POST",body:JSON.stringify(t)}); if(!r.ok)throw new Error(); return r.json(); };
const getRowKey         = (row:TodoList) => `${row.systemCd}_${row.projectCd}_${row.ticketNo}`;

/** hex → bright accessible chip colors */
const toChipStyle = (hex:string) => {
  if(!hex) return { bg:'#f3f4f6', border:'#e5e7eb', text:'#6b7280' };
  const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
  return {
    bg:  `rgba(${r},${g},${b},0.12)`,
    border: `rgba(${r},${g},${b},0.35)`,
    text: hex,
  };
};

const inputCellSx = {
  '& .MuiOutlinedInput-root': {
    fontSize:'0.82rem', borderRadius:'10px', backgroundColor:'#fafbff',
    '& fieldset':{ borderColor:'rgba(99,102,241,0.18)' },
    '&:hover fieldset':{ borderColor:'rgba(99,102,241,0.45)' },
    '&.Mui-focused fieldset':{ borderColor:'#6366f1', borderWidth:2 },
  },
};
const selectCellSx = {
  fontSize:'0.82rem', borderRadius:'10px', backgroundColor:'#fafbff',
  '& .MuiOutlinedInput-notchedOutline':{ borderColor:'rgba(99,102,241,0.18)' },
  '&:hover .MuiOutlinedInput-notchedOutline':{ borderColor:'rgba(99,102,241,0.45)' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline':{ borderColor:'#6366f1', borderWidth:2 },
};

const TaskListPage = () => {
  const [projectsCodes, setProjectsCodes] = useState<MstProject[]>([]);
  const [statusCodes,   setStatusCodes]   = useState<MstCode[]>([]);
  const [deployCodes,   setDeployCodes]   = useState<MstCode[]>([]);
  const [tasks,         setTasks]         = useState<TodoList[]>([]);
  const [selectedKeys,  setSelectedKeys]  = useState<Set<string>>(new Set());
  const [filterProjectCd, setFilterProjectCd] = useState("");
  const [filterStatusCd,  setFilterStatusCd]  = useState("");
  const [filterDeployCd,  setFilterDeployCd]  = useState("");
  const [appliedFilter, setAppliedFilter] = useState({ projectCd:"", statusCd:"", deployCd:"" });
  const [taskErrors,    setTaskErrors]    = useState<RowErrors>({});

  useEffect(() => {
    (async () => {
      try {
        const [lst,sc,dc,pc] = await Promise.all([getTaskList(),getProgressStatus(),getDeployStatus(),getProjectList()]);
        setTasks(lst); setStatusCodes(sc); setDeployCodes(dc); setProjectsCodes(pc);
      } catch(_){}
    })();
  },[]);

  const handleRegister = async () => {
    if(Object.values(taskErrors).some(r=>Object.keys(r).length>0)){ alert("入力内容にエラーがあります。"); return; }
    if(!window.confirm("登録してもよろしいですか？")) return;
    try {
      const t = tasks.filter(t=>t.projectCd.trim()!==""&&t.ticketNo.trim()!=="");
      if(!t.length){ alert("登録可能なデータがありません。"); return; }
      const res = await createTask(t);
      if(res.status==="OK"){ alert("登録しました。"); setTasks(await getTaskList()); setTaskErrors({}); }
      else alert("登録に失敗しました");
    } catch(_){ alert("登録に失敗しました。"); }
  };

  const handleAddRow = () => setTasks([...tasks,{
    systemCd:crypto.randomUUID(), projectCd:crypto.randomUUID(), ticketNo:"",
    systemName:"", projectName:"", statusNm:"", deployNm:"",
    revisionNo:"", statusCd:"0", deployCd:"0", note:"", biko:"", yukoFlag:"0",
  }]);

  const handleChange = (index:number, field:keyof TodoList, value:string) => {
    const nt=[...tasks]; nt[index][field]=value; setTasks(nt);
    let e="";
    if(field==="ticketNo"&&value.length>Messages.maxLength.ticketNo) e=Messages.error.todo.ticketNo;
    else if(field==="revisionNo"&&value.length>Messages.maxLength.revisionNo) e=Messages.error.todo.revisionNo;
    else if(field==="note"&&value.length>Messages.maxLength.note) e=Messages.error.todo.note;
    else if(field==="biko"&&value.length>Messages.maxLength.biko) e=Messages.error.todo.biko;
    setTaskErrors(prev=>{
      const r={...(prev[index]||{})};
      if(e) r[field]=e; else delete r[field];
      if(!Object.keys(r).length){ const n={...prev}; delete n[index]; return n; }
      return{...prev,[index]:r};
    });
  };

  const handleSelectRow = (key:string, checked:boolean) => {
    const s=new Set(selectedKeys); checked?s.add(key):s.delete(key); setSelectedKeys(s);
  };
  const handleSelectAll = (checked:boolean) =>
    setSelectedKeys(checked?new Set(filteredTasks.map(getRowKey)):new Set());
  const handleApplyFilter = () => {
    setAppliedFilter({projectCd:filterProjectCd,statusCd:filterStatusCd,deployCd:filterDeployCd});
    setSelectedKeys(new Set());
  };

  const filteredTasks = tasks.filter(t=>
    (!appliedFilter.projectCd||t.projectCd===appliedFilter.projectCd)&&
    (!appliedFilter.statusCd ||t.statusCd===appliedFilter.statusCd)&&
    (!appliedFilter.deployCd ||t.deployCd===appliedFilter.deployCd)
  );

  const handleDelete = async () => {
    if(!selectedKeys.size){ alert("削除する行を選択してください。"); return; }
    if(!window.confirm(`選択した ${selectedKeys.size} 件を削除してもよろしいですか？`)) return;
    try {
      const sel=tasks.filter(t=>selectedKeys.has(getRowKey(t)));
      const saved=sel.filter(t=>t.ticketNo!=="");
      if(saved.length) await deleteTask(saved);
      setTasks(tasks.filter(t=>!selectedKeys.has(getRowKey(t))));
      setSelectedKeys(new Set()); setTaskErrors({});
      alert("削除しました。");
    } catch(_){ alert("削除に失敗しました。"); }
  };

  return (
    <Box sx={{ width:'100%' }}>
      {/* ─── Page Header ─── */}
      <Box sx={{
        mb:3, p:'20px 24px', borderRadius:'20px',
        background:'linear-gradient(135deg, #ecfdf5 0%, #eff6ff 50%, #f5f3ff 100%)',
        border:'1.5px solid rgba(16,185,129,0.15)',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        flexWrap:'wrap', gap:2, position:'relative', overflow:'hidden',
      }}>
        <Box sx={{
          position:'absolute', right:-20, top:-20, width:100, height:100, borderRadius:'50%',
          background:'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,182,212,0.08))',
        }} />
        <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
          <Box sx={{
            width:48, height:48, borderRadius:14,
            background:'linear-gradient(135deg, #10b981, #06b6d4)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'22px', boxShadow:'0 6px 20px rgba(16,185,129,0.35)',
          }}>☰</Box>
          <Box>
            <Typography sx={{
              fontWeight:800, fontSize:'1.25rem', letterSpacing:'-0.02em',
              background:'linear-gradient(135deg, #059669, #0891b2)',
              backgroundClip:'text', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            }}>タスクリスト</Typography>
            <Typography sx={{ color:'#9ca3af', fontSize:'0.8rem', mt:0.2 }}>
              {filteredTasks.length} 件
              {selectedKeys.size>0 && (
                <Box component="span" sx={{ ml:1.5, color:'#6366f1', fontWeight:700 }}>
                  · {selectedKeys.size} 件選択中
                </Box>
              )}
            </Typography>
          </Box>
        </Box>

        {/* Action buttons */}
        <Stack direction="row" spacing={1.5}>
          <Button variant="contained" size="small" onClick={handleRegister}
            sx={{
              background:'linear-gradient(135deg, #10b981, #06b6d4)',
              boxShadow:'0 4px 16px rgba(16,185,129,0.38)', px:2.5,
              '&:hover':{ background:'linear-gradient(135deg,#059669,#0891b2)', transform:'translateY(-2px)' },
            }}>✓ 登録</Button>
          <Button variant="outlined" size="small" onClick={handleAddRow}
            sx={{
              borderColor:'rgba(99,102,241,0.35)', color:'#6366f1', px:2.5,
              '&:hover':{ borderColor:'#6366f1', backgroundColor:'rgba(99,102,241,0.07)', transform:'translateY(-2px)' },
            }}>+ 追加</Button>
          <Button variant="contained" color="error" size="small" onClick={handleDelete}
            disabled={!selectedKeys.size}
            sx={{
              background: selectedKeys.size ? 'linear-gradient(135deg,#f43f5e,#ec4899)' : undefined,
              boxShadow: selectedKeys.size ? '0 4px 16px rgba(244,63,94,0.35)' : undefined,
              px:2.5,
              '&:hover':{ transform:'translateY(-2px)' },
            }}>✕ 削除</Button>
        </Stack>
      </Box>

      {/* ─── Filter Bar ─── */}
      <Box sx={{
        mb:2.5, p:'12px 16px', borderRadius:'16px',
        background:'#ffffff', border:'1.5px solid rgba(99,102,241,0.1)',
        display:'flex', flexWrap:'wrap', gap:1.5, alignItems:'center',
        boxShadow:'0 2px 12px rgba(99,102,241,0.07)',
      }}>
        <Box sx={{
          display:'flex', alignItems:'center', gap:0.8,
          px:1.5, py:0.6, borderRadius:20,
          background:'rgba(99,102,241,0.08)', mr:0.5,
        }}>
          <Typography sx={{ fontSize:'0.72rem', fontWeight:700, color:'#6366f1' }}>🔍 フィルタ</Typography>
        </Box>
        {[
          { val:filterProjectCd, set:setFilterProjectCd, label:'プロジェクト（全て）', items:projectsCodes.map(p=>({v:p.cd,l:p.projectName})) },
          { val:filterStatusCd,  set:setFilterStatusCd,  label:'進捗状態（全て）',     items:statusCodes.map(c=>({v:c.cd,l:c.cdName})) },
          { val:filterDeployCd,  set:setFilterDeployCd,  label:'デプロイ状態（全て）', items:deployCodes.map(c=>({v:c.cd,l:c.cdName})) },
        ].map((f,i)=>(
          <Select key={i} value={f.val} size="small" displayEmpty sx={{ minWidth:155, ...selectCellSx }}
            onChange={e=>f.set(e.target.value)}>
            <MenuItem value="">{f.label}</MenuItem>
            {f.items.map(it=><MenuItem key={it.v} value={it.v}>{it.l}</MenuItem>)}
          </Select>
        ))}
        <Button variant="contained" size="small" onClick={handleApplyFilter}
          sx={{
            background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
            boxShadow:'0 3px 12px rgba(99,102,241,0.35)', px:2,
            '&:hover':{ transform:'translateY(-1px)' },
          }}>絞込</Button>
      </Box>

      {/* ─── Table Card ─── */}
      <Box sx={{
        borderRadius:'20px', overflow:'hidden',
        border:'1.5px solid rgba(99,102,241,0.1)',
        background:'#ffffff',
        boxShadow:'0 4px 24px rgba(99,102,241,0.1)',
      }}>
        <TableContainer component={Paper} elevation={0}
          sx={{ maxHeight:'calc(100vh - 350px)', background:'transparent', border:'none' }}>
          <Table sx={{ minWidth:1200 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{
                  background:'linear-gradient(135deg,rgba(99,102,241,0.07),rgba(139,92,246,0.05)) !important',
                  borderBottom:'2px solid rgba(99,102,241,0.15) !important',
                }}>
                  <Checkbox
                    indeterminate={selectedKeys.size>0&&selectedKeys.size<filteredTasks.length}
                    checked={filteredTasks.length>0&&selectedKeys.size===filteredTasks.length}
                    onChange={e=>handleSelectAll(e.target.checked)}
                  />
                </TableCell>
                {['プロジェクト','チケット番号','リビジョン番号','進捗状態','デプロイ状態','内容','備考'].map(h=>(
                  <TableCell key={h} align="center" sx={{
                    background:'linear-gradient(135deg,rgba(99,102,241,0.07),rgba(139,92,246,0.05)) !important',
                    borderBottom:'2px solid rgba(99,102,241,0.15) !important',
                    fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.06em',
                    textTransform:'uppercase', color:'#4f46e5', py:1.5,
                    whiteSpace:'nowrap',
                  }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map(row=>{
                const index  = tasks.indexOf(row);
                const sc     = statusCodes.find(s=>s.cd===row.statusCd);
                const dc     = deployCodes.find(d=>d.cd===row.deployCd);
                const sStyle = toChipStyle(sc?.color??'');
                const dStyle = toChipStyle(dc?.color??'');
                const isSel  = selectedKeys.has(getRowKey(row));

                return (
                  <TableRow key={row.projectCd+row.ticketNo} sx={{
                    backgroundColor: isSel ? 'rgba(99,102,241,0.05) !important' : 'transparent',
                    outline: isSel ? '2px solid rgba(99,102,241,0.15)' : 'none',
                    outlineOffset: '-2px',
                    transition:'all 0.15s ease',
                  }}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSel}
                        onChange={e=>handleSelectRow(getRowKey(row),e.target.checked)} />
                    </TableCell>

                    {/* Project */}
                    <TableCell sx={{ minWidth:140 }}>
                      <Select value={row.projectCd} size="small" fullWidth sx={selectCellSx}
                        onChange={e=>handleChange(index,"projectCd",e.target.value)}>
                        <MenuItem value="">選択</MenuItem>
                        {projectsCodes.map(p=><MenuItem key={p.cd} value={p.cd}>{p.projectName}</MenuItem>)}
                      </Select>
                    </TableCell>

                    {/* Ticket */}
                    <TableCell sx={{ minWidth:130 }}>
                      <TextField variant="outlined" size="small" fullWidth sx={inputCellSx}
                        value={row.ticketNo} error={!!taskErrors[index]?.ticketNo}
                        helperText={taskErrors[index]?.ticketNo}
                        onChange={e=>handleChange(index,"ticketNo",e.target.value)} />
                    </TableCell>

                    {/* Revision */}
                    <TableCell sx={{ minWidth:130 }}>
                      <TextField variant="outlined" size="small" fullWidth sx={inputCellSx}
                        value={row.revisionNo} error={!!taskErrors[index]?.revisionNo}
                        helperText={taskErrors[index]?.revisionNo}
                        onChange={e=>handleChange(index,"revisionNo",e.target.value)} />
                    </TableCell>

                    {/* Status */}
                    <TableCell sx={{ minWidth:155 }}>
                      <Box sx={{ display:'flex', flexDirection:'column', gap:0.6, alignItems:'stretch' }}>
                        <Select value={row.statusCd} size="small" fullWidth sx={selectCellSx}
                          onChange={e=>handleChange(index,"statusCd",e.target.value)}>
                          <MenuItem value="">選択</MenuItem>
                          {statusCodes.map(c=><MenuItem key={c.cd} value={c.cd}>{c.cdName}</MenuItem>)}
                        </Select>
                        {sc?.color && (
                          <Chip label={sc.cdName} size="small" sx={{
                            height:20, fontSize:'0.65rem', fontWeight:700,
                            backgroundColor: sStyle.bg,
                            color: sStyle.text,
                            border:`1.5px solid ${sStyle.border}`,
                            '& .MuiChip-label':{ px:1 },
                          }} />
                        )}
                      </Box>
                    </TableCell>

                    {/* Deploy */}
                    <TableCell sx={{ minWidth:155 }}>
                      <Box sx={{ display:'flex', flexDirection:'column', gap:0.6, alignItems:'stretch' }}>
                        <Select value={row.deployCd} size="small" fullWidth sx={selectCellSx}
                          onChange={e=>handleChange(index,"deployCd",e.target.value)}>
                          <MenuItem value="">選択</MenuItem>
                          {deployCodes.map(c=><MenuItem key={c.cd} value={c.cd}>{c.cdName}</MenuItem>)}
                        </Select>
                        {dc?.color && (
                          <Chip label={dc.cdName} size="small" sx={{
                            height:20, fontSize:'0.65rem', fontWeight:700,
                            backgroundColor: dStyle.bg,
                            color: dStyle.text,
                            border:`1.5px solid ${dStyle.border}`,
                            '& .MuiChip-label':{ px:1 },
                          }} />
                        )}
                      </Box>
                    </TableCell>

                    {/* Note */}
                    <TableCell sx={{ minWidth:200 }}>
                      <TextField variant="outlined" size="small" fullWidth sx={inputCellSx}
                        value={row.note} error={!!taskErrors[index]?.note}
                        helperText={taskErrors[index]?.note}
                        onChange={e=>handleChange(index,"note",e.target.value)} />
                    </TableCell>

                    {/* Biko */}
                    <TableCell sx={{ minWidth:200 }}>
                      <TextField variant="outlined" size="small" fullWidth sx={inputCellSx}
                        value={row.biko} error={!!taskErrors[index]?.biko}
                        helperText={taskErrors[index]?.biko}
                        onChange={e=>handleChange(index,"biko",e.target.value)} />
                    </TableCell>
                  </TableRow>
                );
              })}

              {filteredTasks.length===0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py:8 }}>
                    <Box sx={{ fontSize:'48px', mb:2 }}>📋</Box>
                    <Typography sx={{ color:'#9ca3af', fontWeight:600, fontSize:'0.95rem' }}>
                      タスクがありません
                    </Typography>
                    <Typography sx={{ color:'#d1d5db', fontSize:'0.8rem', mt:0.5 }}>
                      「+ 追加」でタスクを新規追加できます
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TaskListPage;
