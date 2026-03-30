import { SERVICE_URL } from '../constants/const';
import { getAccessToken, clearTokens } from './auth';

/**
 * 認証トークンを付与してAPIを呼び出す共通フェッチ関数
 */
export const apiFetch = async (path: string, options: RequestInit = {}): Promise<Response> => {
  const token = getAccessToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(SERVICE_URL.BASE_URL + path, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    clearTokens();
    window.location.href = '/';
  }

  return res;
};
