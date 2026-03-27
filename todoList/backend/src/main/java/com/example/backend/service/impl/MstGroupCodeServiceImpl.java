package com.example.backend.service.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.example.backend.db.entity.GroupCode;
import com.example.backend.db.entity.GroupCodeExample;
import com.example.backend.db.mapper.GroupCodeMapper;
import com.example.backend.dto.MGroupCodeDto;
import com.example.backend.service.MstGroupCodeService;

import lombok.RequiredArgsConstructor;

/**
 * コードグループマスタサービス実装クラス
 */
@Service
@RequiredArgsConstructor
public class MstGroupCodeServiceImpl implements MstGroupCodeService {
    private final GroupCodeMapper groupCodeMapper;


    /**
     * コードグループマスタの全件リストを取得する
     * Exampleクラスで条件なし全件取得し、エンティティをDTOに変換して返す
     * @return コードグループマスタDTOリスト
     */
    @Override
    public List<MGroupCodeDto> getListData() {
        // Exampleクラスで条件なし全件取得
        GroupCodeExample example = new GroupCodeExample();
        List<GroupCode> list = groupCodeMapper.selectByExample(example);

        // エンティティをDTOに変換
        List<MGroupCodeDto> result = list.stream().map(m -> {
            MGroupCodeDto dto = new MGroupCodeDto();
            BeanUtils.copyProperties(m, dto);
            return dto;
        }).collect(Collectors.toList());

        return result;
    }

    /**
     * コードグループマスタを登録・更新する
     * 主キー(cd)で既存レコードを確認し、存在しない場合は登録、存在する場合は更新する
     * @param dtoList コードグループマスタDTOリスト
     */
    @Override
    public void save(List<MGroupCodeDto> dtoList) {
        Date now = new Date();
        for (MGroupCodeDto dto : dtoList) {
            // 主キーで既存レコードを検索
            GroupCode exists = groupCodeMapper.selectByPrimaryKey(dto.getCd());
            if (exists == null) {
                // 登録日時・ユーザーをセットして新規登録
                dto.setInsDate(now);
                dto.setInsUserId("system");
                dto.setUpdDate(now);
                dto.setUpdUserId("system");
                groupCodeMapper.insertSelective(dto);
            } else {
                // 更新日時・ユーザーをセットして更新
                dto.setUpdDate(now);
                dto.setUpdUserId("system");
                groupCodeMapper.updateByPrimaryKeySelective(dto);
            }
        }
    }

    /**
     * コードグループマスタを削除する
     * 主キー(cd)でレコードを物理削除する
     * @param dtoList 削除対象のコードグループマスタDTOリスト
     */
    @Override
    public void delete(List<MGroupCodeDto> dtoList) {
        for (MGroupCodeDto dto : dtoList) {
            groupCodeMapper.deleteByPrimaryKey(dto.getCd());
        }
    }

}
