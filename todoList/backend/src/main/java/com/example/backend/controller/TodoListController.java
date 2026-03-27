package com.example.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Map<String, Object>> register(@RequestBody List<TodoListDataDto> dtoList) {
        String val = "";
        todoListService.save(dtoList);
        for (TodoListDataDto dto : dtoList) {
            TodoList entity = new TodoList();
            BeanUtils.copyProperties(dto, entity);
            // todoListService.save(entity);

            val += "note: " + dto.getNote() + ", ";
        }

        Map<String, Object> res = new HashMap<>();
        res.put("status", "OK");
        res.put("message", "登録完了");

        return ResponseEntity.ok(res);
    }

}
