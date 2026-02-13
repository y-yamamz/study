export interface TodoListKey {
  systemCd:string;
  projectCd:string;
  ticketNo:string;
}

export interface TodoListDto extends TodoListKey {
  revisionNo: string;
  statusCd: string;
  deployCd: string;
  note: string;
  biko: string;
  yukoFlag: string;        // "0" | "1" 想定
  insDate: string;        // ISO文字列
  insUserId: string;
  updDate: string;        // ISO文字列
  updUserId: string;
}
