package com.example.backend.service.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import at.favre.lib.crypto.bcrypt.BCrypt;

import com.example.backend.db.entity.MUser;
import com.example.backend.db.entity.MUserExample;
import com.example.backend.db.mapper.MUserMapper;
import com.example.backend.dto.MUserDto;
import com.example.backend.service.MstUserService;

/**
 * ユーザーマスタサービス実装クラス
 */
@Service
public class MstUserServiceImpl implements MstUserService {

    private final MUserMapper mUserMapper;

    public MstUserServiceImpl(MUserMapper mUserMapper) {
        this.mUserMapper = mUserMapper;
    }

    /**
     * ユーザーマスタの全件リストを取得する
     * パスワードハッシュはセキュリティのため返却しない
     * @return ユーザーマスタDTOリスト
     */
    @Override
    public List<MUserDto> getListData() {
        MUserExample example = new MUserExample();
        example.setOrderByClause("USER_ID ASC");
        List<MUser> list = mUserMapper.selectByExample(example);

        return list.stream().map(m -> {
            MUserDto dto = new MUserDto();
            BeanUtils.copyProperties(m, dto);
            // パスワードハッシュはフロントエンドに返さない
            dto.setPasswordHash("");
            return dto;
        }).collect(Collectors.toList());
    }

    /**
     * ユーザーマスタを登録・更新する
     * plainPassword が空でない場合は bcrypt でハッシュ化して保存する
     * 既存レコードの場合、plainPassword が空なら既存パスワードを保持する
     * @param dtoList ユーザーマスタDTOリスト
     */
    @Override
    public void save(List<MUserDto> dtoList) {
        Date now = new Date();
        for (MUserDto dto : dtoList) {
            MUser exists = mUserMapper.selectByPrimaryKey(dto.getUserId());
            if (exists == null) {
                // 新規登録: plainPassword 必須
                String plain = dto.getPlainPassword();
                if (plain != null && !plain.isBlank()) {
                    dto.setPasswordHash(BCrypt.withDefaults().hashToString(12, plain.toCharArray()));
                }
                dto.setInsDate(now);
                dto.setInsUserId("system");
                dto.setUpdDate(now);
                dto.setUpdUserId("system");
                mUserMapper.insertSelective(dto);
            } else {
                // 更新: plainPassword が入力されている場合のみパスワードを更新
                String plain = dto.getPlainPassword();
                if (plain != null && !plain.isBlank()) {
                    dto.setPasswordHash(BCrypt.withDefaults().hashToString(12, plain.toCharArray()));
                } else {
                    // パスワード変更なし: 既存ハッシュを引き継ぐ
                    dto.setPasswordHash(exists.getPasswordHash());
                }
                dto.setUpdDate(now);
                dto.setUpdUserId("system");
                mUserMapper.updateByPrimaryKeySelective(dto);
            }
        }
    }

    /**
     * ユーザーマスタを削除する
     * @param dtoList 削除対象のユーザーマスタDTOリスト
     */
    @Override
    public void delete(List<MUserDto> dtoList) {
        for (MUserDto dto : dtoList) {
            mUserMapper.deleteByPrimaryKey(dto.getUserId());
        }
    }
}
