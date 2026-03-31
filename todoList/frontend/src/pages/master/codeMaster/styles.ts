import type { SxProps, Theme } from '@mui/material';

export const thSx: SxProps<Theme> = {
  background: '#f3f4ff',
  borderBottom: '2px solid rgba(245,158,11,0.2) !important',
  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em',
  textTransform: 'uppercase' as const, color: '#d97706', py: 1.5,
};

export const inputSx: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    fontSize: '0.82rem', borderRadius: '10px', backgroundColor: '#fffbf5',
    '& fieldset': { borderColor: 'rgba(245,158,11,0.25)' },
    '&:hover fieldset': { borderColor: 'rgba(245,158,11,0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#f59e0b', borderWidth: 2 },
  },
};

export const selSx: SxProps<Theme> = {
  fontSize: '0.82rem', borderRadius: '10px', backgroundColor: '#fffbf5',
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(245,158,11,0.25)' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(245,158,11,0.5)' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f59e0b', borderWidth: 2 },
};
