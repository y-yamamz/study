import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, Checkbox, MenuItem, Select, Stack, Typography } from '@mui/material';
import LocalTextField from '../../../common/LocalTextField';
import { useSystemMaster } from './useSystemMaster';
import { COLORS } from './utils';
import { thSx, inputSx, selSx } from './styles';

const SystemMasterTab = () => {
  const {
    systems, isSaving, isChanged, selectedKeys, errors,
    handleSelect, handleSelectAll, handleAdd, handleChange, handleDelete, handleRegister,
  } = useSystemMaster();

  return (
    <Box>
      <Stack direction="row" spacing={1.5} sx={{ mb: 2.5 }} alignItems="center">
        <Button variant="contained" size="small" onClick={handleRegister} disabled={isSaving}
          sx={{ background: `linear-gradient(135deg,${COLORS[0]},${COLORS[1]})`, boxShadow: `0 4px 14px ${COLORS[0]}44`, px: 2.5,
            '&:hover': { transform: 'translateY(-2px)' }, '&.Mui-disabled': { opacity: 0.5 } }}>
          {isSaving ? '登録中...' : '✓ 登録'}
        </Button>
        <Button variant="outlined" size="small" onClick={handleAdd} disabled={isSaving}
          sx={{ borderColor: `${COLORS[0]}55`, color: COLORS[0], px: 2.5,
            '&:hover': { borderColor: COLORS[0], backgroundColor: `${COLORS[0]}0a`, transform: 'translateY(-2px)' } }}>
          + 追加
        </Button>
        <Button variant="contained" color="error" size="small" onClick={handleDelete} disabled={!selectedKeys.size}
          sx={{ background: selectedKeys.size ? 'linear-gradient(135deg,#f43f5e,#ec4899)' : undefined,
            px: 2.5, '&:hover': { transform: 'translateY(-2px)' } }}>
          ✕ 削除
        </Button>
        {selectedKeys.size > 0 && (
          <Typography sx={{ fontSize: '0.8rem', color: '#f43f5e', fontWeight: 700 }}>
            {selectedKeys.size} 件選択中
          </Typography>
        )}
        {isChanged && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1.5, py: 0.5, borderRadius: 20, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <Typography sx={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 700 }}>● 未保存の変更があります</Typography>
          </Box>
        )}
      </Stack>

      <Box sx={{ borderRadius: '16px', overflow: 'hidden', border: '1.5px solid rgba(99,102,241,0.1)', boxShadow: '0 2px 12px rgba(99,102,241,0.07)' }}>
        <TableContainer component={Paper} elevation={0} sx={{ maxHeight: 380, background: 'transparent' }}>
          <Table sx={{ minWidth: 700, '& .MuiTableCell-stickyHeader': { backgroundColor: '#fafbff', zIndex: 100 } }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={thSx}>
                  <Checkbox
                    indeterminate={selectedKeys.size > 0 && selectedKeys.size < systems.length}
                    checked={systems.length > 0 && selectedKeys.size === systems.length}
                    onChange={e => handleSelectAll(e.target.checked)}
                  />
                </TableCell>
                {['CD', 'システム名', '内容', '備考', '有効フラグ'].map(h => (
                  <TableCell key={h} align="center" sx={thSx}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {systems.map((row, i) => (
                <TableRow key={i} sx={{
                  backgroundColor: selectedKeys.has(row.cd) ? 'rgba(99,102,241,0.05) !important' : 'transparent',
                  '&:hover': { backgroundColor: 'rgba(99,102,241,0.03) !important' },
                  transition: 'background-color 0.15s ease',
                }}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={selectedKeys.has(row.cd)} onChange={e => handleSelect(row.cd, e.target.checked)} />
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined" size="small" fullWidth value={row.cd} sx={inputSx}
                      slotProps={{ input: { readOnly: true } }} />
                  </TableCell>
                  <TableCell>
                    <LocalTextField sx={inputSx} value={row.systemName}
                      error={!!errors[i]?.systemName} helperText={errors[i]?.systemName}
                      onChange={v => handleChange(i, 'systemName', v)} />
                  </TableCell>
                  <TableCell>
                    <LocalTextField sx={inputSx} value={row.note ?? ''}
                      error={!!errors[i]?.note} helperText={errors[i]?.note}
                      onChange={v => handleChange(i, 'note', v)} />
                  </TableCell>
                  <TableCell>
                    <LocalTextField sx={inputSx} value={row.biko ?? ''}
                      error={!!errors[i]?.biko} helperText={errors[i]?.biko}
                      onChange={v => handleChange(i, 'biko', v)} />
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

export default SystemMasterTab;
