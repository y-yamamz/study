package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.MSystemDto;

public interface MstSystemService {
    /**
     * システムマスタのコンボボックス用リストを取得する
     * @return システムマスタDTOリスト
     */
    List<MSystemDto> getCbbList();

    /**
     * システムマスタの全件リストを取得する
     * @return システムマスタDTOリスト
     */
    List<MSystemDto> getListData();

    /**
     * システムマスタを登録・更新する
     * @param dtoList システムマスタDTOリスト
     */
    void save(List<MSystemDto> dtoList);

    /**
     * システムマスタを削除する
     * @param dtoList 削除対象のシステムマスタDTOリスト
     */
    void delete(List<MSystemDto> dtoList);
}
