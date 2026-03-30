import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Box, Checkbox, Chip, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import {
  MstUser, RowErrors, getUserList, saveUserList, deleteUserList, updateRowError,
} from '../../common/masterCommon';
import { Messages } from '../../constants/messages';

/** 既存ユーザーのパスワード未変更を示すセンチネル値（フロント内部のみ使用） */
const EXISTING_PW = '__EXISTING__';

const ROLE_OPTIONS = [
  { value:'USER',  label:'一般ユーザー' },
  { value:'ADMIN', label:'管理者' },
];
const COLORS = ['#8b5cf6','#6366f1'];
const thSx = {
  background:'linear-gradient(135deg,rgba(139,92,246,0.07),rgba(99,102,241,0.05)) !important',
  borderBottom:'2px solid rgba(139,92,246,0.18) !important',
  fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.06em',
  textTransform:'uppercase' as const, color:'#7c3aed', py:1.5,
};
const inputSx = {
  '& .MuiOutlinedInput-root':{ fontSize:'0.82rem', borderRadius:'10px', backgroundColor:'#faf5ff',
    '& fieldset':{ borderColor:'rgba(139,92,246,0.22)' },
    '&:hover fieldset':{ borderColor:'rgba(139,92,246,0.5)' },
    '&.Mui-focused fieldset':{ borderColor:'#8b5cf6', borderWidth:2 },
  },
};
const selSx = {
  fontSize:'0.82rem', borderRadius:'10px', backgroundColor:'#faf5ff',
  '& .MuiOutlinedInput-notchedOutline':{ borderColor:'rgba(139,92,246,0.22)' },
  '&:hover .MuiOutlinedInput-notchedOutline':{ borderColor:'rgba(139,92,246,0.5)' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline':{ borderColor:'#8b5cf6', borderWidth:2 },
};

const UserMasterTab = () => {
  const [users, setUsers] = useState<MstUser[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<RowErrors>({});

  useEffect(()=>{
    getUserList()
      .then(list => setUsers(list.map(u => ({ ...u, plainPassword: EXISTING_PW }))))
      .catch(()=>{});
  },[]);

  const handleSelect=(k:string,c:boolean)=>{ const n=new Set(selectedKeys); c?n.add(k):n.delete(k); setSelectedKeys(n); };
  const handleSelectAll=(c:boolean)=>setSelectedKeys(c?new Set(users.map(u=>u.userId)):new Set());
  const handleAdd=()=>{ setUsers([...users,{userId:'',userName:'',passwordHash:'',plainPassword:'',roleCd:'USER',email:'',yukoFlag:'1'}]); setIsChanged(true); };
  const handleChange=(i:number,f:keyof MstUser,v:string)=>{
    const nl=[...users]; nl[i]={...nl[i],[f]:v}; setUsers(nl); setIsChanged(true);
    let e='';
    if(f==='userId'&&v.length>Messages.maxLength.userId) e=Messages.error.user.userId;
    else if(f==='userName'&&v.length>Messages.maxLength.userName) e=Messages.error.user.userName;
    else if(f==='email'&&v.length>Messages.maxLength.email) e=Messages.error.user.email;
    else if(f==='plainPassword'&&v!==EXISTING_PW&&v.length>0&&v.length<Messages.maxLength.plainPasswordMin) e=Messages.error.user.plainPassword;
    updateRowError(setErrors,i,f,e);
  };
  const handleDelete=async()=>{
    if(!selectedKeys.size) return;
    if(!window.confirm(`選択した ${selectedKeys.size} 件を削除してもよろしいですか？`)) return;
    try{ await deleteUserList(users.filter(u=>selectedKeys.has(u.userId)));
      alert('削除しました。'); setUsers((await getUserList()).map(u=>({...u,plainPassword:EXISTING_PW}))); setSelectedKeys(new Set()); setErrors({});
    }catch(_){ alert('削除に失敗しました。'); }
  };
  const handleRegister=async()=>{
    if(isSaving) return;
    if(Object.values(errors).some(r=>Object.keys(r).length>0)){ alert('入力内容にエラーがあります。'); return; }
    const t=users.filter(u=>u.userId.trim()!==''&&u.userName.trim()!=='');
    if(!t.length){ alert('ユーザーIDとユーザー名を入力してください。'); return; }
    if(t.some(u=>(u.plainPassword??'').trim()==='')){alert('パスワードを入力してください。'); return; }
    if(!window.confirm('登録してもよろしいですか？')) return;
    try{
      setIsSaving(true);
      // センチネル値のままの場合はパスワード変更なしとして空文字に変換
      const saveData=t.map(u=>({...u,plainPassword:u.plainPassword===EXISTING_PW?'':u.plainPassword}));
      const res=await saveUserList(saveData);
      if(res.status==='OK'){ setIsChanged(false); alert('登録しました。'); setUsers((await getUserList()).map(u=>({...u,plainPassword:EXISTING_PW}))); setErrors({}); }
      else alert('登録に失敗しました。');
    }catch(_){ alert('登録に失敗しました。'); }
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
          sx={{ borderColor:`${COLORS[0]}55`,color:COLORS[0],px:2.5,'&:hover':{ borderColor:COLORS[0],backgroundColor:`${COLORS[0]}10`,transform:'translateY(-2px)' } }}>+ 追加</Button>
        <Button variant="contained" color="error" size="small" onClick={handleDelete} disabled={!selectedKeys.size}
          sx={{ px:2.5,'&:hover':{ transform:'translateY(-2px)' } }}>✕ 削除</Button>
        {selectedKeys.size>0&&<Typography sx={{ fontSize:'0.8rem',color:'#f43f5e',fontWeight:700 }}>{selectedKeys.size} 件選択中</Typography>}
        {isChanged&&<Box sx={{ px:1.5,py:0.5,borderRadius:20,background:'rgba(245,158,11,0.1)',border:'1px solid rgba(245,158,11,0.25)' }}>
          <Typography sx={{ fontSize:'0.75rem',color:'#f59e0b',fontWeight:700 }}>● 未保存の変更があります</Typography>
        </Box>}
      </Stack>
      <Box sx={{ borderRadius:'16px',overflow:'hidden',border:'1.5px solid rgba(139,92,246,0.15)',boxShadow:'0 2px 12px rgba(139,92,246,0.08)' }}>
        <TableContainer component={Paper} elevation={0} sx={{ maxHeight:380,background:'transparent' }}>
          <Table sx={{ minWidth:920 }} stickyHeader>
            <TableHead><TableRow>
              <TableCell padding="checkbox" sx={thSx}>
                <Checkbox indeterminate={selectedKeys.size>0&&selectedKeys.size<users.length}
                  checked={users.length>0&&selectedKeys.size===users.length}
                  onChange={e=>handleSelectAll(e.target.checked)}
                  sx={{ '&.Mui-checked,&.MuiCheckbox-indeterminate':{ color:'#8b5cf6' } }} />
              </TableCell>
              <TableCell align="center" sx={thSx}>ユーザーID</TableCell>
              <TableCell align="center" sx={thSx}>ユーザー名</TableCell>
              <TableCell align="center" sx={thSx}>
                <Box>パスワード</Box>
                <Box sx={{ fontSize:'0.6rem',fontWeight:400,color:'#a78bfa',textTransform:'none',letterSpacing:0 }}>変更時のみ</Box>
              </TableCell>
              <TableCell align="center" sx={thSx}>ロール</TableCell>
              <TableCell align="center" sx={thSx}>メールアドレス</TableCell>
              <TableCell align="center" sx={thSx}>有効フラグ</TableCell>
            </TableRow></TableHead>
            <TableBody>
              {users.map((row,i)=>(
                <TableRow key={i} sx={{
                  backgroundColor:selectedKeys.has(row.userId)?'rgba(139,92,246,0.05)!important':'transparent',
                  '&:hover':{ backgroundColor:'rgba(139,92,246,0.03)!important' }, transition:'background-color 0.15s',
                }}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={selectedKeys.has(row.userId)} onChange={e=>handleSelect(row.userId,e.target.checked)}
                      sx={{ '&.Mui-checked':{ color:'#8b5cf6' } }} />
                  </TableCell>
                  <TableCell><TextField variant="outlined" size="small" fullWidth value={row.userId} sx={inputSx}
                    error={!!errors[i]?.userId} helperText={errors[i]?.userId} onChange={e=>handleChange(i,'userId',e.target.value)} /></TableCell>
                  <TableCell><TextField variant="outlined" size="small" fullWidth value={row.userName} sx={inputSx}
                    error={!!errors[i]?.userName} helperText={errors[i]?.userName} onChange={e=>handleChange(i,'userName',e.target.value)} /></TableCell>
                  <TableCell><TextField variant="outlined" size="small" fullWidth type="password" value={row.plainPassword??''} sx={inputSx}
                    placeholder="パスワードを入力"
                    error={!!errors[i]?.plainPassword} helperText={errors[i]?.plainPassword}
                    onFocus={()=>{ if(row.plainPassword===EXISTING_PW) handleChange(i,'plainPassword',''); }}
                    onChange={e=>handleChange(i,'plainPassword',e.target.value)} /></TableCell>
                  <TableCell>
                    <Box sx={{ display:'flex',flexDirection:'column',gap:0.5 }}>
                      <Select value={row.roleCd} size="small" fullWidth sx={selSx} onChange={e=>handleChange(i,'roleCd',e.target.value)}>
                        {ROLE_OPTIONS.map(o=><MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                      </Select>
                      <Chip label={row.roleCd==='ADMIN'?'👑 管理者':'👤 一般'} size="small" sx={{
                        height:20, fontSize:'0.65rem', fontWeight:700,
                        background: row.roleCd==='ADMIN'
                          ? 'linear-gradient(135deg,rgba(244,63,94,0.12),rgba(236,72,153,0.1))'
                          : 'linear-gradient(135deg,rgba(139,92,246,0.1),rgba(99,102,241,0.08))',
                        color: row.roleCd==='ADMIN' ? '#e11d48' : '#7c3aed',
                        border:`1.5px solid ${row.roleCd==='ADMIN'?'rgba(244,63,94,0.25)':'rgba(139,92,246,0.22)'}`,
                        '& .MuiChip-label':{ px:1 },
                      }} />
                    </Box>
                  </TableCell>
                  <TableCell><TextField variant="outlined" size="small" fullWidth value={row.email??''} sx={inputSx}
                    error={!!errors[i]?.email} helperText={errors[i]?.email} onChange={e=>handleChange(i,'email',e.target.value)} /></TableCell>
                  <TableCell>
                    <Select value={row.yukoFlag} size="small" fullWidth sx={selSx} onChange={e=>handleChange(i,'yukoFlag',e.target.value)}>
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
export default UserMasterTab;
