package com.example.backend.db.mapper;

import com.example.backend.db.entity.MProject;
import com.example.backend.db.entity.MProjectExample;
import com.example.backend.db.entity.MProjectKey;
import com.example.backend.dto.MProjectDto;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MProjectMapper {
    List<MProjectDto> selectCbbList(MProjectDto dto);

    long countByExample(MProjectExample example);

    int deleteByExample(MProjectExample example);

    int deleteByPrimaryKey(MProjectKey key);

    int insert(MProject row);

    int insertSelective(MProject row);

    List<MProject> selectByExample(MProjectExample example);

    MProject selectByPrimaryKey(MProjectKey key);

    int updateByExampleSelective(@Param("row") MProject row, @Param("example") MProjectExample example);

    int updateByExample(@Param("row") MProject row, @Param("example") MProjectExample example);

    int updateByPrimaryKeySelective(MProject row);

    int updateByPrimaryKey(MProject row);
}