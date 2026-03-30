import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Header from "../components/Header";
import styles from './Layout.module.css';
import { apiFetch } from "../common/apiClient";

interface MenuListDto { id: string; name: string; url: string; }

const ICON_MAP: Record<string, string> = {
  SideMenuPage: '◈',
  MasterPage:   '⊞',
  TaskListPage: '☰',
};
const COLOR_MAP: Record<string, string[]> = {
  SideMenuPage: ['#06b6d4', '#6366f1'],
  MasterPage:   ['#f59e0b', '#f43f5e'],
  TaskListPage: ['#10b981', '#06b6d4'],
};

const getMenuList = async (): Promise<MenuListDto[]> => {
  const res = await apiFetch("api/menuList", {
    method: "POST",
    body: JSON.stringify({ id: "", name: "", url: "" }),
  });
  if (!res.ok) throw new Error("fetch failed");
  return await res.json();
};

export const Layout = () => {
  const [menus, setMenus] = useState<MenuListDto[]>([]);
  const location = useLocation();

  useEffect(() => {
    getMenuList().then(setMenus).catch(() => {});
  }, []);

  const getKey = (url: string) =>
    Object.keys(ICON_MAP).find(k => url.includes(k)) ?? '';

  return (
    <div className={styles.appLayout}>
      <Header />
      <div className={styles.mainArea}>

        {/* ─── Sidebar ─── */}
        <nav className={styles.sidebar}>
          <div className={styles.sidebarSection}>メニュー</div>

          {menus.map(menu => {
            const key = getKey(menu.url);
            const isActive = location.pathname.includes(menu.url.replace('/Layout/', ''));
            const colors = COLOR_MAP[key] ?? ['#6366f1', '#8b5cf6'];

            return (
              <Link
                key={menu.id}
                to={menu.url}
                className={`${styles.menuLink} ${isActive ? styles.active : ''}`}
                style={isActive ? {
                  background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
                } : undefined}
              >
                {/* Icon badge */}
                <Box sx={{
                  width: 28, height: 28, borderRadius: '8px', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px',
                  background: isActive
                    ? 'rgba(255,255,255,0.22)'
                    : `linear-gradient(135deg, ${colors[0]}22, ${colors[1]}22)`,
                  color: isActive ? '#fff' : colors[0],
                  transition: 'all 0.2s ease',
                }}>
                  {ICON_MAP[key] ?? '◦'}
                </Box>
                <span className={styles.menuLabel}>{menu.name}</span>
                {isActive && (
                  <Box sx={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.8)',
                    flexShrink: 0,
                  }} />
                )}
              </Link>
            );
          })}

          {/* Sidebar footer decoration */}
          <Box className={styles.sidebarFooter}>
            <Box sx={{
              p: '10px 12px', borderRadius: 12,
              background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.06))',
              border: '1px solid rgba(99,102,241,0.12)',
            }}>
              <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#6366f1', lineHeight: 1 }}>
                ✦ TODO Manager
              </Typography>
              <Typography sx={{ fontSize: '0.65rem', color: '#9ca3af', mt: 0.4 }}>
                v1.0.0 · Workspace
              </Typography>
            </Box>
          </Box>
        </nav>

        {/* ─── Main Content ─── */}
        <main className={styles.contentArea}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
