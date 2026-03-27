package com.example.backend.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.example.backend.db.entity.TodoList;
import com.example.backend.db.entity.TodoListKey;
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
        for (TodoListDataDto dto : entryList) {
            TodoList entity = new TodoList();
            BeanUtils.copyProperties(dto, entity);

            if(entity.getInsDate() == null) {
                entity.setInsDate(new Date());
            }
            if(entity.getInsUserId() == null) {
                entity.setInsUserId("SYSTEM");
            }
            if(entity.getUpdDate() == null) {
                entity.setUpdDate(new Date());
            }
            if(entity.getUpdUserId() == null) {
                entity.setUpdUserId("SYSTEM");
            }


            TodoList selDto = todoListMapper.selectByPrimaryKey(entity);
            if (selDto != null) {
                // 更新
                todoListMapper.updateByPrimaryKeySelective(entity);
            } else {
                todoListMapper.insert(entity);
            }
        }
    }

    /**
     * TODOリストを削除する
     * 複合主キー(systemCd + projectCd + ticketNo)でレコードを物理削除する
     * @param entryList 削除対象のDTOリスト
     */
    @Override
    public void delete(List<TodoListDataDto> entryList) {
        for (TodoListDataDto dto : entryList) {
            // 複合主キーを設定して削除
            TodoListKey key = new TodoListKey();
            key.setSystemCd(dto.getSystemCd());
            key.setProjectCd(dto.getProjectCd());
            key.setTicketNo(dto.getTicketNo());
            todoListMapper.deleteByPrimaryKey(key);
        }
    }

}
