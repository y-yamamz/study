-- ============================================================
-- M_USER : ユーザーマスタ
--
-- 【概要】
--   ログイン認証・権限管理に使用するユーザー情報を管理する。
--   パスワードは bcrypt 等でハッシュ化した値を格納する。
--
-- 【主キー】
--   USER_ID : ログインID (例: "yamada", "admin001")
--
-- 【ROLE_CD】
--   ADMIN : 管理者（マスタ管理画面へのアクセス可）
--   USER  : 一般ユーザー（TodoList のみ）
--
-- 【YUKO_FLAG】
--   1 : 有効 / 0 : 無効（論理削除・アカウントロック）
-- ============================================================

CREATE TABLE M_USER (
  USER_ID         varchar(20)   NOT NULL                COMMENT 'ユーザーID（ログインID）',
  USER_NAME       varchar(100)  NOT NULL                COMMENT 'ユーザー名',
  PASSWORD_HASH   varchar(255)  NOT NULL                COMMENT 'パスワードハッシュ（bcrypt）',
  ROLE_CD         varchar(10)   NOT NULL DEFAULT 'USER' COMMENT 'ロール（ADMIN / USER）',
  EMAIL           varchar(255)      NULL                COMMENT 'メールアドレス',
  YUKO_FLAG       char(1)       NOT NULL DEFAULT '1'   COMMENT '有効フラグ（1:有効 / 0:無効）',
  INS_DATE        datetime(3)   NOT NULL                COMMENT '登録日',
  INS_USER_ID     varchar(20)   NOT NULL DEFAULT ''     COMMENT '登録ユーザーID',
  UPD_DATE        datetime(3)   NOT NULL                COMMENT '更新日',
  UPD_USER_ID     varchar(20)   NOT NULL DEFAULT ''     COMMENT '更新ユーザーID',
  PRIMARY KEY (USER_ID)
) DEFAULT CHARSET=utf8mb4 COMMENT='ユーザーマスタ';


-- ============================================================
-- 初期データ（管理者ユーザー）
-- パスワード "admin123" を bcrypt でハッシュ化した値
-- ※ 本番環境では必ずパスワードを変更すること
-- ============================================================
INSERT INTO M_USER
  (USER_ID, USER_NAME, PASSWORD_HASH, ROLE_CD, EMAIL, YUKO_FLAG, INS_DATE, INS_USER_ID, UPD_DATE, UPD_USER_ID)
VALUES
  ('admin', '管理者', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ADMIN', NULL, '1', NOW(3), 'system', NOW(3), 'system');
