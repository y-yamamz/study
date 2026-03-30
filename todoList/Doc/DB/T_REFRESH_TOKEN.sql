-- ============================================================
-- T_REFRESH_TOKEN : リフレッシュトークン管理
--
-- 【概要】
--   JWT のリフレッシュトークンを管理する。
--   アクセストークン（短命・ステートレス）の再発行に使用する。
--   ログアウト時や不正検知時にレコードを無効化することで
--   トークンの失効を制御する。
--
-- 【主キー】
--   TOKEN_ID : サロゲートキー（AUTO_INCREMENT）
--
-- 【REVOKED_FLAG】
--   0 : 有効 / 1 : 無効化（ログアウト・強制失効）
--
-- 【有効期限管理】
--   EXPIRES_AT を過ぎたトークンはバッチ等で定期削除する。
--   バックエンドは EXPIRES_AT と REVOKED_FLAG の両方を検証する。
-- ============================================================

CREATE TABLE T_REFRESH_TOKEN (
  TOKEN_ID        bigint        NOT NULL AUTO_INCREMENT          COMMENT 'トークンID（サロゲートキー）',
  USER_ID         varchar(20)   NOT NULL                        COMMENT 'ユーザーID（M_USER.USER_ID）',
  TOKEN_HASH      varchar(255)  NOT NULL                        COMMENT 'リフレッシュトークンのハッシュ値',
  REVOKED_FLAG    char(1)       NOT NULL DEFAULT '0'            COMMENT '無効フラグ（0:有効 / 1:無効）',
  EXPIRES_AT      datetime(3)   NOT NULL                        COMMENT 'トークン有効期限',
  USER_AGENT      varchar(500)      NULL                        COMMENT '発行時のユーザーエージェント',
  IP_ADDRESS      varchar(45)       NULL                        COMMENT '発行時のIPアドレス（IPv6対応）',
  INS_DATE        datetime(3)   NOT NULL                        COMMENT '登録日（トークン発行日時）',
  INS_USER_ID     varchar(20)   NOT NULL DEFAULT ''             COMMENT '登録ユーザーID',
  UPD_DATE        datetime(3)   NOT NULL                        COMMENT '更新日',
  UPD_USER_ID     varchar(20)   NOT NULL DEFAULT ''             COMMENT '更新ユーザーID',
  PRIMARY KEY (TOKEN_ID),
  INDEX IDX_REFRESH_TOKEN_USER_ID  (USER_ID),
  INDEX IDX_REFRESH_TOKEN_EXPIRES  (EXPIRES_AT),
  CONSTRAINT FK_REFRESH_TOKEN_USER
    FOREIGN KEY (USER_ID) REFERENCES M_USER (USER_ID)
    ON UPDATE CASCADE ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COMMENT='リフレッシュトークン管理';
