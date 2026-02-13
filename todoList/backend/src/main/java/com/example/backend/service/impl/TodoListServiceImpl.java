package com.example.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.db.mapper.TodoListMapper;
import com.example.backend.dto.TodoListDataDto;
import com.example.backend.service.TodoListService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoListServiceImpl implements TodoListService {

    private final TodoListMapper todoListMapper;

    @Override
    public List<TodoListDataDto> getListData() {
        List<TodoListDataDto> result = todoListMapper.selectAllTodoList();
        if (result.size() > 0) {

        }
        // TodoListDataDto todo = result.get(0);

        // String ss = todo.getProjectName();

        return result;
    }

}
