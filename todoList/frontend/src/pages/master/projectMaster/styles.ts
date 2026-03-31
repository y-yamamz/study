import type { SxProps, Theme } from '@mui/material';

export const thSx: SxProps<Theme> = {
  background: 'linear-gradient(135deg,rgba(244,63,94,0.07),rgba(236,72,153,0.05)) !important',
  borderBottom: '2px solid rgba(244,63,94,0.15) !important',
  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em',
  textTransform: 'uppercase' as const, color: '#e11d48', py: 1.5,
  background: '#f3f4ff',
};

export const inputSx: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    fontSize: '0.82rem', borderRadius: '10px', backgroundColor: '#fafbff',
    '& fieldset': { borderColor: 'rgba(244,63,94,0.2)' },
    '&:hover fieldset': { borderColor: 'rgba(244,63,94,0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#f43f5e', borderWidth: 2 },
  },
};

export const selSx: SxProps<Theme> = {
  fontSize: '0.82rem', borderRadius: '10px', backgroundColor: '#fafbff',
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(244,63,94,0.2)' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(244,63,94,0.5)' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f43f5e', borderWidth: 2 },
};
