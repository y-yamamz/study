package com.example.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.MstCodeService;
import com.example.backend.service.MstProjectService;
import com.example.backend.service.MstSystemService;
import com.example.backend.dto.MCodeDto;
import com.example.backend.dto.MProjectDto;
import com.example.backend.dto.MSystemDto;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MasterController {
    private final MstSystemService mstSystemService;
    private final MstProjectService mstProjectService;
    private final MstCodeService mstCodeService;

    /**
     * システムマスタのコンボボックス用リストを取得する
     * @return
     */
    @PostMapping("/getMstSystemCbbList")
    public List<MSystemDto> postMetSystemCbbList() {
        List<MSystemDto> result = mstSystemService.getCbbList();
        
        return result;
    }
    
    /**
     * プロジェクトマスタのコンボボックス用リストを取得する
     * @return
     */
    @PostMapping("/getMstProjectCbbList")
    public List<MProjectDto> postMstProjectCbbList(@RequestBody MProjectDto dto) {
        List<MProjectDto> result = mstProjectService.getCbbList(dto);

        return result;
    }

    /**
     * コードマスタのコンボボックス用リストを取得する
     * @return
     */
    @PostMapping("/getMstCodeCbbList")
    public List<MCodeDto> postMstCodeCbbList(@RequestBody MCodeDto dto) {
        List<MCodeDto> result = mstCodeService.getCbbList(dto);

        return result;
    }
        
}
