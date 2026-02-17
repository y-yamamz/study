package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.TodoListDataDto;

public interface TodoListService {
    public List<TodoListDataDto> getListData();
    public void save(List<TodoListDataDto> entryList);
}
