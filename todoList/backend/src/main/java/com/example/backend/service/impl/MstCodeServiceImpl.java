package com.example.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.db.mapper.MCodeMapper;
import com.example.backend.dto.MCodeDto;
import com.example.backend.service.MstCodeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MstCodeServiceImpl implements MstCodeService {
    private final MCodeMapper mstCodeService; 


    @Override
    public List<MCodeDto> getCbbList(MCodeDto dto) {
        List<MCodeDto> result = mstCodeService.selectCbbList(dto);
        return result;
    }

}
