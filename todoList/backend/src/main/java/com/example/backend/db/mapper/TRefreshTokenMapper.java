package com.example.backend.db.mapper;

import com.example.backend.db.entity.TRefreshToken;
import com.example.backend.db.entity.TRefreshTokenExample;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface TRefreshTokenMapper {
    long countByExample(TRefreshTokenExample example);

    int deleteByExample(TRefreshTokenExample example);

    int deleteByPrimaryKey(Long tokenId);

    int insert(TRefreshToken row);

    int insertSelective(TRefreshToken row);

    List<TRefreshToken> selectByExample(TRefreshTokenExample example);

    TRefreshToken selectByPrimaryKey(Long tokenId);

    int updateByExampleSelective(@Param("row") TRefreshToken row, @Param("example") TRefreshTokenExample example);

    int updateByExample(@Param("row") TRefreshToken row, @Param("example") TRefreshTokenExample example);

    int updateByPrimaryKeySelective(TRefreshToken row);

    int updateByPrimaryKey(TRefreshToken row);
}