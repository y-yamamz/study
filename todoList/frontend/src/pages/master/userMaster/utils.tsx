import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

/** 既存ユーザーのパスワード未変更を示すセンチネル値（フロント内部のみ使用） */
export const EXISTING_PW = '__EXISTING__';

/** ロール選択肢 */
export const ROLE_OPTIONS = [
  { value: 'USER',  label: '一般ユーザー' },
  { value: 'ADMIN', label: '管理者' },
] as const;

/** ボタン・グラデーション用カラー */
export const COLORS = ['#8b5cf6', '#6366f1'] as const;

/**
 * パスワード専用ローカルTextField。
 * - EXISTING_PW センチネル値のときは空欄を表示し、未入力のまま blur しても親 state を変更しない。
 * - キー入力は local state のみ更新し、blur 時に親 state へ伝播することで再レンダリングを抑制する。
 */
export const PasswordTextField = ({ value, onChange, error, helperText, sx }: {
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  helperText?: string;
  sx?: object;
}) => {
  const [local, setLocal] = useState(value === EXISTING_PW ? '' : value);

  useEffect(() => { setLocal(value === EXISTING_PW ? '' : value); }, [value]);

  return (
    <TextField
      variant="outlined" size="small" fullWidth type="password"
      placeholder="パスワードを入力"
      sx={sx} value={local}
      error={error} helperText={helperText}
      onChange={e => setLocal(e.target.value)}
      onBlur={() => {
        if (local === '' && value === EXISTING_PW) return;
        onChange(local);
      }}
    />
  );
};
