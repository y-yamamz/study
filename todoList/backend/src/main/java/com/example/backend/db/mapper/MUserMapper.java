package com.example.backend.db.mapper;

import com.example.backend.db.entity.MUser;
import com.example.backend.db.entity.MUserExample;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MUserMapper {
    long countByExample(MUserExample example);

    int deleteByExample(MUserExample example);

    int deleteByPrimaryKey(String userId);

    int insert(MUser row);

    int insertSelective(MUser row);

    List<MUser> selectByExample(MUserExample example);

    MUser selectByPrimaryKey(String userId);

    int updateByExampleSelective(@Param("row") MUser row, @Param("example") MUserExample example);

    int updateByExample(@Param("row") MUser row, @Param("example") MUserExample example);

    int updateByPrimaryKeySelective(MUser row);

    int updateByPrimaryKey(MUser row);
}