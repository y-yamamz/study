package com.example.backend.service.impl;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.example.backend.db.entity.TodoList;
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
        return result;
    }

    @Override
    public void save(List<TodoListDataDto> entryList) {
        for(TodoListDataDto dto : entryList) {
            TodoList entity = new TodoList();
            BeanUtils.copyProperties(dto, entity);
            TodoList selDto = todoListMapper.selectByPrimaryKey(entity);
            if(selDto != null) {
                //更新
                todoListMapper.updateByPrimaryKey(entity);
            }else{
                todoListMapper.insert(entity);
            }
        }
    }

}
