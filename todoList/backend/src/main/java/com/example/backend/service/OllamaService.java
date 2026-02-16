package com.example.backend.service;

import java.io.IOException;

public interface OllamaService {
    public String generate(String model, String prompt);
    public String chat(String prompt);
}
