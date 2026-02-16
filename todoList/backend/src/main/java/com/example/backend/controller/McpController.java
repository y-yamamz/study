package com.example.backend.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.OllamaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/mcp")
@RequiredArgsConstructor
public class McpController {
    private final OllamaService ollamaService;


    @PostMapping("/ask")
    public Map<String, String> askAI(@RequestBody Map<String, String> req) {
        String prompt = req.get("prompt");
        String answer = ollamaService.chat(prompt);
        return Map.of("answer", answer);
    }

}
