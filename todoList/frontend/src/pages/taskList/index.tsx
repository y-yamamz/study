import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Box, Checkbox, Chip, MenuItem, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useTaskList } from './useTaskList';
import { toChipStyle, getRowKey } from './utils';
import { inputCellSx, selectCellSx, tableHeadCellSx } from './styles';
import LocalTextField from '../../common/LocalTextField';

const TaskListPage = () => {
  const {
    systemCodes, projectsCodes, statusCodes, deployCodes,
    tasks, taskIds, filteredTasks,
    selectedKeys,
    filterSystemCd,  setFilterSystemCd,
    filterProjectCd, setFilterProjectCd,
    filterStatusCd,  setFilterStatusCd,
    filterDeployCd,  setFilterDeployCd,
    taskErrors,
    handleRegister, handleAddRow, handleChange,
    handleSelectRow, handleSelectAll, handleApplyFilter, handleDelete,
  } = useTaskList();

  return (
    <Box sx={{ width: '100%' }}>
      {/* ─── ページヘッダー（タイトル・件数・操作ボタン） ─── */}
      <Box sx={{
        mb: 3, p: '20px 24px', borderRadius: '20px',
        background: 'linear-gradient(135deg, #ecfdf5 0%, #eff6ff 50%, #f5f3ff 100%)',
        border: '1.5px solid rgba(16,185,129,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 2, position: 'relative', overflow: 'hidden',
      }}>
        {/* 装飾用の背景円 */}
        <Box sx={{
          position: 'absolute', right: -20, top: -20, width: 100, height: 100, borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,182,212,0.08))',
        }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{
            width: 48, height: 48, borderRadius: 14,
            background: 'linear-gradient(135deg, #10b981, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px', boxShadow: '0 6px 20px rgba(16,185,129,0.35)',
          }}>☰</Box>
          <Box>
            <Typography sx={{
              fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #059669, #0891b2)',
              backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>タスクリスト</Typography>
            <Typography sx={{ color: '#9ca3af', fontSize: '0.8rem', mt: 0.2 }}>
              {filteredTasks.length} 件
              {selectedKeys.size > 0 && (
                <Box component="span" sx={{ ml: 1.5, color: '#6366f1', fontWeight: 700 }}>
                  · {selectedKeys.size} 件選択中
                </Box>
              )}
            </Typography>
          </Box>
        </Box>

        {/* 操作ボタン（登録・追加・削除） */}
        <Stack direction="row" spacing={1.5}>
          <Button variant="contained" size="small" onClick={handleRegister} sx={{
            background: 'linear-gradient(135deg, #10b981, #06b6d4)',
            boxShadow: '0 4px 16px rgba(16,185,129,0.38)', px: 2.5,
            '&:hover': { background: 'linear-gradient(135deg,#059669,#0891b2)', transform: 'translateY(-2px)' },
          }}>✓ 登録</Button>
          <Button variant="outlined" size="small" onClick={handleAddRow} sx={{
            borderColor: 'rgba(99,102,241,0.35)', color: '#6366f1', px: 2.5,
            '&:hover': { borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.07)', transform: 'translateY(-2px)' },
          }}>+ 追加</Button>
          <Button variant="contained" color="error" size="small" onClick={handleDelete}
            disabled={!selectedKeys.size} sx={{
              background: selectedKeys.size ? 'linear-gradient(135deg,#f43f5e,#ec4899)' : undefined,
              boxShadow:  selectedKeys.size ? '0 4px 16px rgba(244,63,94,0.35)' : undefined,
              px: 2.5, '&:hover': { transform: 'translateY(-2px)' },
            }}>✕ 削除</Button>
        </Stack>
      </Box>

      {/* ─── フィルタバー ─── */}
      <Box sx={{
        mb: 2.5, p: '12px 16px', borderRadius: '16px',
        background: '#ffffff', border: '1.5px solid rgba(99,102,241,0.1)',
        display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center',
        boxShadow: '0 2px 12px rgba(99,102,241,0.07)',
      }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 0.8,
          px: 1.5, py: 0.6, borderRadius: 20,
          background: 'rgba(99,102,241,0.08)', mr: 0.5,
        }}>
          <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#6366f1' }}>🔍 フィルタ</Typography>
        </Box>
        {/* システム・プロジェクト・進捗状態・デプロイ状態の各フィルタを動的に生成 */}
        {[
          { val: filterSystemCd,  set: setFilterSystemCd,  label: 'システム（全て）',      items: systemCodes.map(s => ({ v: s.cd, l: s.systemName })) },
          { val: filterProjectCd, set: setFilterProjectCd, label: 'プロジェクト（全て）', items: projectsCodes.map(p => ({ v: p.cd, l: p.projectName })) },
          { val: filterStatusCd,  set: setFilterStatusCd,  label: '進捗状態（全て）',     items: statusCodes.map(c => ({ v: c.cd, l: c.cdName })) },
          { val: filterDeployCd,  set: setFilterDeployCd,  label: 'デプロイ状態（全て）', items: deployCodes.map(c => ({ v: c.cd, l: c.cdName })) },
        ].map((f, i) => (
          <Select key={i} value={f.val} size="small" displayEmpty sx={{ minWidth: 155, ...selectCellSx }}
            onChange={e => f.set(e.target.value)}>
            <MenuItem value="">{f.label}</MenuItem>
            {f.items.map(it => <MenuItem key={it.v} value={it.v}>{it.l}</MenuItem>)}
          </Select>
        ))}
        <Button variant="contained" size="small" onClick={handleApplyFilter} sx={{
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          boxShadow: '0 3px 12px rgba(99,102,241,0.35)', px: 2,
          '&:hover': { transform: 'translateY(-1px)' },
        }}>絞込</Button>
      </Box>

      {/* ─── タスク一覧テーブル ─── */}
      <Box sx={{
        borderRadius: '20px', overflow: 'hidden',
        border: '1.5px solid rgba(99,102,241,0.1)',
        background: '#ffffff',
        boxShadow: '0 4px 24px rgba(99,102,241,0.1)',
      }}>
        <TableContainer component={Paper} elevation={0}
          sx={{ maxHeight: 'calc(100vh - 350px)', background: 'transparent', border: 'none' }}>
          <Table sx={{ minWidth: 1200, '& .MuiTableCell-stickyHeader': { backgroundColor: '#f4f4fe', zIndex: 100 } }} stickyHeader>
            <TableHead>
              <TableRow>
                {/* 全件選択チェックボックス（一部選択時はindeterminate表示） */}
                <TableCell padding="checkbox" sx={{
                  borderBottom: '2px solid #e8e8fd !important',
                }}>
                  <Checkbox
                    indeterminate={selectedKeys.size > 0 && selectedKeys.size < filteredTasks.length}
                    checked={filteredTasks.length > 0 && selectedKeys.size === filteredTasks.length}
                    onChange={e => handleSelectAll(e.target.checked, filteredTasks)}
                  />
                </TableCell>
                {['システム', 'プロジェクト', 'チケット番号', 'リビジョン番号', '進捗状態', 'デプロイ状態', '内容', '備考'].map(h => (
                  <TableCell key={h} align="center" sx={tableHeadCellSx}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map(row => {
                // tasks配列上の実インデックスを取得（フィルタ後のインデックスと異なるため）
                const index  = tasks.indexOf(row);
                // 行の安定したキー（チケット番号等の変更でアンマウントされないよう UUID を使用）
                const rowId  = taskIds[index];
                // 現在の進捗状態・デプロイ状態のマスタ情報を取得
                const sc     = statusCodes.find(s => s.cd === row.statusCd);
                const dc     = deployCodes.find(d => d.cd === row.deployCd);
                // Chip表示用のカラースタイルを生成
                const sStyle = toChipStyle(sc?.color ?? '');
                const dStyle = toChipStyle(dc?.color ?? '');
                const isSel  = selectedKeys.has(getRowKey(row));

                return (
                  <TableRow key={rowId} sx={{
                    backgroundColor: isSel ? '#f7f7fe !important' : (sc?.color ? sStyle.bg : 'transparent'),
                    outline: isSel ? '2px solid rgba(99,102,241,0.15)' : 'none',
                    outlineOffset: '-2px',
                    transition: 'all 0.15s ease',
                  }}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSel}
                        onChange={e => handleSelectRow(getRowKey(row), e.target.checked)} />
                    </TableCell>

                    {/* システム選択 */}
                    <TableCell sx={{ minWidth: 120 }}>
                      <Select value={row.systemCd} size="small" fullWidth sx={selectCellSx}
                        onChange={e => handleChange(index, "systemCd", e.target.value)}>
                        <MenuItem value="">選択</MenuItem>
                        {systemCodes.map(s => <MenuItem key={s.cd} value={s.cd}>{s.systemName}</MenuItem>)}
                      </Select>
                    </TableCell>

                    {/* プロジェクト選択（選択中のシステムCDに紐づくプロジェクトのみ表示） */}
                    <TableCell sx={{ minWidth: 140 }}>
                      <Select value={row.projectCd} size="small" fullWidth sx={selectCellSx}
                        onChange={e => handleChange(index, "projectCd", e.target.value)}>
                        <MenuItem value="">選択</MenuItem>
                        {projectsCodes.filter(p => p.systemCd === row.systemCd).map(p => <MenuItem key={p.cd} value={p.cd}>{p.projectName}</MenuItem>)}
                      </Select>
                    </TableCell>

                    {/* チケット番号 */}
                    <TableCell sx={{ minWidth: 100 }}>
                      <LocalTextField sx={inputCellSx}
                        value={row.ticketNo} error={!!taskErrors[index]?.ticketNo}
                        helperText={taskErrors[index]?.ticketNo}
                        onChange={v => handleChange(index, "ticketNo", v)} />
                    </TableCell>

                    {/* リビジョン番号 */}
                    <TableCell sx={{ minWidth: 100 }}>
                      <LocalTextField sx={inputCellSx}
                        value={row.revisionNo} error={!!taskErrors[index]?.revisionNo}
                        helperText={taskErrors[index]?.revisionNo} multiline={true} rows={5}
                        onChange={v => handleChange(index, "revisionNo", v)} />
                    </TableCell>

                    {/* 進捗状態（セレクト＋カラーChip） */}
                    <TableCell sx={{ minWidth: 120 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6, alignItems: 'stretch' }}>
                        <Select value={row.statusCd} size="small" fullWidth sx={selectCellSx}
                          onChange={e => handleChange(index, "statusCd", e.target.value)}>
                          <MenuItem value="">選択</MenuItem>
                          {statusCodes.map(c => <MenuItem key={c.cd} value={c.cd}>{c.cdName}</MenuItem>)}
                        </Select>
                        {/* カラーが設定されている場合のみChipを表示 */}
                        {sc?.color && (
                          <Chip label={sc.cdName} size="small" sx={{
                            height: 20, fontSize: '0.65rem', fontWeight: 700,
                            backgroundColor: sStyle.bg, color: sStyle.text,
                            border: `1.5px solid ${sStyle.border}`,
                            '& .MuiChip-label': { px: 1 },
                          }} />
                        )}
                      </Box>
                    </TableCell>

                    {/* デプロイ状態（セレクト＋カラーChip） */}
                    <TableCell sx={{ minWidth: 130, ...(dc?.color ? { backgroundColor: dStyle.bg } : {}) }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6, alignItems: 'stretch' }}>
                        <Select value={row.deployCd} size="small" fullWidth sx={selectCellSx}
                          onChange={e => handleChange(index, "deployCd", e.target.value)}>
                          <MenuItem value="">選択</MenuItem>
                          {deployCodes.map(c => <MenuItem key={c.cd} value={c.cd}>{c.cdName}</MenuItem>)}
                        </Select>
                        {/* カラーが設定されている場合のみChipを表示 */}
                        {dc?.color && (
                          <Chip label={dc.cdName} size="small" sx={{
                            height: 20, fontSize: '0.65rem', fontWeight: 700,
                            backgroundColor: dStyle.bg, color: dStyle.text,
                            border: `1.5px solid ${dStyle.border}`,
                            '& .MuiChip-label': { px: 1 },
                          }} />
                        )}
                      </Box>
                    </TableCell>

                    {/* 内容 */}
                    <TableCell sx={{ minWidth: 500 }}>
                      <LocalTextField sx={inputCellSx}
                        value={row.note} error={!!taskErrors[index]?.note} multiline rows={5}
                        helperText={taskErrors[index]?.note}
                        onChange={v => handleChange(index, "note", v)} />
                    </TableCell>

                    {/* 備考 */}
                    <TableCell sx={{ minWidth: 500 }}>
                      <LocalTextField sx={inputCellSx}
                        value={row.biko} error={!!taskErrors[index]?.biko} multiline rows={5}
                        helperText={taskErrors[index]?.biko}
                        onChange={v => handleChange(index, "biko", v)} />
                    </TableCell>
                  </TableRow>
                );
              })}

              {/* タスクが0件の場合の空状態表示 */}
              {filteredTasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 8 }}>
                    <Box sx={{ fontSize: '48px', mb: 2 }}>📋</Box>
                    <Typography sx={{ color: '#9ca3af', fontWeight: 600, fontSize: '0.95rem' }}>
                      タスクがありません
                    </Typography>
                    <Typography sx={{ color: '#d1d5db', fontSize: '0.8rem', mt: 0.5 }}>
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
