package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.MenuListDao;
import com.example.backend.dto.TodoListDataDto;
import com.example.backend.service.MMenuService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MenuController {
    private final MMenuService mMenuService;

    @PostMapping("/menuList")
    public List<MenuListDao> menuList(@RequestBody MenuListDao menuInfo) {
        List<MenuListDao> mnuelst = mMenuService.getListData();
        return mnuelst;
    }

    

}
