package com.example.backend.service.impl;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.backend.service.McpClientService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class McpClientServiceImpl implements McpClientService {

     private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public String askServer(String prompt) {
        String url = "http://localhost:8080/mcp/ask";
        Map<String, String> body = Map.of("prompt", prompt);
        Map<String, String> response = restTemplate.postForObject(url, body, Map.class);
        return response.get("answer");
    }

}
