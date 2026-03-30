import { Box, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { clearTokens, getLoginUserName } from "../common/auth";

const Header = () => {
  const userName = getLoginUserName();
  const initial  = userName ? userName.charAt(0).toUpperCase() : '?';
  const navigate = useNavigate();

  const handleLogout = () => {
    clearTokens();
    navigate('/');
  };

  return (
    <Box
      component="header"
      sx={{
        height: 62,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        background: '#ffffff',
        borderBottom: '1px solid rgba(99,102,241,0.1)',
        position: 'relative',
        zIndex: 100,
        flexShrink: 0,
        boxShadow: '0 1px 12px rgba(99,102,241,0.08)',
      }}
    >
      {/* Gradient bottom line */}
      <Box sx={{
        position:'absolute', bottom:0, left:0, right:0, height:2,
        background:'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b, #10b981, #06b6d4)',
        backgroundSize:'300% 100%',
        animation:'gradient-shift 5s ease infinite',
      }} />

      {/* Left: Logo */}
      <Box sx={{ display:'flex', alignItems:'center', gap:1.5 }}>
        <Box sx={{
          width:36, height:36, borderRadius:'11px',
          background:'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'16px', boxShadow:'0 4px 14px rgba(99,102,241,0.38)',
          flexShrink:0, color:'#fff', fontWeight:800,
        }}>✦</Box>
        <Box>
          <Typography sx={{
            fontWeight:800, fontSize:'1rem', letterSpacing:'-0.02em',
            background:'linear-gradient(135deg, #4f46e5, #8b5cf6, #ec4899)',
            backgroundClip:'text', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            backgroundSize:'200% auto', animation:'shimmer-bright 4s linear infinite',
            lineHeight:1.1,
          }}>
            TODO Manager
          </Typography>
          <Typography sx={{ fontSize:'0.64rem', color:'#9ca3af', lineHeight:1 }}>
            Workspace
          </Typography>
        </Box>
      </Box>

      {/* Right: User info + Logout */}
      {userName && (
        <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
          <Box sx={{
            display:'flex', alignItems:'center', gap:1.5,
            px:1.5, py:0.8, borderRadius:12,
          }}>
            <Box sx={{ display:{ xs:'none', sm:'block' }, textAlign:'right' }}>
              <Typography sx={{ fontSize:'0.82rem', fontWeight:700, color:'#1e1b4b', lineHeight:1 }}>
                {userName}
              </Typography>
              <Typography sx={{ fontSize:'0.68rem', color:'#10b981', lineHeight:1, mt:0.3 }}>
                ● オンライン
              </Typography>
            </Box>
            <Box sx={{ position:'relative' }}>
              <Box sx={{
                width:36, height:36, borderRadius:'50%',
                background:'linear-gradient(135deg, #6366f1, #ec4899)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#fff', fontWeight:800, fontSize:'0.9rem',
                boxShadow:'0 3px 12px rgba(99,102,241,0.35)',
              }}>
                {initial}
              </Box>
              {/* Online dot */}
              <Box sx={{
                position:'absolute', bottom:1, right:1,
                width:9, height:9, borderRadius:'50%',
                background:'#10b981',
                border:'2px solid #fff',
                boxShadow:'0 0 6px rgba(16,185,129,0.6)',
              }} />
            </Box>
          </Box>

          {/* Logout button */}
          <Tooltip title="ログアウト" placement="bottom">
            <Box onClick={handleLogout} sx={{
              width:36, height:36, borderRadius:'10px',
              display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer', color:'#9ca3af',
              transition:'all 0.2s ease',
              '&:hover':{ background:'rgba(244,63,94,0.08)', color:'#f43f5e' },
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </Box>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default Header;
