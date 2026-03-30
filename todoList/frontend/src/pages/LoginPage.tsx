import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SERVICE_URL } from "../constants/const";
import { saveLoginInfo } from "../common/auth";

/* Floating confetti shape */
const Confetti = ({ x, y, color, size, delay, shape }: {
  x: number; y: number; color: string; size: number; delay: number; shape: string;
}) => (
  <Box sx={{
    position: 'absolute', left: `${x}%`, top: `${y}%`,
    width: size, height: size,
    background: color,
    borderRadius: shape === 'circle' ? '50%' : shape === 'square' ? '3px' : '50% 0',
    opacity: 0.7,
    animation: `confetti-fall ${6 + delay}s ${delay}s ease-in infinite`,
    transform: `rotate(${Math.random() * 360}deg)`,
  }} />
);

const CONFETTI_DATA = [
  { x: 5,  y:-5, color:'#6366f1', size:10, delay:0,   shape:'circle' },
  { x: 15, y:-8, color:'#f43f5e', size: 7, delay:0.8, shape:'square' },
  { x: 25, y:-3, color:'#f59e0b', size:12, delay:1.5, shape:'triangle' },
  { x: 35, y:-7, color:'#10b981', size: 8, delay:0.3, shape:'circle' },
  { x: 50, y:-5, color:'#8b5cf6', size:11, delay:2.1, shape:'square' },
  { x: 62, y:-9, color:'#ec4899', size: 7, delay:1.0, shape:'circle' },
  { x: 72, y:-4, color:'#06b6d4', size: 9, delay:2.5, shape:'square' },
  { x: 82, y:-6, color:'#f43f5e', size: 8, delay:0.6, shape:'circle' },
  { x: 92, y:-7, color:'#6366f1', size:12, delay:1.8, shape:'triangle' },
  { x: 10, y:10, color:'#f59e0b', size: 6, delay:3.2, shape:'circle' },
  { x: 45, y:15, color:'#10b981', size:10, delay:4.0, shape:'square' },
  { x: 78, y: 8, color:'#8b5cf6', size: 7, delay:2.8, shape:'circle' },
];

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const onClickLogin = async () => {
    setErrorMsg("");
    setLoading(true);
    try {
      const res = await fetch(SERVICE_URL.BASE_URL + "api/userLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "ユーザーIDまたはパスワードが正しくありません");
      }
      saveLoginInfo(await res.json());
      navigate("Layout");
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : "ログインに失敗しました");
    } finally { setLoading(false); }
  };

  return (
    <Box sx={{ position:'fixed', inset:0, display:'flex', overflow:'hidden' }}>
      {/* === Left Panel – Illustration side === */}
      <Box sx={{
        display: { xs:'none', md:'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '0%',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #f0eeff 0%, #e0e7ff 50%, #fce7f3 100%)',
      }}>

        {/* Decorative circles */}
        {[
          { s:60, t:'8%', l:'75%', c:'rgba(245,158,11,0.3)' },
          { s:40, t:'70%', l:'5%', c:'rgba(6,182,212,0.3)' },
          { s:30, t:'85%', l:'70%', c:'rgba(139,92,246,0.3)' },
        ].map((c,i) => (
          <Box key={i} sx={{
            position:'absolute', width:c.s, height:c.s, borderRadius:'50%',
            background:c.c, top:c.t, left:c.l,
            animation:`twinkle ${2+i}s ease-in-out infinite`,
          }} />
        ))}
      </Box>

      {/* === Right Panel – Login Form === */}
      <Box sx={{
        flex:1,
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        background:'#ffffff',
        position:'relative', overflow:'hidden', px: { xs:3, sm:6, md:8 },
      }}>
        {/* Falling confetti */}
        {CONFETTI_DATA.map((c,i) => <Confetti key={i} {...c} />)}

        {/* Subtle top-right blob */}
        <Box sx={{
          position:'absolute', width:250, height:250,
          borderRadius:'50%', top:'-80px', right:'-60px',
          background:'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.1))',
          filter:'blur(40px)', pointerEvents:'none',
        }} />
        <Box sx={{
          position:'absolute', width:200, height:200,
          borderRadius:'50%', bottom:'-60px', left:'-40px',
          background:'linear-gradient(135deg, rgba(244,63,94,0.1), rgba(236,72,153,0.08))',
          filter:'blur(40px)', pointerEvents:'none',
        }} />

        {/* Form card */}
        <Box sx={{
          width:'100%', maxWidth:400, position:'relative', zIndex:1,
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.96)',
          transition:'all 0.55s cubic-bezier(0.34,1.3,0.64,1)',
        }}>
          {/* Logo + greeting */}
          <Box sx={{ mb:4, textAlign:'center' }}>
            <Box sx={{
              width:64, height:64, borderRadius:'20px', mx:'auto', mb:2,
              background:'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'28px', boxShadow:'0 8px 28px rgba(99,102,241,0.4)',
              animation:'bounce-in 0.8s cubic-bezier(0.34,1.56,0.64,1)',
            }}>✦</Box>

          <Typography sx={{
            fontWeight: 800, fontSize:'2.2rem', lineHeight:1.2,
            background: 'linear-gradient(135deg, #4f46e5, #8b5cf6, #ec4899)',
            backgroundClip:'text', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            backgroundSize:'200% auto', animation:'shimmer-bright 4s linear infinite',
            mb: 2,
          }}>
            TODO Manager
          </Typography>

            <Typography sx={{
              fontWeight:800, fontSize:'1.75rem', letterSpacing:'-0.03em', color:'#1e1b4b',
            }}>
              おかえりなさい
              <Box component="span" sx={{ ml:1 }}>👋</Box>
            </Typography>
            <Typography sx={{ color:'#9ca3af', fontSize:'0.9rem', mt:0.5 }}>
              サインインして続けましょう
            </Typography>
          </Box>

          {/* Social-style login divider hint */}
          <Box sx={{
            p:'18px 22px', borderRadius:14,
            background:'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.04))',
            border:'1.5px solid rgba(99,102,241,0.15)', mb:3,
            display:'flex', alignItems:'center', gap:1.5,
          }}>
            <Box sx={{
              width:36, height:36, borderRadius:10,
              background:'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'16px', flexShrink:0, boxShadow:'0 4px 12px rgba(99,102,241,0.3)',
            }}>🔐</Box>
            <Box>
              <Typography sx={{ fontSize:'0.78rem', fontWeight:700, color:'#4f46e5' }}>セキュア認証</Typography>
              <Typography sx={{ fontSize:'0.7rem', color:'#9ca3af', lineHeight:1.2 }}>
                すべての通信は暗号化されています
              </Typography>
            </Box>
          </Box>

          {/* Fields */}
          <Box>
            <TextField
              fullWidth label="ユーザーID" placeholder="your-user-id"
              margin="normal" value={userId} autoComplete="username"
              onChange={(e) => setUserId(e.target.value)}
              onKeyDown={(e) => e.key==='Enter' && onClickLogin()}
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr:1, fontSize:'18px', color:'#818cf8' }}>◎</Box>
                ),
              }}
            />
            <TextField
              fullWidth label="パスワード" type="password" placeholder="••••••••"
              margin="normal" value={password} autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key==='Enter' && onClickLogin()}
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr:1, fontSize:'18px', color:'#818cf8' }}>🔑</Box>
                ),
              }}
            />

            {/* Error */}
            {errorMsg && (
              <Box sx={{
                mt:1.5, px:2, py:1.5, borderRadius:12,
                background:'linear-gradient(135deg, rgba(244,63,94,0.08), rgba(251,113,133,0.06))',
                border:'1.5px solid rgba(244,63,94,0.2)',
                display:'flex', alignItems:'center', gap:1,
                animation:'pop-in 0.3s ease',
              }}>
                <Typography sx={{ fontSize:'16px' }}>⚠️</Typography>
                <Typography color="error" sx={{ fontSize:'0.82rem', fontWeight:500 }}>
                  {errorMsg}
                </Typography>
              </Box>
            )}

            {/* Submit */}
            <Button fullWidth variant="contained" size="large" onClick={onClickLogin}
              disabled={loading}
              sx={{
                mt:3, py:1.6, borderRadius:14, fontSize:'1rem', fontWeight:700,
                background: loading
                  ? 'rgba(99,102,241,0.3)'
                  : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                backgroundSize:'200% auto',
                boxShadow: loading ? 'none' : '0 6px 28px rgba(99,102,241,0.45)',
                transition:'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                '&:hover': {
                  backgroundPosition:'right center',
                  boxShadow:'0 10px 40px rgba(99,102,241,0.6)',
                  transform:'translateY(-3px) scale(1.01)',
                },
                '&.Mui-disabled': { color:'rgba(255,255,255,0.5)', background:'rgba(99,102,241,0.2)' },
              }}
            >
              {loading ? (
                <Box sx={{ display:'flex', alignItems:'center', gap:1.5 }}>
                  <CircularProgress size={18} sx={{ color:'rgba(255,255,255,0.8)' }} />
                  サインイン中...
                </Box>
              ) : '✦ サインイン'}
            </Button>
          </Box>

          {/* Footer */}
          <Typography sx={{
            textAlign:'center', mt:3,
            color:'#d1d5db', fontSize:'0.72rem',
          }}>
            © 2025 TODO Manager · Secure & Encrypted
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
