import { useState } from "react";
import { Box, Tab, Tabs, Typography } from '@mui/material';
import SystemMasterTab    from './master/SystemMasterTab';
import ProjectMasterTab   from './master/ProjectMasterTab';
import CodeMasterTab      from './master/CodeMasterTab';
import GroupCodeMasterTab from './master/GroupCodeMasterTab';
import UserMasterTab      from './master/UserMasterTab';

const TABS = [
  { label: 'システム',         icon: '⚙', colors: ['#6366f1','#8b5cf6'] },
  { label: 'プロジェクト',     icon: '◈', colors: ['#f43f5e','#ec4899'] },
  { label: 'コード',           icon: '⌗', colors: ['#f59e0b','#f43f5e'] },
  { label: 'コードグループ',   icon: '⊞', colors: ['#10b981','#06b6d4'] },
  { label: 'ユーザー',         icon: '◎', colors: ['#8b5cf6','#6366f1'] },
];

const MasterPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box sx={{ width: '100%' }}>
      {/* ─── Page header ─── */}
      <Box sx={{
        mb: 3,
        p: '20px 24px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #eef2ff 0%, #fdf2f8 100%)',
        border: '1.5px solid rgba(99,102,241,0.12)',
        display: 'flex', alignItems: 'center', gap: 2,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <Box sx={{
          position:'absolute', right:-30, top:-30, width:120, height:120,
          borderRadius:'50%',
          background:'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.08))',
        }} />
        <Box sx={{
          width:48, height:48, borderRadius:14,
          background:'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'22px', boxShadow:'0 6px 20px rgba(99,102,241,0.35)',
          flexShrink: 0,
        }}>⊞</Box>
        <Box>
          <Typography sx={{
            fontWeight:800, fontSize:'1.25rem', letterSpacing:'-0.02em',
            background:'linear-gradient(135deg, #4f46e5, #8b5cf6)',
            backgroundClip:'text', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          }}>
            マスタ管理
          </Typography>
          <Typography sx={{ color:'#9ca3af', fontSize:'0.8rem', mt:0.3 }}>
            システムのマスタデータを管理します
          </Typography>
        </Box>
        {/* Stats pill */}
        <Box sx={{ ml:'auto', display:'flex', gap:1 }}>
          {['5 テーブル', 'CRUD 対応'].map((t,i) => (
            <Box key={i} sx={{
              px:1.5, py:0.6, borderRadius:20,
              background: i===0 ? 'rgba(99,102,241,0.1)' : 'rgba(16,185,129,0.1)',
              color: i===0 ? '#6366f1' : '#10b981',
              fontSize:'0.72rem', fontWeight:700,
              border:`1px solid ${i===0?'rgba(99,102,241,0.2)':'rgba(16,185,129,0.2)'}`,
              display: { xs:'none', sm:'flex' },
            }}>{t}</Box>
          ))}
        </Box>
      </Box>

      {/* ─── Card container ─── */}
      <Box sx={{
        borderRadius: '20px',
        background: '#ffffff',
        border: '1.5px solid rgba(99,102,241,0.1)',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(99,102,241,0.1)',
      }}>
        {/* Tabs */}
        <Box sx={{ borderBottom: '1px solid rgba(99,102,241,0.1)', background: '#fafbff', px: 2 }}>
          <Tabs
            value={tabIndex}
            onChange={(_, v) => setTabIndex(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: 56,
              '& .MuiTab-root': {
                minHeight: 56, py:0, px:2,
                fontSize:'0.83rem', fontWeight:600,
                color:'#9ca3af',
                '&.Mui-selected': { color:'#4f46e5' },
              },
              '& .MuiTabs-indicator': {
                background: `linear-gradient(90deg, ${TABS[tabIndex].colors[0]}, ${TABS[tabIndex].colors[1]})`,
                height: 3, borderRadius:'2px 2px 0 0',
              },
            }}
          >
            {TABS.map((tab, i) => (
              <Tab key={i} label={
                <Box sx={{ display:'flex', alignItems:'center', gap:0.8 }}>
                  <Box sx={{
                    width:24, height:24, borderRadius:7, flexShrink:0,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'12px',
                    background: tabIndex===i
                      ? `linear-gradient(135deg, ${tab.colors[0]}, ${tab.colors[1]})`
                      : 'rgba(99,102,241,0.08)',
                    color: tabIndex===i ? '#fff' : '#9ca3af',
                    transition:'all 0.2s ease',
                    boxShadow: tabIndex===i ? `0 2px 8px ${tab.colors[0]}44` : 'none',
                  }}>{tab.icon}</Box>
                  <span>{tab.label}</span>
                </Box>
              } />
            ))}
          </Tabs>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {tabIndex === 0 && <SystemMasterTab />}
          {tabIndex === 1 && <ProjectMasterTab />}
          {tabIndex === 2 && <CodeMasterTab />}
          {tabIndex === 3 && <GroupCodeMasterTab />}
          {tabIndex === 4 && <UserMasterTab />}
        </Box>
      </Box>
    </Box>
  );
};

export default MasterPage;
