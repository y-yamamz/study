package com.example.backend.service.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.example.backend.db.entity.MSystem;
import com.example.backend.db.entity.MSystemExample;
import com.example.backend.db.mapper.MSystemMapper;
import com.example.backend.dto.MSystemDto;
import com.example.backend.service.MstSystemService;

import lombok.RequiredArgsConstructor;

/**
 * システムマスタサービス実装クラス
 */
@Service
@RequiredArgsConstructor
public class MstSystemServiceImpl implements MstSystemService {
    private final MSystemMapper mSystemMapper;


    /**
     * システムマスタのコンボボックス用リストを取得する
     * @return システムマスタDTOリスト
     */
    @Override
    public List<MSystemDto> getCbbList() {

        List<MSystemDto> result = mSystemMapper.selectCbbList();

        return result;
    }

    /**
     * システムマスタの全件リストを取得する
     * Exampleクラスで条件なし全件取得し、エンティティをDTOに変換して返す
     * @return システムマスタDTOリスト
     */
    @Override
    public List<MSystemDto> getListData() {
        // Exampleクラスで条件なし全件取得
        MSystemExample example = new MSystemExample();
        List<MSystem> list = mSystemMapper.selectByExample(example);

        // エンティティをDTOに変換
        List<MSystemDto> result = list.stream().map(m -> {
            MSystemDto dto = new MSystemDto();
            BeanUtils.copyProperties(m, dto);
            return dto;
        }).collect(Collectors.toList());

        return result;
    }

    /**
     * システムマスタを登録・更新する
     * 主キー(cd)で既存レコードを確認し、存在しない場合は登録、存在する場合は更新する
     * @param dtoList システムマスタDTOリスト
     */
    @Override
    public void save(List<MSystemDto> dtoList) {
        Date now = new Date();
        for (MSystemDto dto : dtoList) {
            // 主キーで既存レコードを検索
            MSystem exists = mSystemMapper.selectByPrimaryKey(dto.getCd());
            if (exists == null) {
                // 登録日時・ユーザーをセットして新規登録
                dto.setInsDate(now);
                dto.setInsUserId("system");
                dto.setUpdDate(now);
                dto.setUpdUserId("system");
                mSystemMapper.insertSelective(dto);
            } else {
                // 更新日時・ユーザーをセットして更新
                dto.setUpdDate(now);
                dto.setUpdUserId("system");
                mSystemMapper.updateByPrimaryKeySelective(dto);
            }
        }
    }

    /**
     * システムマスタを削除する
     * 主キー(cd)でレコードを物理削除する
     * @param dtoList 削除対象のシステムマスタDTOリスト
     */
    @Override
    public void delete(List<MSystemDto> dtoList) {
        for (MSystemDto dto : dtoList) {
            mSystemMapper.deleteByPrimaryKey(dto.getCd());
        }
    }

}
