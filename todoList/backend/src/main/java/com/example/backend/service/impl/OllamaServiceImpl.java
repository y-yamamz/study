package com.example.backend.service.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import com.example.backend.service.OllamaService;
import lombok.RequiredArgsConstructor;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OllamaServiceImpl implements OllamaService{

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public String generate(String model, String prompt) {
        String url = "http://localhost:11434/api/generate";

        Map<String, Object> payload = Map.of(
            "model", model,
            "prompt", prompt
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String,Object>> request = new HttpEntity<>(payload, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
        return response.getBody();    
    }

    @Override
    public String chat(String prompt) {
        String url = "http://localhost:11434/v1/chat/completions";

        Map<String, Object> body = new HashMap<>();
//        body.put("model", "deepseek-coder"); // または llama3
        body.put("model", "llama3"); // または llama3
        body.put("messages", List.of(
                Map.of("role", "user", "content", prompt)
        ));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body);
        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

        List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
        Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");

        return message.get("content").toString();
    }

}
