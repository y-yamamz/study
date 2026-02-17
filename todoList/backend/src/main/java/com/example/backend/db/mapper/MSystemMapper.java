package com.example.backend.db.mapper;

import com.example.backend.db.entity.MSystem;
import com.example.backend.db.entity.MSystemExample;
import com.example.backend.dto.MSystemDto;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MSystemMapper {
    List<MSystemDto> selectCbbList();

    long countByExample(MSystemExample example);

    int deleteByExample(MSystemExample example);

    int deleteByPrimaryKey(String cd);

    int insert(MSystem row);

    int insertSelective(MSystem row);

    List<MSystem> selectByExample(MSystemExample example);

    MSystem selectByPrimaryKey(String cd);

    int updateByExampleSelective(@Param("row") MSystem row, @Param("example") MSystemExample example);

    int updateByExample(@Param("row") MSystem row, @Param("example") MSystemExample example);

    int updateByPrimaryKeySelective(MSystem row);

    int updateByPrimaryKey(MSystem row);
}