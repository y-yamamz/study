import type { SxProps, Theme } from '@mui/material';

/** テーブルヘッダーセルの sx */
export const thSx: SxProps<Theme> = {
  //background: 'linear-gradient(135deg,rgba(139,92,246,0.07),rgba(99,102,241,0.05)) !important',
  background: '#f3f4ff',
  borderBottom: '2px solid rgba(139,92,246,0.18) !important',
  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em',
  textTransform: 'uppercase' as const, color: '#7c3aed', py: 1.5,
};

/** テキスト入力セルの sx */
export const inputSx: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    fontSize: '0.82rem', borderRadius: '10px', backgroundColor: '#faf5ff',
    '& fieldset': { borderColor: 'rgba(139,92,246,0.22)' },
    '&:hover fieldset': { borderColor: 'rgba(139,92,246,0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#8b5cf6', borderWidth: 2 },
  },
};

/** セレクトボックスの sx */
export const selSx: SxProps<Theme> = {
  fontSize: '0.82rem', borderRadius: '10px', backgroundColor: '#faf5ff',
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(139,92,246,0.22)' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(139,92,246,0.5)' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#8b5cf6', borderWidth: 2 },
};
