package com.example.backend.db.mapper;

import com.example.backend.db.entity.MemoPad;
import com.example.backend.db.entity.MemoPadExample;
import com.example.backend.db.entity.MemoPadKey;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MemoPadMapper {
    long countByExample(MemoPadExample example);

    int deleteByExample(MemoPadExample example);

    int deleteByPrimaryKey(MemoPadKey key);

    int insert(MemoPad row);

    int insertSelective(MemoPad row);

    List<MemoPad> selectByExampleWithBLOBs(MemoPadExample example);

    List<MemoPad> selectByExample(MemoPadExample example);

    MemoPad selectByPrimaryKey(MemoPadKey key);

    int updateByExampleSelective(@Param("row") MemoPad row, @Param("example") MemoPadExample example);

    int updateByExampleWithBLOBs(@Param("row") MemoPad row, @Param("example") MemoPadExample example);

    int updateByExample(@Param("row") MemoPad row, @Param("example") MemoPadExample example);

    int updateByPrimaryKeySelective(MemoPad row);

    int updateByPrimaryKeyWithBLOBs(MemoPad row);

    int updateByPrimaryKey(MemoPad row);
}