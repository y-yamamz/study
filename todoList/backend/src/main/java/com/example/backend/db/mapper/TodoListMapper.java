package com.example.backend.db.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.backend.db.entity.TodoList;
import com.example.backend.db.entity.TodoListExample;
import com.example.backend.db.entity.TodoListKey;
import com.example.backend.dto.TodoListDataDto;

@Mapper
public interface TodoListMapper {

    List<TodoListDataDto> selectAllTodoList();

    long countByExample(TodoListExample example);

    int deleteByExample(TodoListExample example);

    int deleteByPrimaryKey(TodoListKey key);

    int insert(TodoList row);

    int insertSelective(TodoList row);

    List<TodoList> selectByExample(TodoListExample example);

    TodoList selectByPrimaryKey(TodoListKey key);

    int updateByExampleSelective(@Param("row") TodoList row, @Param("example") TodoListExample example);

    int updateByExample(@Param("row") TodoList row, @Param("example") TodoListExample example);

    int updateByPrimaryKeySelective(TodoList row);

    int updateByPrimaryKey(TodoList row);
}