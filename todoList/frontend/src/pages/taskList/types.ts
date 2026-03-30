/** プロジェクトマスタ（コンボボックス用） */
export interface MstProject {
  systemCd: string;
  cd: string;
  projectName: string;
}

/** コードマスタ（進捗状態・デプロイ状態共用） */
export interface MstCode {
  grCd: string;
  cd: string;
  cdName: string;
  color: string;
}

/** タスクの複合主キー */
export interface TodoListKey {
  systemCd: string;
  projectCd: string;
  ticketNo: string;
}

/** タスク一覧の1行分のデータ */
export interface TodoList extends TodoListKey {
  systemName: string;
  projectName: string;
  statusNm: string;
  deployNm: string;
  revisionNo: string;
  statusCd: string;
  deployCd: string;
  note: string;
  biko: string;
  yukoFlag: string;
}

/** 入力エラーの管理型: { 行インデックス: { フィールド名: エラーメッセージ } } */
export type RowErrors = { [idx: number]: { [field: string]: string } };
