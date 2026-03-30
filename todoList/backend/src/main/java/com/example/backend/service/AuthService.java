package com.example.backend.service;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import jakarta.servlet.http.HttpServletRequest;

public interface AuthService {
    LoginResponse login(LoginRequest request, HttpServletRequest httpRequest);
}
