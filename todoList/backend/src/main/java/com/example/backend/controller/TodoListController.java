package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.entity.TodoList;
import com.example.backend.dto.TodoListDataDto;

import lombok.RequiredArgsConstructor;
import com.example.backend.service.TodoListService;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TodoListController {

    private final TodoListService todoListService;

    @PostMapping("/todoList")
    public List<TodoListDataDto> getTodoDataList() {
        List<TodoListDataDto> lst = todoListService.getListData();
        return lst;
    }


    @PostMapping("/todoRegister")
    @Transactional
    public void register(@RequestBody List<TodoListDataDto> dtoList) {
        todoListService.save(dtoList);
    }

}
