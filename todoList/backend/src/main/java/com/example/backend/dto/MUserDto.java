package com.example.backend.dto;

import com.example.backend.db.entity.MUser;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class MUserDto extends MUser {

    /** 入力用平文パスワード（DB には保存しない。空文字の場合はパスワード変更なし） */
    private String plainPassword;
}
