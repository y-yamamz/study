package com.example.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.MenuListDao;
import com.example.backend.dto.TodoListDataDto;
import com.example.backend.service.MMenuService;
import com.example.backend.service.TodoListService;

import lombok.RequiredArgsConstructor;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final MMenuService mMenuService;
    private final TodoListService todoListService;

    @GetMapping("/test")
    public String test() {
        return "OK";
    }

    @PostMapping("/test2")
    public String test2() {
        List<TodoListDataDto> lst = todoListService.getListData();
        return "OK";
    }

    @PostMapping("/test3")
    public String test3() {
        List<MenuListDao> mnuelst = mMenuService.getListData();

        return "OK" + mnuelst.size();
    }

    @PostMapping("/test4")
    public List<MenuListDao> test4() {
        List<MenuListDao> mnuelst = mMenuService.getListData();
        if (mnuelst.size() <= 0) {
            mnuelst = new ArrayList<MenuListDao>();
        }
        return mnuelst;
    }

    @PostMapping("/userLogin")
    public String userLogin(@RequestBody UserForm user) {
        return "OK";
    }

    @PostMapping("/menuList")
    public List<MenuListDao> menuList(@RequestBody MenuListDao menuInfo) {
        List<MenuListDao> mnuelst = mMenuService.getListData();
        return mnuelst;
    }

    /*
    @PostMapping("/todoList")
    public List<TodoListDataDto> getTodoDataList() {
        List<TodoListDataDto> lst = todoListService.getListData();

        if (lst.size() > 0) {

        }

        return lst;
    }
    */
}
