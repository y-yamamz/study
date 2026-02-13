package com.example.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.db.mapper.MMenuMapper;
import com.example.backend.dto.MenuListDao;
import com.example.backend.service.MMenuService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MMenuServiceImle implements MMenuService {

    private final MMenuMapper mMenuMapper;

    @Override
    public List<MenuListDao> getListData() {
        List<MenuListDao> result = mMenuMapper.selectAll();
        return result;
    }

}
