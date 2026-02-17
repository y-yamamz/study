package com.example.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.db.mapper.MProjectMapper;
import com.example.backend.dto.MProjectDto;
import com.example.backend.service.MstProjectService;

import lombok.RequiredArgsConstructor;

/**
 * プロジェクトマスタサービス実装クラス
 */
@Service
@RequiredArgsConstructor
public class MstProjectServiceImpl  implements MstProjectService {

    private final MProjectMapper mProjectMapper;

    @Override
    public List<MProjectDto> getCbbList(MProjectDto dto) {
        List<MProjectDto> result = mProjectMapper.selectCbbList(dto);

        return result;
    }

}
