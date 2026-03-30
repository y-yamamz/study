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
  MstSystem, RowErrors, getSystemList, saveSystemList, deleteSystemList, updateRowError,
} from '../../common/masterCommon';
import { Messages } from '../../constants/messages';

const TH_COLORS = ['#6366f1','#8b5cf6'];

const thSx = {
  background:`linear-gradient(135deg,rgba(99,102,241,0.07),rgba(139,92,246,0.05)) !important`,
  borderBottom:'2px solid rgba(99,102,241,0.15) !important',
  fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.06em',
  textTransform:'uppercase' as const, color:'#4f46e5', py:1.5,
};
const inputSx = {
  '& .MuiOutlinedInput-root':{
    fontSize:'0.82rem', borderRadius:'10px', backgroundColor:'#fafbff',
    '& fieldset':{ borderColor:'rgba(99,102,241,0.18)' },
    '&:hover fieldset':{ borderColor:'rgba(99,102,241,0.45)' },
    '&.Mui-focused fieldset':{ borderColor:'#6366f1', borderWidth:2 },
  },
};
const selSx = {
  fontSize:'0.82rem', borderRadius:'10px', backgroundColor:'#fafbff',
  '& .MuiOutlinedInput-notchedOutline':{ borderColor:'rgba(99,102,241,0.18)' },
  '&:hover .MuiOutlinedInput-notchedOutline':{ borderColor:'rgba(99,102,241,0.45)' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline':{ borderColor:'#6366f1', borderWidth:2 },
};

const SystemMasterTab = () => {
  const [systems, setSystems] = useState<MstSystem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<RowErrors>({});

  useEffect(()=>{ getSystemList().then(setSystems).catch(()=>{}); },[]);

  const handleSelect = (k:string,c:boolean)=>{ const n=new Set(selectedKeys); c?n.add(k):n.delete(k); setSelectedKeys(n); };
  const handleSelectAll = (c:boolean)=> setSelectedKeys(c?new Set(systems.map(s=>s.cd)):new Set());

  const handleDelete = async()=>{
    if(!selectedKeys.size) return;
    if(!window.confirm(`選択した ${selectedKeys.size} 件を削除してもよろしいですか？`)) return;
    try{
      await deleteSystemList(systems.filter(s=>selectedKeys.has(s.cd)));
      alert("削除しました。"); setSystems(await getSystemList()); setSelectedKeys(new Set()); setErrors({});
    }catch(_){ alert("削除に失敗しました。"); }
  };

  const handleChange=(index:number,field:keyof MstSystem,value:string)=>{
    const nl=[...systems]; nl[index][field]=value; setSystems(nl); setIsChanged(true);
    let e="";
    if(field==="systemName"&&value.length>Messages.maxLength.systemName) e=Messages.error.system.systemName;
    else if(field==="note"&&value.length>Messages.maxLength.note) e=Messages.error.system.note;
    else if(field==="biko"&&value.length>Messages.maxLength.biko) e=Messages.error.system.biko;
    updateRowError(setErrors,index,field,e);
  };

  const handleAdd=()=>{
    const max=systems.reduce((m,s)=>{ const n=parseInt(s.cd,10); return isNaN(n)?m:Math.max(m,n); },0);
    setSystems([...systems,{ cd:String(max+1).padStart(3,"0"),systemName:"",note:"",biko:"",yukoFlag:"1" }]);
    setIsChanged(true);
  };

  const handleRegister=async()=>{
    if(isSaving) return;
    if(Object.values(errors).some(r=>Object.keys(r).length>0)){ alert("入力内容にエラーがあります。"); return; }
    if(!window.confirm("登録してもよろしいですか？")) return;
    try{
      setIsSaving(true);
      const t=systems.filter(s=>s.systemName.trim()!=="");
      if(!t.length){ alert("システム名を入力してください。"); return; }
      const res=await saveSystemList(t);
      if(res.status==="OK"){ setIsChanged(false); alert("登録しました。"); setSystems(await getSystemList()); setErrors({}); }
      else alert("登録に失敗しました");
    }catch(_){ alert("登録に失敗しました。"); }
    finally{ setIsSaving(false); }
  };

  return (
    <Box>
      <Stack direction="row" spacing={1.5} sx={{ mb:2.5 }} alignItems="center">
        <Button variant="contained" size="small" onClick={handleRegister} disabled={isSaving}
          sx={{ background:`linear-gradient(135deg,${TH_COLORS[0]},${TH_COLORS[1]})`, boxShadow:`0 4px 14px ${TH_COLORS[0]}44`, px:2.5,
            '&:hover':{ transform:'translateY(-2px)' }, '&.Mui-disabled':{ opacity:0.5 } }}>
          {isSaving?"登録中...":"✓ 登録"}
        </Button>
        <Button variant="outlined" size="small" onClick={handleAdd} disabled={isSaving}
          sx={{ borderColor:`${TH_COLORS[0]}55`, color:TH_COLORS[0], px:2.5,
            '&:hover':{ borderColor:TH_COLORS[0], backgroundColor:`${TH_COLORS[0]}0a`, transform:'translateY(-2px)' } }}>
          + 追加
        </Button>
        <Button variant="contained" color="error" size="small" onClick={handleDelete} disabled={!selectedKeys.size}
          sx={{ background:selectedKeys.size?'linear-gradient(135deg,#f43f5e,#ec4899)':undefined,
            px:2.5, '&:hover':{ transform:'translateY(-2px)' } }}>
          ✕ 削除
        </Button>
        {selectedKeys.size>0&&<Typography sx={{ fontSize:'0.8rem',color:'#f43f5e',fontWeight:700 }}>{selectedKeys.size} 件選択中</Typography>}
        {isChanged&&<Box sx={{ display:'flex',alignItems:'center',gap:0.5,px:1.5,py:0.5,borderRadius:20,background:'rgba(245,158,11,0.1)',border:'1px solid rgba(245,158,11,0.2)' }}>
          <Typography sx={{ fontSize:'0.75rem',color:'#f59e0b',fontWeight:700 }}>● 未保存の変更があります</Typography>
        </Box>}
      </Stack>

      <Box sx={{ borderRadius:'16px',overflow:'hidden',border:'1.5px solid rgba(99,102,241,0.1)',boxShadow:'0 2px 12px rgba(99,102,241,0.07)' }}>
        <TableContainer component={Paper} elevation={0} sx={{ maxHeight:380,background:'transparent' }}>
          <Table sx={{ minWidth:700 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={thSx}>
                  <Checkbox indeterminate={selectedKeys.size>0&&selectedKeys.size<systems.length}
                    checked={systems.length>0&&selectedKeys.size===systems.length}
                    onChange={e=>handleSelectAll(e.target.checked)} />
                </TableCell>
                {['CD','システム名','内容','備考','有効フラグ'].map(h=>(
                  <TableCell key={h} align="center" sx={thSx}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {systems.map((row,i)=>(
                <TableRow key={i} sx={{
                  backgroundColor:selectedKeys.has(row.cd)?'rgba(99,102,241,0.05)!important':'transparent',
                  '&:hover':{ backgroundColor:'rgba(99,102,241,0.03)!important' },
                  transition:'background-color 0.15s ease',
                }}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={selectedKeys.has(row.cd)} onChange={e=>handleSelect(row.cd,e.target.checked)} />
                  </TableCell>
                  <TableCell><TextField variant="outlined" size="small" fullWidth value={row.cd} sx={inputSx} slotProps={{ input:{ readOnly:true } }} /></TableCell>
                  <TableCell><TextField variant="outlined" size="small" fullWidth value={row.systemName} sx={inputSx}
                    error={!!errors[i]?.systemName} helperText={errors[i]?.systemName}
                    onChange={e=>handleChange(i,"systemName",e.target.value)} /></TableCell>
                  <TableCell><TextField variant="outlined" size="small" fullWidth value={row.note??""} sx={inputSx}
                    error={!!errors[i]?.note} helperText={errors[i]?.note}
                    onChange={e=>handleChange(i,"note",e.target.value)} /></TableCell>
                  <TableCell><TextField variant="outlined" size="small" fullWidth value={row.biko??""} sx={inputSx}
                    error={!!errors[i]?.biko} helperText={errors[i]?.biko}
                    onChange={e=>handleChange(i,"biko",e.target.value)} /></TableCell>
                  <TableCell>
                    <Select value={row.yukoFlag} size="small" fullWidth sx={selSx}
                      onChange={e=>handleChange(i,"yukoFlag",e.target.value)}>
                      <MenuItem value="1">✅ 有効</MenuItem>
                      <MenuItem value="0">❌ 無効</MenuItem>
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
export default SystemMasterTab;
