package com.example.backend.db.mapper;

import com.example.backend.db.entity.MCode;
import com.example.backend.db.entity.MCodeExample;
import com.example.backend.db.entity.MCodeKey;
import com.example.backend.dto.MCodeDto;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MCodeMapper {
    List<MCodeDto> selectCbbList(MCodeDto dto);
    
    long countByExample(MCodeExample example);

    int deleteByExample(MCodeExample example);

    int deleteByPrimaryKey(MCodeKey key);

    int insert(MCode row);

    int insertSelective(MCode row);

    List<MCode> selectByExample(MCodeExample example);

    MCode selectByPrimaryKey(MCodeKey key);

    int updateByExampleSelective(@Param("row") MCode row, @Param("example") MCodeExample example);

    int updateByExample(@Param("row") MCode row, @Param("example") MCodeExample example);

    int updateByPrimaryKeySelective(MCode row);

    int updateByPrimaryKey(MCode row);
}