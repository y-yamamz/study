import type { SxProps, Theme } from '@mui/material';

export const thSx: SxProps<Theme> = {
  background: 'linear-gradient(135deg,rgba(16,185,129,0.07),rgba(6,182,212,0.05)) !important',
  borderBottom: '2px solid rgba(16,185,129,0.18) !important',
  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em',
  textTransform: 'uppercase' as const, color: '#059669', py: 1.5,
  background: '#f3f4ff',
};

export const inputSx: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    fontSize: '0.82rem', borderRadius: '10px', backgroundColor: '#f0fdf4',
    '& fieldset': { borderColor: 'rgba(16,185,129,0.22)' },
    '&:hover fieldset': { borderColor: 'rgba(16,185,129,0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#10b981', borderWidth: 2 },
  },
};

export const selSx: SxProps<Theme> = {
  fontSize: '0.82rem', borderRadius: '10px', backgroundColor: '#f0fdf4',
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(16,185,129,0.22)' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(16,185,129,0.5)' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#10b981', borderWidth: 2 },
};
