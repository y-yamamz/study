package com.example.backend.service.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.example.backend.db.entity.MCode;
import com.example.backend.db.entity.MCodeExample;
import com.example.backend.db.entity.MCodeKey;
import com.example.backend.db.mapper.MCodeMapper;
import com.example.backend.dto.MCodeDto;
import com.example.backend.service.MstCodeService;

import lombok.RequiredArgsConstructor;

/**
 * コードマスタサービス実装クラス
 */
@Service
@RequiredArgsConstructor
public class MstCodeServiceImpl implements MstCodeService {
    private final MCodeMapper mstCodeService;


    /**
     * コードマスタのコンボボックス用リストを取得する
     * @param dto 検索条件DTO（grCdでフィルタ）
     * @return コードマスタDTOリスト
     */
    @Override
    public List<MCodeDto> getCbbList(MCodeDto dto) {
        List<MCodeDto> result = mstCodeService.selectCbbList(dto);
        return result;
    }

    /**
     * コードマスタの全件リストを取得する
     * Exampleクラスで条件なし全件取得し、エンティティをDTOに変換して返す
     * @return コードマスタDTOリスト
     */
    @Override
    public List<MCodeDto> getListData() {
        // Exampleクラスで条件なし全件取得
        MCodeExample example = new MCodeExample();
        List<MCode> list = mstCodeService.selectByExample(example);

        // エンティティをDTOに変換
        List<MCodeDto> result = list.stream().map(m -> {
            MCodeDto dto = new MCodeDto();
            BeanUtils.copyProperties(m, dto);
            return dto;
        }).collect(Collectors.toList());

        return result;
    }

    /**
     * コードマスタを登録・更新する
     * 複合主キー(grCd + cd)で既存レコードを確認し、存在しない場合は登録、存在する場合は更新する
     * @param dtoList コードマスタDTOリスト
     */
    @Override
    public void save(List<MCodeDto> dtoList) {
        Date now = new Date();
        for (MCodeDto dto : dtoList) {
            // 複合主キーで既存レコードを検索
            MCodeKey key = new MCodeKey();
            key.setGrCd(dto.getGrCd());
            key.setCd(dto.getCd());
            MCode exists = mstCodeService.selectByPrimaryKey(key);
            if (exists == null) {
                // 登録日時・ユーザーをセットして新規登録
                dto.setInsDate(now);
                dto.setInsUserId("system");
                dto.setUpdDate(now);
                dto.setUpdUserId("system");
                mstCodeService.insertSelective(dto);
            } else {
                // 更新日時・ユーザーをセットして更新
                dto.setUpdDate(now);
                dto.setUpdUserId("system");
                mstCodeService.updateByPrimaryKeySelective(dto);
            }
        }
    }

    /**
     * コードマスタを削除する
     * 複合主キー(grCd + cd)でレコードを物理削除する
     * @param dtoList 削除対象のコードマスタDTOリスト
     */
    @Override
    public void delete(List<MCodeDto> dtoList) {
        for (MCodeDto dto : dtoList) {
            MCodeKey key = new MCodeKey();
            key.setGrCd(dto.getGrCd());
            key.setCd(dto.getCd());
            mstCodeService.deleteByPrimaryKey(key);
        }
    }

}
