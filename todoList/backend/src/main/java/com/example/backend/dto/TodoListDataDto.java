package com.example.backend.dto;

import com.example.backend.db.entity.TodoList;

import lombok.Data;

@Data
public class TodoListDataDto extends TodoList {
    private String systemName;
    private String projectName;
}
