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
  MstCode, MstGroupCode, RowErrors, getCodeList, saveCodeList,
  deleteCodeList, getGroupCodeList, updateRowError,
} from '../../common/masterCommon';
import { Messages } from '../../constants/messages';

const COLORS = ['#f59e0b','#f43f5e'];
const thSx = {
  background:'linear-gradient(135deg,rgba(245,158,11,0.08),rgba(244,63,94,0.05)) !important',
  borderBottom:'2px solid rgba(245,158,11,0.2) !important',
  fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.06em',
  textTransform:'uppercase' as const, color:'#d97706', py:1.5,
};
const inputSx = {
  '& .MuiOutlinedInput-root':{ fontSize:'0.82rem', borderRadius:'10px', backgroundColor:'#fffbf5',
    '& fieldset':{ borderColor:'rgba(245,158,11,0.25)' },
    '&:hover fieldset':{ borderColor:'rgba(245,158,11,0.5)' },
    '&.Mui-focused fieldset':{ borderColor:'#f59e0b', borderWidth:2 },
  },
};
const selSx = {
  fontSize:'0.82rem', borderRadius:'10px', backgroundColor:'#fffbf5',
  '& .MuiOutlinedInput-notchedOutline':{ borderColor:'rgba(245,158,11,0.25)' },
  '&:hover .MuiOutlinedInput-notchedOutline':{ borderColor:'rgba(245,158,11,0.5)' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline':{ borderColor:'#f59e0b', borderWidth:2 },
};

const CodeMasterTab = () => {
  const [codes, setCodes] = useState<MstCode[]>([]);
  const [groupCodes, setGroupCodes] = useState<MstGroupCode[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<RowErrors>({});

  useEffect(()=>{
    Promise.all([getCodeList(),getGroupCodeList()]).then(([c,g])=>{ setCodes(c); setGroupCodes(g); }).catch(()=>{});
  },[]);

  const key=(r:MstCode)=>`${r.grCd}_${r.cd}`;
  const handleSelect=(k:string,c:boolean)=>{ const n=new Set(selectedKeys); c?n.add(k):n.delete(k); setSelectedKeys(n); };
  const handleSelectAll=(c:boolean)=>setSelectedKeys(c?new Set(codes.map(key)):new Set());
  const handleDelete=async()=>{
    if(!selectedKeys.size) return;
    if(!window.confirm(`選択した ${selectedKeys.size} 件を削除してもよろしいですか？`)) return;
    try{ await deleteCodeList(codes.filter(c=>selectedKeys.has(key(c))));
      alert("削除しました。"); setCodes(await getCodeList()); setSelectedKeys(new Set()); setErrors({});
    }catch(_){ alert("削除に失敗しました。"); }
  };
  const handleChange=(i:number,f:keyof MstCode,v:string)=>{
    const nl=[...codes]; nl[i][f]=v; setCodes(nl); setIsChanged(true);
    let e="";
    if(f==="cd"&&v.length>Messages.maxLength.codeCd) e=Messages.error.code.cd;
    else if(f==="cdName"&&v.length>Messages.maxLength.codeName) e=Messages.error.code.cdName;
    else if(f==="color"&&v.length>Messages.maxLength.color) e=Messages.error.code.color;
    else if(f==="note"&&v.length>Messages.maxLength.note) e=Messages.error.code.note;
    else if(f==="biko"&&v.length>Messages.maxLength.biko) e=Messages.error.code.biko;
    updateRowError(setErrors,i,f,e);
  };
  const handleAdd=()=>{ setCodes([...codes,{grCd:"",cd:"",cdName:"",color:"",note:"",biko:"",yukoFlag:"1"}]); setIsChanged(true); };
  const handleRegister=async()=>{
    if(isSaving) return;
    if(Object.values(errors).some(r=>Object.keys(r).length>0)){ alert("入力内容にエラーがあります。"); return; }
    if(!window.confirm("登録してもよろしいですか？")) return;
    try{
      setIsSaving(true);
      const t=codes.filter(c=>c.grCd.trim()!==""&&c.cd.trim()!==""&&c.cdName.trim()!=="");
      if(!t.length){ alert("グループCD・CD・コード名称を入力してください。"); return; }
      const res=await saveCodeList(t);
      if(res.status==="OK"){ setIsChanged(false); alert("登録しました。"); setCodes(await getCodeList()); setErrors({}); }
      else alert("登録に失敗しました");
    }catch(_){ alert("登録に失敗しました。"); }
    finally{ setIsSaving(false); }
  };

  return (
    <Box>
      <Stack direction="row" spacing={1.5} sx={{ mb:2.5 }} alignItems="center">
        <Button variant="contained" size="small" onClick={handleRegister} disabled={isSaving}
          sx={{ background:`linear-gradient(135deg,${COLORS[0]},${COLORS[1]})`, boxShadow:`0 4px 14px ${COLORS[0]}55`, px:2.5,
            '&:hover':{ transform:'translateY(-2px)' },'&.Mui-disabled':{ opacity:0.5 } }}>
          {isSaving?"登録中...":"✓ 登録"}</Button>
        <Button variant="outlined" size="small" onClick={handleAdd} disabled={isSaving}
          sx={{ borderColor:`${COLORS[0]}66`,color:COLORS[0],px:2.5,'&:hover':{ borderColor:COLORS[0],backgroundColor:`${COLORS[0]}10`,transform:'translateY(-2px)' } }}>+ 追加</Button>
        <Button variant="contained" color="error" size="small" onClick={handleDelete} disabled={!selectedKeys.size}
          sx={{ px:2.5,'&:hover':{ transform:'translateY(-2px)' } }}>✕ 削除</Button>
        {selectedKeys.size>0&&<Typography sx={{ fontSize:'0.8rem',color:'#f43f5e',fontWeight:700 }}>{selectedKeys.size} 件選択中</Typography>}
        {isChanged&&<Box sx={{ px:1.5,py:0.5,borderRadius:20,background:'rgba(245,158,11,0.1)',border:'1px solid rgba(245,158,11,0.25)' }}>
          <Typography sx={{ fontSize:'0.75rem',color:'#f59e0b',fontWeight:700 }}>● 未保存の変更があります</Typography>
        </Box>}
      </Stack>
      <Box sx={{ borderRadius:'16px',overflow:'hidden',border:'1.5px solid rgba(245,158,11,0.15)',boxShadow:'0 2px 12px rgba(245,158,11,0.08)' }}>
        <TableContainer component={Paper} elevation={0} sx={{ maxHeight:380,background:'transparent' }}>
          <Table sx={{ minWidth:820 }} stickyHeader>
            <TableHead><TableRow>
              <TableCell padding="checkbox" sx={thSx}>
                <Checkbox indeterminate={selectedKeys.size>0&&selectedKeys.size<codes.length}
                  checked={codes.length>0&&selectedKeys.size===codes.length}
                  onChange={e=>handleSelectAll(e.target.checked)}
                  sx={{ '&.Mui-checked,&.MuiCheckbox-indeterminate':{ color:'#f59e0b' } }} />
              </TableCell>
              {['グループCD','CD','コード名称','カラー','内容','備考','有効フラグ'].map(h=>(
                <TableCell key={h} align="center" sx={thSx}>{h}</TableCell>
              ))}
            </TableRow></TableHead>
            <TableBody>
              {codes.map((row,i)=>(
                <TableRow key={i} sx={{
                  backgroundColor:selectedKeys.has(key(row))?'rgba(245,158,11,0.05)!important':'transparent',
                  '&:hover':{ backgroundColor:'rgba(245,158,11,0.03)!important' },
                  transition:'background-color 0.15s',
                }}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={selectedKeys.has(key(row))} onChange={e=>handleSelect(key(row),e.target.checked)}
                      sx={{ '&.Mui-checked':{ color:'#f59e0b' } }} />
                  </TableCell>
                  <TableCell>
                    <Select value={row.grCd} size="small" fullWidth sx={selSx} onChange={e=>handleChange(i,"grCd",e.target.value)}>
                      <MenuItem value="">選択</MenuItem>
                      {groupCodes.map(g=><MenuItem key={g.cd} value={g.cd}>{g.cdName}</MenuItem>)}
                    </Select>
                  </TableCell>
                  <TableCell><TextField variant="outlined" size="small" fullWidth value={row.cd} sx={inputSx}
                    error={!!errors[i]?.cd} helperText={errors[i]?.cd} onChange={e=>handleChange(i,"cd",e.target.value)} /></TableCell>
                  <TableCell><TextField variant="outlined" size="small" fullWidth value={row.cdName} sx={inputSx}
                    error={!!errors[i]?.cdName} helperText={errors[i]?.cdName} onChange={e=>handleChange(i,"cdName",e.target.value)} /></TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {/* Color preview swatch */}
                      {row.color && (
                        <Box sx={{
                          width:28, height:28, borderRadius:'8px', flexShrink:0,
                          background:row.color, border:'2px solid rgba(0,0,0,0.08)',
                          boxShadow:`0 2px 8px ${row.color}55`,
                        }} />
                      )}
                      <Box sx={{ position:'relative' }}>
                        <input type="color" value={row.color||"#6366f1"} onChange={e=>handleChange(i,"color",e.target.value)}
                          style={{ width:34,height:34,border:'1.5px solid rgba(245,158,11,0.3)',
                            padding:2,cursor:'pointer',borderRadius:8,backgroundColor:'#fffbf5' }} />
                      </Box>
                      <TextField variant="outlined" size="small" sx={{ width:92,...inputSx }}
                        value={row.color??""} placeholder="#F59E0B"
                        error={!!errors[i]?.color} helperText={errors[i]?.color}
                        onChange={e=>handleChange(i,"color",e.target.value)} />
                    </Stack>
                  </TableCell>
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
export default CodeMasterTab;
