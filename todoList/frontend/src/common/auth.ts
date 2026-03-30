const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_ID_KEY = 'userId';
const USER_NAME_KEY = 'userName';
const ROLE_CD_KEY = 'roleCd';

export interface LoginInfo {
  accessToken: string;
  refreshToken: string;
  userId: string;
  userName: string;
  roleCd: string;
}

export const saveLoginInfo = (info: LoginInfo) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, info.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, info.refreshToken);
  localStorage.setItem(USER_ID_KEY, info.userId);
  localStorage.setItem(USER_NAME_KEY, info.userName);
  localStorage.setItem(ROLE_CD_KEY, info.roleCd);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getLoginUserId = (): string | null => {
  return localStorage.getItem(USER_ID_KEY);
};

export const getLoginUserName = (): string | null => {
  return localStorage.getItem(USER_NAME_KEY);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_NAME_KEY);
  localStorage.removeItem(ROLE_CD_KEY);
};

export const isLoggedIn = (): boolean => {
  return !!getAccessToken();
};
