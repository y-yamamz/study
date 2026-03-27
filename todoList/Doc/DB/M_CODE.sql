CREATE TABLE M_CODE (
  GR_CD  varchar(3) NOT NULL COMMENT 'コード',
  CD  varchar(3) NOT NULL COMMENT 'コード',
  CD_NAME varchar(3) NOT NULL COMMENT '名称',
  NOTE varchar(1000)  NULL COMMENT '内容',
  BIKO varchar(2000)  NULL COMMENT '備考',
  COLOR char(7)  NULL COMMENT '色',
  YUKO_FLAG char(1)  NOT NULL COMMENT '有効フラグ',
  INS_DATE datetime(3) NOT NULL COMMENT '登録日',
  INS_USER_ID varchar(20) NOT NULL DEFAULT '' COMMENT '登録ユーザーID',
  UPD_DATE datetime(3) NOT NULL COMMENT '更新日',
  UPD_USER_ID varchar(20) NOT NULL DEFAULT '' COMMENT '更新ユーザーID',
  PRIMARY KEY (GR_CD, CD)
) DEFAULT CHARSET=utf8mb4 COMMENT='コードマスタ'

