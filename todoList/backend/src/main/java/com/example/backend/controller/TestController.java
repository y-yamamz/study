package com.example.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.McpClientService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TestController {

    private final McpClientService clientService;


    @GetMapping("/test/ai")
    public String testAI() {
        return clientService.askServer("Javaで配列を反転するコードを改行をいれて書いて");
    }
}