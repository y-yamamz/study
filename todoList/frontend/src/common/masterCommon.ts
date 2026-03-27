import type { Dispatch, SetStateAction } from "react";
import { SERVICE_URL } from '../constants/const';

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

/** エラー状態の型 */
export type RowErrors = { [idx: number]: { [field: string]: string } };

/**
 * システムマスタの全件リストを取得する
 * @returns システムマスタリスト
 */
export const getSystemList = async (): Promise<MstSystem[]> => {
  const res = await fetch(SERVICE_URL.BASE_URL + "api/getMstSystemList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  const res = await fetch(SERVICE_URL.BASE_URL + "api/saveMstSystem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  const res = await fetch(SERVICE_URL.BASE_URL + "api/deleteMstSystem", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
  const res = await fetch(SERVICE_URL.BASE_URL + "api/getMstProjectList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  const res = await fetch(SERVICE_URL.BASE_URL + "api/saveMstProject", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  const res = await fetch(SERVICE_URL.BASE_URL + "api/deleteMstProject", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
  const res = await fetch(SERVICE_URL.BASE_URL + "api/getMstCodeList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  const res = await fetch(SERVICE_URL.BASE_URL + "api/saveMstCode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  const res = await fetch(SERVICE_URL.BASE_URL + "api/deleteMstCode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
  const res = await fetch(SERVICE_URL.BASE_URL + "api/getMstGroupCodeList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  const res = await fetch(SERVICE_URL.BASE_URL + "api/saveMstGroupCode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  const res = await fetch(SERVICE_URL.BASE_URL + "api/deleteMstGroupCode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
