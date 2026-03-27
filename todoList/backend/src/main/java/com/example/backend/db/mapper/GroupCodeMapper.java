package com.example.backend.db.mapper;

import com.example.backend.db.entity.GroupCode;
import com.example.backend.db.entity.GroupCodeExample;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface GroupCodeMapper {
    long countByExample(GroupCodeExample example);

    int deleteByExample(GroupCodeExample example);

    int deleteByPrimaryKey(String cd);

    int insert(GroupCode row);

    int insertSelective(GroupCode row);

    List<GroupCode> selectByExample(GroupCodeExample example);

    GroupCode selectByPrimaryKey(String cd);

    int updateByExampleSelective(@Param("row") GroupCode row, @Param("example") GroupCodeExample example);

    int updateByExample(@Param("row") GroupCode row, @Param("example") GroupCodeExample example);

    int updateByPrimaryKeySelective(GroupCode row);

    int updateByPrimaryKey(GroupCode row);
}