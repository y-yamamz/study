package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.MCodeDto;

public interface MstCodeService {
    /**
     * コードマスタのコンボボックス用リストを取得する
     * @param dto 検索条件DTO（grCdでフィルタ）
     * @return コードマスタDTOリスト
     */
    List<MCodeDto> getCbbList(MCodeDto dto);

    /**
     * コードマスタの全件リストを取得する
     * @return コードマスタDTOリスト
     */
    List<MCodeDto> getListData();

    /**
     * コードマスタを登録・更新する
     * @param dtoList コードマスタDTOリスト
     */
    void save(List<MCodeDto> dtoList);

    /**
     * コードマスタを削除する
     * @param dtoList 削除対象のコードマスタDTOリスト
     */
    void delete(List<MCodeDto> dtoList);
}
