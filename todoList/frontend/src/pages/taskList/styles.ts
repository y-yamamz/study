import type { SxProps, Theme } from '@mui/material';

/** テキスト入力セル共通スタイル */
export const inputCellSx: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    fontSize: '0.82rem',
    borderRadius: '10px',
    backgroundColor: '#fafbff',
    '& fieldset':             { borderColor: 'rgba(99,102,241,0.18)' },
    '&:hover fieldset':       { borderColor: 'rgba(99,102,241,0.45)' },
    '&.Mui-focused fieldset': { borderColor: '#6366f1', borderWidth: 2 },
  },
};

/** セレクトボックスセル共通スタイル */
export const selectCellSx: SxProps<Theme> = {
  fontSize: '0.82rem',
  borderRadius: '10px',
  backgroundColor: '#fafbff',
  '& .MuiOutlinedInput-notchedOutline':       { borderColor: 'rgba(99,102,241,0.18)' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(99,102,241,0.45)' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1', borderWidth: 2 },
};

/** テーブルヘッダーセル共通スタイル */
export const tableHeadCellSx: SxProps<Theme> = {
  background: 'linear-gradient(135deg,rgba(99,102,241,0.07),rgba(139,92,246,0.05)) !important',
  borderBottom: '2px solid rgba(99,102,241,0.15) !important',
  fontSize: '0.72rem',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  color: '#4f46e5',
  py: 1.5,
  whiteSpace: 'nowrap',
};
