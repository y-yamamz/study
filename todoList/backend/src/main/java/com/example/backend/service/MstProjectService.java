package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.MProjectDto;

public interface MstProjectService {
    /**
     * プロジェクトマスタのコンボボックス用リストを取得する
     * @param dto 検索条件DTO（systemCdでフィルタ）
     * @return プロジェクトマスタDTOリスト
     */
    List<MProjectDto> getCbbList(MProjectDto dto);

    /**
     * プロジェクトマスタの全件リストを取得する
     * @return プロジェクトマスタDTOリスト
     */
    List<MProjectDto> getListData();

    /**
     * プロジェクトマスタを登録・更新する
     * @param dtoList プロジェクトマスタDTOリスト
     */
    void save(List<MProjectDto> dtoList);

    /**
     * プロジェクトマスタを削除する
     * @param dtoList 削除対象のプロジェクトマスタDTOリスト
     */
    void delete(List<MProjectDto> dtoList);
}
