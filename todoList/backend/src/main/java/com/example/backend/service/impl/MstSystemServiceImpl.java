package com.example.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

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


    @Override
    public List<MSystemDto> getCbbList() {

        List<MSystemDto> result = mSystemMapper.selectCbbList();
        
        return result;
    }

}
