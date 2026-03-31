import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Box, Checkbox, Chip, MenuItem, Select, Stack, Typography } from '@mui/material';
import LocalTextField from '../../../common/LocalTextField';
import { useUserMaster } from './useUserMaster';
import { COLORS, ROLE_OPTIONS, PasswordTextField } from './utils';
import { thSx, inputSx, selSx } from './styles';

const UserMasterTab = () => {
  const {
    users, isSaving, isChanged, selectedKeys, errors,
    handleSelect, handleSelectAll, handleAdd, handleChange, handleDelete, handleRegister,
  } = useUserMaster();

  return (
    <Box>
      <Stack direction="row" spacing={1.5} sx={{ mb: 2.5 }} alignItems="center">
        <Button variant="contained" size="small" onClick={handleRegister} disabled={isSaving}
          sx={{ background: `linear-gradient(135deg,${COLORS[0]},${COLORS[1]})`, boxShadow: `0 4px 14px ${COLORS[0]}55`, px: 2.5,
            '&:hover': { transform: 'translateY(-2px)' }, '&.Mui-disabled': { opacity: 0.5 } }}>
          {isSaving ? '登録中...' : '✓ 登録'}
        </Button>
        <Button variant="outlined" size="small" onClick={handleAdd} disabled={isSaving}
          sx={{ borderColor: `${COLORS[0]}55`, color: COLORS[0], px: 2.5,
            '&:hover': { borderColor: COLORS[0], backgroundColor: `${COLORS[0]}10`, transform: 'translateY(-2px)' } }}>
          + 追加
        </Button>
        <Button variant="contained" color="error" size="small" onClick={handleDelete} disabled={!selectedKeys.size}
          sx={{ px: 2.5, '&:hover': { transform: 'translateY(-2px)' } }}>
          ✕ 削除
        </Button>
        {selectedKeys.size > 0 && (
          <Typography sx={{ fontSize: '0.8rem', color: '#f43f5e', fontWeight: 700 }}>
            {selectedKeys.size} 件選択中
          </Typography>
        )}
        {isChanged && (
          <Box sx={{ px: 1.5, py: 0.5, borderRadius: 20, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}>
            <Typography sx={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 700 }}>● 未保存の変更があります</Typography>
          </Box>
        )}
      </Stack>

      <Box sx={{ borderRadius: '16px', overflow: 'hidden', border: '1.5px solid rgba(139,92,246,0.15)', boxShadow: '0 2px 12px rgba(139,92,246,0.08)' }}>
        <TableContainer component={Paper} elevation={0} sx={{ maxHeight: 380, background: 'transparent' }}>
          <Table sx={{ minWidth: 920, '& .MuiTableCell-stickyHeader': { backgroundColor: '#faf5ff', zIndex: 100 } }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={thSx}>
                  <Checkbox
                    indeterminate={selectedKeys.size > 0 && selectedKeys.size < users.length}
                    checked={users.length > 0 && selectedKeys.size === users.length}
                    onChange={e => handleSelectAll(e.target.checked)}
                    sx={{ '&.Mui-checked,&.MuiCheckbox-indeterminate': { color: '#8b5cf6' } }}
                  />
                </TableCell>
                <TableCell align="center" sx={thSx}>ユーザーID</TableCell>
                <TableCell align="center" sx={thSx}>ユーザー名</TableCell>
                <TableCell align="center" sx={thSx}>
                  <Box>パスワード</Box>
                  <Box sx={{ fontSize: '0.6rem', fontWeight: 400, color: '#a78bfa', textTransform: 'none', letterSpacing: 0 }}>変更時のみ</Box>
                </TableCell>
                <TableCell align="center" sx={thSx}>ロール</TableCell>
                <TableCell align="center" sx={thSx}>メールアドレス</TableCell>
                <TableCell align="center" sx={thSx}>有効フラグ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row, i) => (
                <TableRow key={i} sx={{
                  backgroundColor: selectedKeys.has(row.userId) ? 'rgba(139,92,246,0.05) !important' : 'transparent',
                  '&:hover': { backgroundColor: 'rgba(139,92,246,0.03) !important' },
                  transition: 'background-color 0.15s',
                }}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={selectedKeys.has(row.userId)} onChange={e => handleSelect(row.userId, e.target.checked)}
                      sx={{ '&.Mui-checked': { color: '#8b5cf6' } }} />
                  </TableCell>
                  <TableCell>
                    <LocalTextField sx={inputSx} value={row.userId}
                      error={!!errors[i]?.userId} helperText={errors[i]?.userId}
                      onChange={v => handleChange(i, 'userId', v)} />
                  </TableCell>
                  <TableCell>
                    <LocalTextField sx={inputSx} value={row.userName}
                      error={!!errors[i]?.userName} helperText={errors[i]?.userName}
                      onChange={v => handleChange(i, 'userName', v)} />
                  </TableCell>
                  <TableCell>
                    <PasswordTextField sx={inputSx} value={row.plainPassword ?? ''}
                      error={!!errors[i]?.plainPassword} helperText={errors[i]?.plainPassword}
                      onChange={v => handleChange(i, 'plainPassword', v)} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Select value={row.roleCd} size="small" fullWidth sx={selSx}
                        onChange={e => handleChange(i, 'roleCd', e.target.value)}>
                        {ROLE_OPTIONS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                      </Select>
                      <Chip label={row.roleCd === 'ADMIN' ? '👑 管理者' : '👤 一般'} size="small" sx={{
                        height: 20, fontSize: '0.65rem', fontWeight: 700,
                        background: row.roleCd === 'ADMIN'
                          ? 'linear-gradient(135deg,rgba(244,63,94,0.12),rgba(236,72,153,0.1))'
                          : 'linear-gradient(135deg,rgba(139,92,246,0.1),rgba(99,102,241,0.08))',
                        color: row.roleCd === 'ADMIN' ? '#e11d48' : '#7c3aed',
                        border: `1.5px solid ${row.roleCd === 'ADMIN' ? 'rgba(244,63,94,0.25)' : 'rgba(139,92,246,0.22)'}`,
                        '& .MuiChip-label': { px: 1 },
                      }} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <LocalTextField sx={inputSx} value={row.email ?? ''}
                      error={!!errors[i]?.email} helperText={errors[i]?.email}
                      onChange={v => handleChange(i, 'email', v)} />
                  </TableCell>
                  <TableCell>
                    <Select value={row.yukoFlag} size="small" fullWidth sx={selSx}
                      onChange={e => handleChange(i, 'yukoFlag', e.target.value)}>
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

export default UserMasterTab;
