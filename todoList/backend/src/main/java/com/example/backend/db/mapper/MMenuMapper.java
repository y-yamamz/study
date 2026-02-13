package com.example.backend.db.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.backend.db.entity.MMenu;
import com.example.backend.db.entity.MMenuExample;
import com.example.backend.dto.MenuListDao;

@Mapper
public interface MMenuMapper {

    List<MenuListDao> selectAll();

    long countByExample(MMenuExample example);

    int deleteByExample(MMenuExample example);

    int deleteByPrimaryKey(String id);

    int insert(MMenu row);

    int insertSelective(MMenu row);

    List<MMenu> selectByExample(MMenuExample example);

    MMenu selectByPrimaryKey(String id);

    int updateByExampleSelective(@Param("row") MMenu row, @Param("example") MMenuExample example);

    int updateByExample(@Param("row") MMenu row, @Param("example") MMenuExample example);

    int updateByPrimaryKeySelective(MMenu row);

    int updateByPrimaryKey(MMenu row);
}