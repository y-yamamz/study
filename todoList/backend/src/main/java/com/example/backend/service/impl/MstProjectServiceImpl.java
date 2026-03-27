package com.example.backend.service.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.example.backend.db.entity.MProject;
import com.example.backend.db.entity.MProjectExample;
import com.example.backend.db.entity.MProjectKey;
import com.example.backend.db.mapper.MProjectMapper;
import com.example.backend.dto.MProjectDto;
import com.example.backend.service.MstProjectService;

import lombok.RequiredArgsConstructor;

/**
 * プロジェクトマスタサービス実装クラス
 */
@Service
@RequiredArgsConstructor
public class MstProjectServiceImpl implements MstProjectService {

    private final MProjectMapper mProjectMapper;

    /**
     * プロジェクトマスタのコンボボックス用リストを取得する
     * @param dto 検索条件DTO（systemCdでフィルタ）
     * @return プロジェクトマスタDTOリスト
     */
    @Override
    public List<MProjectDto> getCbbList(MProjectDto dto) {
        List<MProjectDto> result = mProjectMapper.selectCbbList(dto);

        return result;
    }

    /**
     * プロジェクトマスタの全件リストを取得する
     * Exampleクラスで条件なし全件取得し、エンティティをDTOに変換して返す
     * @return プロジェクトマスタDTOリスト
     */
    @Override
    public List<MProjectDto> getListData() {
        // Exampleクラスで条件なし全件取得
        MProjectExample example = new MProjectExample();
        List<MProject> list = mProjectMapper.selectByExample(example);

        // エンティティをDTOに変換
        List<MProjectDto> result = list.stream().map(m -> {
            MProjectDto dto = new MProjectDto();
            BeanUtils.copyProperties(m, dto);
            return dto;
        }).collect(Collectors.toList());

        return result;
    }

    /**
     * プロジェクトマスタを登録・更新する
     * 複合主キー(systemCd + cd)で既存レコードを確認し、存在しない場合は登録、存在する場合は更新する
     * @param dtoList プロジェクトマスタDTOリスト
     */
    @Override
    public void save(List<MProjectDto> dtoList) {
        Date now = new Date();
        for (MProjectDto dto : dtoList) {
            // 複合主キーで既存レコードを検索
            MProjectKey key = new MProjectKey();
            key.setSystemCd(dto.getSystemCd());
            key.setCd(dto.getCd());
            MProject exists = mProjectMapper.selectByPrimaryKey(key);
            if (exists == null) {
                // 登録日時・ユーザーをセットして新規登録
                dto.setInsDate(now);
                dto.setInsUserId("system");
                dto.setUpdDate(now);
                dto.setUpdUserId("system");
                mProjectMapper.insertSelective(dto);
            } else {
                // 更新日時・ユーザーをセットして更新
                dto.setUpdDate(now);
                dto.setUpdUserId("system");
                mProjectMapper.updateByPrimaryKeySelective(dto);
            }
        }
    }

    /**
     * プロジェクトマスタを削除する
     * 複合主キー(systemCd + cd)でレコードを物理削除する
     * @param dtoList 削除対象のプロジェクトマスタDTOリスト
     */
    @Override
    public void delete(List<MProjectDto> dtoList) {
        for (MProjectDto dto : dtoList) {
            MProjectKey key = new MProjectKey();
            key.setSystemCd(dto.getSystemCd());
            key.setCd(dto.getCd());
            mProjectMapper.deleteByPrimaryKey(key);
        }
    }

}
