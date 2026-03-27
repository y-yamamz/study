package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.MGroupCodeDto;

public interface MstGroupCodeService {
    /**
     * コードグループマスタの全件リストを取得する
     * @return コードグループマスタDTOリスト
     */
    List<MGroupCodeDto> getListData();

    /**
     * コードグループマスタを登録・更新する
     * @param dtoList コードグループマスタDTOリスト
     */
    void save(List<MGroupCodeDto> dtoList);

    /**
     * コードグループマスタを削除する
     * @param dtoList 削除対象のコードグループマスタDTOリスト
     */
    void delete(List<MGroupCodeDto> dtoList);
}
