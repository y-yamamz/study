package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.TodoListDataDto;

import lombok.RequiredArgsConstructor;
import com.example.backend.service.TodoListService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TodoListController {

    private final TodoListService todoListService;

    @PostMapping("/todoList")
    public List<TodoListDataDto> getTodoDataList() {
        List<TodoListDataDto> lst = todoListService.getListData();

        if (lst.size() > 0) {

        }

        return lst;
    }

}
