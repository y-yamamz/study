import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Box, Checkbox, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import {
  MstSystem, MstProject, RowErrors, getSystemList, getProjectList,
  saveProjectList, deleteProjectList, updateRowError,
} from '../../common/masterCommon';
import { Messages } from '../../constants/messages';

const COLORS = ['#f43f5e','#ec4899'];
const thSx = {
  background:'linear-gradient(135deg,rgba(244,63,94,0.07),rgba(236,72,153,0.05)) !important',
  borderBottom:'2px solid rgba(244,63,94,0.15) !important',
  fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.06em',
  textTransform:'uppercase' as const, color:'#e11d48', py:1.5,
};
const inputSx = {
  '& .MuiOutlinedInput-root':{ fontSize:'0.82rem', borderRadius:'10px', backgroundColor:'#fafbff',
    '& fieldset':{ borderColor:'rgba(244,63,94,0.2)' },
    '&:hover fieldset':{ borderColor:'rgba(244,63,94,0.5)' },
    '&.Mui-focused fieldset':{ borderColor:'#f43f5e', borderWidth:2 },
  },
};
const selSx = {
  fontSize:'0.82rem', borderRadius:'10px', backgroundColor:'#fafbff',
  '& .MuiOutlinedInput-notchedOutline':{ borderColor:'rgba(244,63,94,0.2)' },
  '&:hover .MuiOutlinedInput-notchedOutline':{ borderColor:'rgba(244,63,94,0.5)' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline':{ borderColor:'#f43f5e', borderWidth:2 },
};

const ProjectMasterTab = () => {
  const [projects, setProjects] = useState<MstProject[]>([]);
  const [systems, setSystems] = useState<MstSystem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<RowErrors>({});

  useEffect(()=>{
    Promise.all([getProjectList(),getSystemList()]).then(([p,s])=>{ setProjects(p); setSystems(s); }).catch(()=>{});
  },[]);

  const key=(r:MstProject)=>`${r.systemCd}_${r.cd}`;
  const handleSelect=(k:string,c:boolean)=>{ const n=new Set(selectedKeys); c?n.add(k):n.delete(k); setSelectedKeys(n); };
  const handleSelectAll=(c:boolean)=>setSelectedKeys(c?new Set(projects.map(key)):new Set());
  const handleDelete=async()=>{
    if(!selectedKeys.size) return;
    if(!window.confirm(`選択した ${selectedKeys.size} 件を削除してもよろしいですか？`)) return;
    try{ await deleteProjectList(projects.filter(p=>selectedKeys.has(key(p))));
      alert("削除しました。"); setProjects(await getProjectList()); setSelectedKeys(new Set()); setErrors({});
    }catch(_){ alert("削除に失敗しました。"); }
  };
  const handleChange=(i:number,f:keyof MstProject,v:string)=>{
    const nl=[...projects]; nl[i][f]=v; setProjects(nl); setIsChanged(true);
    let e="";
    if(f==="cd"&&v.length>Messages.maxLength.projectCd) e=Messages.error.project.cd;
    else if(f==="projectName"&&v.length>Messages.maxLength.projectName) e=Messages.error.project.projectName;
    else if(f==="note"&&v.length>Messages.maxLength.note) e=Messages.error.project.note;
    else if(f==="biko"&&v.length>Messages.maxLength.biko) e=Messages.error.project.biko;
    updateRowError(setErrors,i,f,e);
  };
  const handleAdd=()=>{ setProjects([...projects,{systemCd:"",cd:"",projectName:"",note:"",biko:"",yukoFlag:"1"}]); setIsChanged(true); };
  const handleRegister=async()=>{
    if(isSaving) return;
    if(Object.values(errors).some(r=>Object.keys(r).length>0)){ alert("入力内容にエラーがあります。"); return; }
    if(!window.confirm("登録してもよろしいですか？")) return;
    try{
      setIsSaving(true);
      const t=projects.filter(p=>p.systemCd.trim()!==""&&p.cd.trim()!==""&&p.projectName.trim()!=="");
      if(!t.length){ alert("システムCD・CD・プロジェクト名を入力してください。"); return; }
      const res=await saveProjectList(t);
      if(res.status==="OK"){ setIsChanged(false); alert("登録しました。"); setProjects(await getProjectList()); setErrors({}); }
      else alert("登録に失敗しました");
    }catch(_){ alert("登録に失敗しました。"); }
    finally{ setIsSaving(false); }
  };

  return (
    <Box>
      <Stack direction="row" spacing={1.5} sx={{ mb:2.5 }} alignItems="center">
        <Button variant="contained" size="small" onClick={handleRegister} disabled={isSaving}
          sx={{ background:`linear-gradient(135deg,${COLORS[0]},${COLORS[1]})`, boxShadow:`0 4px 14px ${COLORS[0]}44`, px:2.5,
            '&:hover':{ transform:'translateY(-2px)' },'&.Mui-disabled':{ opacity:0.5 } }}>
          {isSaving?"登録中...":"✓ 登録"}
        </Button>
        <Button variant="outlined" size="small" onClick={handleAdd} disabled={isSaving}
          sx={{ borderColor:`${COLORS[0]}55`,color:COLORS[0],px:2.5,
            '&:hover':{ borderColor:COLORS[0],backgroundColor:`${COLORS[0]}0a`,transform:'translateY(-2px)' } }}>+ 追加</Button>
        <Button variant="contained" color="error" size="small" onClick={handleDelete} disabled={!selectedKeys.size}
          sx={{ px:2.5,'&:hover':{ transform:'translateY(-2px)' } }}>✕ 削除</Button>
        {selectedKeys.size>0&&<Typography sx={{ fontSize:'0.8rem',color:'#f43f5e',fontWeight:700 }}>{selectedKeys.size} 件選択中</Typography>}
        {isChanged&&<Box sx={{ px:1.5,py:0.5,borderRadius:20,background:'rgba(245,158,11,0.1)',border:'1px solid rgba(245,158,11,0.2)' }}>
          <Typography sx={{ fontSize:'0.75rem',color:'#f59e0b',fontWeight:700 }}>● 未保存の変更があります</Typography>
        </Box>}
      </Stack>
      <Box sx={{ borderRadius:'16px',overflow:'hidden',border:'1.5px solid rgba(244,63,94,0.12)',boxShadow:'0 2px 12px rgba(244,63,94,0.06)' }}>
        <TableContainer component={Paper} elevation={0} sx={{ maxHeight:380,background:'transparent' }}>
          <Table sx={{ minWidth:750 }} stickyHeader>
            <TableHead><TableRow>
              <TableCell padding="checkbox" sx={thSx}>
                <Checkbox indeterminate={selectedKeys.size>0&&selectedKeys.size<projects.length}
                  checked={projects.length>0&&selectedKeys.size===projects.length}
                  onChange={e=>handleSelectAll(e.target.checked)}
                  sx={{ '&.Mui-checked,&.MuiCheckbox-indeterminate':{ color:'#f43f5e' } }} />
              </TableCell>
              {['システムCD','CD','プロジェクト名','内容','備考','有効フラグ'].map(h=>(
                <TableCell key={h} align="center" sx={thSx}>{h}</TableCell>
              ))}
            </TableRow></TableHead>
            <TableBody>
              {projects.map((row,i)=>(
                <TableRow key={i} sx={{
                  backgroundColor:selectedKeys.has(key(row))?'rgba(244,63,94,0.04)!important':'transparent',
                  '&:hover':{ backgroundColor:'rgba(244,63,94,0.03)!important' },
                  transition:'background-color 0.15s',
                }}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={selectedKeys.has(key(row))} onChange={e=>handleSelect(key(row),e.target.checked)}
                      sx={{ '&.Mui-checked':{ color:'#f43f5e' } }} />
                  </TableCell>
                  <TableCell>
                    <Select value={row.systemCd} size="small" fullWidth sx={selSx} onChange={e=>handleChange(i,"systemCd",e.target.value)}>
                      <MenuItem value="">選択</MenuItem>
                      {systems.map(s=><MenuItem key={s.cd} value={s.cd}>{s.systemName}</MenuItem>)}
                    </Select>
                  </TableCell>
                  <TableCell><TextField variant="outlined" size="small" fullWidth value={row.cd} sx={inputSx}
                    error={!!errors[i]?.cd} helperText={errors[i]?.cd} onChange={e=>handleChange(i,"cd",e.target.value)} /></TableCell>
                  <TableCell><TextField variant="outlined" size="small" fullWidth value={row.projectName} sx={inputSx}
                    error={!!errors[i]?.projectName} helperText={errors[i]?.projectName} onChange={e=>handleChange(i,"projectName",e.target.value)} /></TableCell>
                  <TableCell><TextField variant="outlined" size="small" fullWidth value={row.note??""} sx={inputSx}
                    error={!!errors[i]?.note} helperText={errors[i]?.note} onChange={e=>handleChange(i,"note",e.target.value)} /></TableCell>
                  <TableCell><TextField variant="outlined" size="small" fullWidth value={row.biko??""} sx={inputSx}
                    error={!!errors[i]?.biko} helperText={errors[i]?.biko} onChange={e=>handleChange(i,"biko",e.target.value)} /></TableCell>
                  <TableCell>
                    <Select value={row.yukoFlag} size="small" fullWidth sx={selSx} onChange={e=>handleChange(i,"yukoFlag",e.target.value)}>
                      <MenuItem value="1">✅ 有効</MenuItem><MenuItem value="0">❌ 無効</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
export default ProjectMasterTab;
