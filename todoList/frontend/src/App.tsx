import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { ThemeProvider, createTheme, CssBaseline, alpha } from '@mui/material';
import { Layout } from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import MasterPage from "./pages/MasterPage";
import SideMenuPage from "./pages/SideMenuPage";
import TaskListPage from "./pages/TaskListPage";

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: '#6366f1', light: '#818cf8', dark: '#4f46e5', contrastText: '#fff' },
    secondary:  { main: '#f43f5e', light: '#fb7185', dark: '#e11d48', contrastText: '#fff' },
    background: { default: '#f5f3ff', paper: '#ffffff' },
    text:       { primary: '#1e1b4b', secondary: '#4b5563' },
    divider:    'rgba(99,102,241,0.12)',
    error:      { main: '#f43f5e' },
    success:    { main: '#10b981' },
    warning:    { main: '#f59e0b' },
    info:       { main: '#06b6d4' },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 14 },
  shadows: [
    'none',
    '0 1px 3px rgba(99,102,241,0.08)',
    '0 2px 8px rgba(99,102,241,0.12)',
    '0 4px 16px rgba(99,102,241,0.15)',
    '0 6px 20px rgba(99,102,241,0.16)',
    '0 8px 28px rgba(99,102,241,0.18)',
    '0 10px 36px rgba(99,102,241,0.2)',
    '0 12px 40px rgba(99,102,241,0.22)',
    '0 14px 44px rgba(99,102,241,0.22)',
    '0 16px 48px rgba(99,102,241,0.24)',
    '0 18px 52px rgba(99,102,241,0.24)',
    '0 20px 56px rgba(99,102,241,0.26)',
    '0 22px 60px rgba(99,102,241,0.26)',
    '0 24px 64px rgba(99,102,241,0.28)',
    '0 26px 68px rgba(99,102,241,0.28)',
    '0 28px 72px rgba(99,102,241,0.3)',
    '0 30px 76px rgba(99,102,241,0.3)',
    '0 32px 80px rgba(99,102,241,0.32)',
    '0 34px 84px rgba(99,102,241,0.32)',
    '0 36px 88px rgba(99,102,241,0.34)',
    '0 38px 92px rgba(99,102,241,0.34)',
    '0 40px 96px rgba(99,102,241,0.36)',
    '0 42px 100px rgba(99,102,241,0.36)',
    '0 44px 104px rgba(99,102,241,0.38)',
    '0 46px 108px rgba(99,102,241,0.38)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: '#f5f3ff', scrollbarWidth: 'thin' },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#ffffff',
          border: '1px solid rgba(99,102,241,0.1)',
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
          letterSpacing: '0.01em',
          transition: 'all 0.22s cubic-bezier(0.34,1.56,0.64,1)',
          '&:active': { transform: 'scale(0.96)' },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          boxShadow: '0 4px 18px rgba(99,102,241,0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            boxShadow: '0 6px 28px rgba(99,102,241,0.55)',
            transform: 'translateY(-2px) scale(1.01)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #f43f5e, #ec4899)',
          boxShadow: '0 4px 18px rgba(244,63,94,0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #e11d48, #db2777)',
            boxShadow: '0 6px 28px rgba(244,63,94,0.55)',
            transform: 'translateY(-2px) scale(1.01)',
          },
        },
        containedError: {
          background: 'linear-gradient(135deg, #f43f5e, #fb7185)',
          boxShadow: '0 4px 18px rgba(244,63,94,0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #e11d48, #f43f5e)',
            transform: 'translateY(-2px)',
          },
        },
        containedSuccess: {
          background: 'linear-gradient(135deg, #10b981, #06b6d4)',
          boxShadow: '0 4px 18px rgba(16,185,129,0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #059669, #0891b2)',
            transform: 'translateY(-2px)',
          },
        },
        outlinedPrimary: {
          borderColor: alpha('#6366f1', 0.35),
          color: '#6366f1',
          '&:hover': {
            borderColor: '#6366f1',
            backgroundColor: alpha('#6366f1', 0.06),
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: '#fafbff',
            transition: 'all 0.2s ease',
            '& fieldset': { borderColor: 'rgba(99,102,241,0.2)', transition: 'all 0.2s ease' },
            '&:hover fieldset': { borderColor: 'rgba(99,102,241,0.5)' },
            '&.Mui-focused': {
              backgroundColor: '#fff',
              '& fieldset': {
                borderColor: '#6366f1',
                borderWidth: 2,
                boxShadow: '0 0 0 4px rgba(99,102,241,0.1)',
              },
            },
          },
          '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#fafbff',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(99,102,241,0.2)' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(99,102,241,0.5)' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1', borderWidth: 2 },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          mx: 0.5,
          '&:hover': { backgroundColor: alpha('#6366f1', 0.07) },
          '&.Mui-selected': {
            backgroundColor: alpha('#6366f1', 0.1),
            fontWeight: 600,
            '&:hover': { backgroundColor: alpha('#6366f1', 0.14) },
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          background: 'linear-gradient(90deg, #6366f1, #ec4899)',
          height: 3,
          borderRadius: 2,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          letterSpacing: '0.01em',
          transition: 'all 0.2s ease',
          '&.Mui-selected': { color: '#6366f1' },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.08) 100%) !important',
            borderBottom: '2px solid rgba(99,102,241,0.2) !important',
            fontWeight: 700,
            letterSpacing: '0.05em',
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            color: '#4f46e5',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.15s ease',
          '&:hover': { backgroundColor: 'rgba(99,102,241,0.04) !important' },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(99,102,241,0.08)',
          padding: '8px 12px',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'rgba(99,102,241,0.35)',
          '&.Mui-checked': { color: '#6366f1' },
          '&.MuiCheckbox-indeterminate': { color: '#8b5cf6' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: 8 },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Layout" element={<Layout />}>
            <Route path="SideMenuPage" element={<SideMenuPage />} />
            <Route path="MasterPage"   element={<MasterPage />} />
            <Route path="TaskListPage" element={<TaskListPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
