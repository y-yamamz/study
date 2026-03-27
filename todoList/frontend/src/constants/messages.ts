/**
 * 画面メッセージ定義
 * backend/src/main/resources/messages.properties のフロントエンド対応ファイル
 */
export const Messages = {
  /** バリデーションエラーメッセージ */
  validation: {
    maxLength: (field: string, max: number): string =>
      `${field}は${max}文字以内で入力してください。`,
    required: (field: string): string =>
      `${field}を入力してください。`,
  },

  /** フィールド別最大文字数エラーメッセージ（messages.propertiesと対応） */
  error: {
    system: {
      systemName: "システム名は255文字以内で入力してください。",
      note: "内容は1000文字以内で入力してください。",
      biko: "備考は2000文字以内で入力してください。",
    },
    project: {
      cd: "プロジェクトCDは3文字以内で入力してください。",
      projectName: "プロジェクト名は100文字以内で入力してください。",
      note: "内容は1000文字以内で入力してください。",
      biko: "備考は2000文字以内で入力してください。",
    },
    code: {
      cd: "CDは3文字以内で入力してください。",
      cdName: "コード名称は3文字以内で入力してください。",
      color: "カラーは7文字以内で入力してください。",
      note: "内容は1000文字以内で入力してください。",
      biko: "備考は2000文字以内で入力してください。",
    },
    groupCode: {
      cd: "グループCDは3文字以内で入力してください。",
      cdName: "コードグループ名称は100文字以内で入力してください。",
      note: "内容は1000文字以内で入力してください。",
      biko: "備考は2000文字以内で入力してください。",
    },
    todo: {
      ticketNo: "チケット番号は8文字以内で入力してください。",
      revisionNo: "リビジョン番号は50文字以内で入力してください。",
      note: "内容は1000文字以内で入力してください。",
      biko: "備考は2000文字以内で入力してください。",
    },
  },

  /** フィールド最大文字数（DB定義に基づく） */
  maxLength: {
    systemName: 255,
    projectCd: 3,
    projectName: 100,
    codeCd: 3,
    codeName: 3,
    color: 7,
    groupCodeCd: 3,
    groupCodeName: 100,
    note: 1000,
    biko: 2000,
    ticketNo: 8,
    revisionNo: 50,
  },
};
