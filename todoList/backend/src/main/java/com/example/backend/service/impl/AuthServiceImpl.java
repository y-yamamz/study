package com.example.backend.service.impl;

import at.favre.lib.crypto.bcrypt.BCrypt;
import com.example.backend.db.entity.MUser;
import com.example.backend.db.entity.TRefreshToken;
import com.example.backend.db.mapper.MUserMapper;
import com.example.backend.db.mapper.TRefreshTokenMapper;
import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import com.example.backend.service.AuthService;
import com.example.backend.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthServiceImpl implements AuthService {

    private final MUserMapper mUserMapper;
    private final TRefreshTokenMapper tRefreshTokenMapper;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(MUserMapper mUserMapper, TRefreshTokenMapper tRefreshTokenMapper, JwtUtil jwtUtil) {
        this.mUserMapper = mUserMapper;
        this.tRefreshTokenMapper = tRefreshTokenMapper;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public LoginResponse login(LoginRequest request, HttpServletRequest httpRequest) {
        // ユーザー取得
        MUser user = mUserMapper.selectByPrimaryKey(request.getUserId());
        if (user == null || !"1".equals(user.getYukoFlag())) {
            throw new RuntimeException("ユーザーIDまたはパスワードが正しくありません");
        }

        // パスワード検証
        BCrypt.Result result = BCrypt.verifyer().verify(
                request.getPassword().toCharArray(),
                user.getPasswordHash());
        if (!result.verified) {
            throw new RuntimeException("ユーザーIDまたはパスワードが正しくありません");
        }

        // トークン生成
        String accessToken = jwtUtil.generateAccessToken(user.getUserId(), user.getRoleCd());
        String refreshToken = jwtUtil.generateRefreshToken(user.getUserId());

        // リフレッシュトークン保存
        Date now = new Date();
        TRefreshToken tokenEntity = new TRefreshToken();
        tokenEntity.setUserId(user.getUserId());
        tokenEntity.setTokenHash(refreshToken);
        tokenEntity.setRevokedFlag("0");
        tokenEntity.setExpiresAt(new Date(now.getTime() + 604800000L));
        tokenEntity.setUserAgent(httpRequest.getHeader("User-Agent"));
        tokenEntity.setIpAddress(httpRequest.getRemoteAddr());
        tokenEntity.setInsDate(now);
        tokenEntity.setInsUserId(user.getUserId());
        tokenEntity.setUpdDate(now);
        tokenEntity.setUpdUserId(user.getUserId());
        tRefreshTokenMapper.insertSelective(tokenEntity);

        // レスポンス生成
        LoginResponse response = new LoginResponse();
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);
        response.setUserId(user.getUserId());
        response.setUserName(user.getUserName());
        response.setRoleCd(user.getRoleCd());
        return response;
    }
}
