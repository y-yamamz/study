import type { Dispatch, SetStateAction } from "react";
import { apiFetch } from './apiClient';

/** システムマスタインターフェース */
export interface MstSystem {
  cd: string;
  systemName: string;
  note: string;
  biko: string;
  yukoFlag: string;
}

/** プロジェクトマスタインターフェース */
export interface MstProject {
  systemCd: string;
  cd: string;
  projectName: string;
  note: string;
  biko: string;
  yukoFlag: string;
}

/** コードマスタインターフェース */
export interface MstCode {
  grCd: string;
  cd: string;
  cdName: string;
  color: string;
  note: string;
  biko: string;
  yukoFlag: string;
}

/** コードグループマスタインターフェース */
export interface MstGroupCode {
  cd: string;
  cdName: string;
  note: string;
  biko: string;
  yukoFlag: string;
}

/** ユーザーマスタインターフェース */
export interface MstUser {
  userId: string;
  userName: string;
  /** フロントエンドへの返却時は空文字（マスク済み）。入力用は plainPassword を使う */
  passwordHash: string;
  /** 入力用平文パスワード。空文字の場合はパスワード変更なし */
  plainPassword: string;
  roleCd: string;
  email: string;
  yukoFlag: string;
}

/** エラー状態の型 */
export type RowErrors = { [idx: number]: { [field: string]: string } };

/**
 * システムマスタの全件リストを取得する
 * @returns システムマスタリスト
 */
export const getSystemList = async (): Promise<MstSystem[]> => {
  const res = await apiFetch("api/getMstSystemList", {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("fetch failed");
  }

  return await res.json();
};

/**
 * システムマスタを登録・更新する
 * @param list システムマスタリスト
 * @returns 処理結果
 */
export const saveSystemList = async (list: MstSystem[]) => {
  const res = await apiFetch("api/saveMstSystem", {
    method: "POST",
    body: JSON.stringify(list),
  });

  if (!res.ok) {
    throw new Error("fetch failed");
  }

  return await res.json();
};

/**
 * システムマスタを削除する
 * @param list 削除対象リスト
 * @returns 処理結果
 */
export const deleteSystemList = async (list: MstSystem[]) => {
  const res = await apiFetch("api/deleteMstSystem", {
    method: "POST",
    body: JSON.stringify(list),
  });
  if (!res.ok) throw new Error("fetch failed");
  return await res.json();
};

/**
 * プロジェクトマスタの全件リストを取得する
 * @returns プロジェクトマスタリスト
 */
export const getProjectList = async (): Promise<MstProject[]> => {
  const res = await apiFetch("api/getMstProjectList", {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("fetch failed");
  }

  return await res.json();
};

/**
 * プロジェクトマスタを登録・更新する
 * @param list プロジェクトマスタリスト
 * @returns 処理結果
 */
export const saveProjectList = async (list: MstProject[]) => {
  const res = await apiFetch("api/saveMstProject", {
    method: "POST",
    body: JSON.stringify(list),
  });

  if (!res.ok) {
    throw new Error("fetch failed");
  }

  return await res.json();
};

/**
 * プロジェクトマスタを削除する
 * @param list 削除対象リスト
 * @returns 処理結果
 */
export const deleteProjectList = async (list: MstProject[]) => {
  const res = await apiFetch("api/deleteMstProject", {
    method: "POST",
    body: JSON.stringify(list),
  });
  if (!res.ok) throw new Error("fetch failed");
  return await res.json();
};

/**
 * コードマスタの全件リストを取得する
 * @returns コードマスタリスト
 */
export const getCodeList = async (): Promise<MstCode[]> => {
  const res = await apiFetch("api/getMstCodeList", {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("fetch failed");
  }

  return await res.json();
};

/**
 * コードマスタを登録・更新する
 * @param list コードマスタリスト
 * @returns 処理結果
 */
export const saveCodeList = async (list: MstCode[]) => {
  const res = await apiFetch("api/saveMstCode", {
    method: "POST",
    body: JSON.stringify(list),
  });

  if (!res.ok) {
    throw new Error("fetch failed");
  }

  return await res.json();
};

/**
 * コードマスタを削除する
 * @param list 削除対象リスト
 * @returns 処理結果
 */
export const deleteCodeList = async (list: MstCode[]) => {
  const res = await apiFetch("api/deleteMstCode", {
    method: "POST",
    body: JSON.stringify(list),
  });
  if (!res.ok) throw new Error("fetch failed");
  return await res.json();
};

/**
 * コードグループマスタの全件リストを取得する
 * @returns コードグループマスタリスト
 */
export const getGroupCodeList = async (): Promise<MstGroupCode[]> => {
  const res = await apiFetch("api/getMstGroupCodeList", {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("fetch failed");
  }

  return await res.json();
};

/**
 * コードグループマスタを登録・更新する
 * @param list コードグループマスタリスト
 * @returns 処理結果
 */
export const saveGroupCodeList = async (list: MstGroupCode[]) => {
  const res = await apiFetch("api/saveMstGroupCode", {
    method: "POST",
    body: JSON.stringify(list),
  });

  if (!res.ok) {
    throw new Error("fetch failed");
  }

  return await res.json();
};

/**
 * コードグループマスタを削除する
 * @param list 削除対象リスト
 * @returns 処理結果
 */
export const deleteGroupCodeList = async (list: MstGroupCode[]) => {
  const res = await apiFetch("api/deleteMstGroupCode", {
    method: "POST",
    body: JSON.stringify(list),
  });
  if (!res.ok) throw new Error("fetch failed");
  return await res.json();
};

/**
 * ユーザーマスタの全件リストを取得する
 * @returns ユーザーマスタリスト（パスワードハッシュはマスク済み）
 */
export const getUserList = async (): Promise<MstUser[]> => {
  const res = await apiFetch("api/getMstUserList", {
    method: "POST",
  });
  if (!res.ok) throw new Error("fetch failed");
  return await res.json();
};

/**
 * ユーザーマスタを登録・更新する
 * @param list ユーザーマスタリスト
 * @returns 処理結果
 */
export const saveUserList = async (list: MstUser[]) => {
  const res = await apiFetch("api/saveMstUser", {
    method: "POST",
    body: JSON.stringify(list),
  });
  if (!res.ok) throw new Error("fetch failed");
  return await res.json();
};

/**
 * ユーザーマスタを削除する
 * @param list 削除対象リスト
 * @returns 処理結果
 */
export const deleteUserList = async (list: MstUser[]) => {
  const res = await apiFetch("api/deleteMstUser", {
    method: "POST",
    body: JSON.stringify(list),
  });
  if (!res.ok) throw new Error("fetch failed");
  return await res.json();
};

/**
 * 行エラー状態を更新するヘルパー関数
 * @param setErrors エラー状態セッター
 * @param index 行インデックス
 * @param field フィールド名
 * @param errMsg エラーメッセージ（空文字でエラー解除）
 */
export const updateRowError = (
  setErrors: Dispatch<SetStateAction<RowErrors>>,
  index: number,
  field: string,
  errMsg: string
) => {
  setErrors(prev => {
    const rowErrs = { ...(prev[index] || {}) };
    if (errMsg) {
      rowErrs[field] = errMsg;
    } else {
      delete rowErrs[field];
    }
    if (Object.keys(rowErrs).length === 0) {
      const next = { ...prev };
      delete next[index];
      return next;
    }
    return { ...prev, [index]: rowErrs };
  });
};
