package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.TodoListDataDto;

public interface TodoListService {
    public List<TodoListDataDto> getListData();
    public void save(List<TodoListDataDto> entryList);
    /**
     * TODOリストを削除する
     * @param entryList 削除対象のDTOリスト（複合主キーで削除）
     */
    public void delete(List<TodoListDataDto> entryList);
}
