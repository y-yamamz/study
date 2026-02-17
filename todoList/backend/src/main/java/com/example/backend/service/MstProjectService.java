package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.MProjectDto;



public interface MstProjectService {
    List<MProjectDto> getCbbList(MProjectDto dto);
}
