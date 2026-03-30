import { apiFetch } from '../../common/apiClient';
import type { TodoList, MstProject, MstCode } from './types';

/** タスク一覧を全件取得する */
export const getTaskList = async (): Promise<TodoList[]> => {
  const r = await apiFetch("api/todoList", { method: "POST" });
  if (!r.ok) throw new Error();
  return r.json();
};

/** プロジェクトマスタをコンボボックス用に取得する（システムCD:001 固定） */
export const getProjectList = async (): Promise<MstProject[]> => {
  const r = await apiFetch("api/getMstProjectCbbList", {
    method: "POST",
    body: JSON.stringify({ systemCd: "001", cd: "", projectName: "" }),
  });
  if (!r.ok) throw new Error();
  return r.json();
};

/** 進捗状態コードを取得する（コードグループ:001） */
export const getProgressStatus = async (): Promise<MstCode[]> => {
  const r = await apiFetch("api/getMstCodeCbbList", {
    method: "POST",
    body: JSON.stringify({ grCd: "001", cd: "", cdName: "", color: "" }),
  });
  if (!r.ok) throw new Error();
  return r.json();
};

/** デプロイ状態コードを取得する（コードグループ:002） */
export const getDeployStatus = async (): Promise<MstCode[]> => {
  const r = await apiFetch("api/getMstCodeCbbList", {
    method: "POST",
    body: JSON.stringify({ grCd: "002", cd: "", cdName: "", color: "" }),
  });
  if (!r.ok) throw new Error();
  return r.json();
};

/** 選択したタスクをサーバーから削除する */
export const deleteTask = async (t: TodoList[]): Promise<{ status: string }> => {
  const r = await apiFetch("api/todoDelete", { method: "POST", body: JSON.stringify(t) });
  if (!r.ok) throw new Error();
  return r.json();
};

/** タスクを新規登録・更新する */
export const createTask = async (t: TodoList[]): Promise<{ status: string }> => {
  const r = await apiFetch("api/todoRegister", { method: "POST", body: JSON.stringify(t) });
  if (!r.ok) throw new Error();
  return r.json();
};
