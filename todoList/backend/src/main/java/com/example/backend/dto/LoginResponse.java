package com.example.backend.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String accessToken;
    private String refreshToken;
    private String userId;
    private String userName;
    private String roleCd;
}
