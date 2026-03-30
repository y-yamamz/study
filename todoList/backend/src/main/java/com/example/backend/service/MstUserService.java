package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.MUserDto;

public interface MstUserService {

    /**
     * ユーザーマスタの全件リストを取得する（パスワードハッシュはマスク済み）
     * @return ユーザーマスタDTOリスト
     */
    List<MUserDto> getListData();

    /**
     * ユーザーマスタを登録・更新する
     * plainPassword が空でない場合は bcrypt でハッシュ化して保存する
     * @param dtoList ユーザーマスタDTOリスト
     */
    void save(List<MUserDto> dtoList);

    /**
     * ユーザーマスタを削除する
     * @param dtoList 削除対象のユーザーマスタDTOリスト
     */
    void delete(List<MUserDto> dtoList);
}
