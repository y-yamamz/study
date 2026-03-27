package com.example.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.MstCodeService;
import com.example.backend.service.MstGroupCodeService;
import com.example.backend.service.MstProjectService;
import com.example.backend.service.MstSystemService;
import com.example.backend.dto.MCodeDto;
import com.example.backend.dto.MGroupCodeDto;
import com.example.backend.dto.MProjectDto;
import com.example.backend.dto.MSystemDto;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MasterController {
    private final MstSystemService mstSystemService;
    private final MstProjectService mstProjectService;
    private final MstCodeService mstCodeService;
    private final MstGroupCodeService mstGroupCodeService;

    /**
     * システムマスタのコンボボックス用リストを取得する
     * @return システムマスタDTOリスト
     */
    @PostMapping("/getMstSystemCbbList")
    public List<MSystemDto> postMetSystemCbbList() {
        List<MSystemDto> result = mstSystemService.getCbbList();

        return result;
    }

    /**
     * プロジェクトマスタのコンボボックス用リストを取得する
     * @param dto 検索条件DTO（systemCdでフィルタ）
     * @return プロジェクトマスタDTOリスト
     */
    @PostMapping("/getMstProjectCbbList")
    public List<MProjectDto> postMstProjectCbbList(@RequestBody MProjectDto dto) {
        List<MProjectDto> result = mstProjectService.getCbbList(dto);

        return result;
    }

    /**
     * コードマスタのコンボボックス用リストを取得する
     * @param dto 検索条件DTO（grCdでフィルタ）
     * @return コードマスタDTOリスト
     */
    @PostMapping("/getMstCodeCbbList")
    public List<MCodeDto> postMstCodeCbbList(@RequestBody MCodeDto dto) {
        List<MCodeDto> result = mstCodeService.getCbbList(dto);

        return result;
    }

    /**
     * システムマスタの管理画面用全件リストを取得する
     * @return システムマスタDTOリスト
     */
    @PostMapping("/getMstSystemList")
    public List<MSystemDto> postMstSystemList() {
        List<MSystemDto> result = mstSystemService.getListData();
        return result;
    }

    /**
     * システムマスタを登録・更新する
     * @param dtoList システムマスタDTOリスト
     * @return 処理結果（status, message）
     */
    @PostMapping("/saveMstSystem")
    @Transactional
    public ResponseEntity<Map<String, Object>> saveMstSystem(@RequestBody List<MSystemDto> dtoList) {
        mstSystemService.save(dtoList);

        Map<String, Object> res = new HashMap<>();
        res.put("status", "OK");
        res.put("message", "登録完了");

        return ResponseEntity.ok(res);
    }

    /**
     * プロジェクトマスタの管理画面用全件リストを取得する
     * @return プロジェクトマスタDTOリスト
     */
    @PostMapping("/getMstProjectList")
    public List<MProjectDto> postMstProjectList() {
        List<MProjectDto> result = mstProjectService.getListData();
        return result;
    }

    /**
     * プロジェクトマスタを登録・更新する
     * @param dtoList プロジェクトマスタDTOリスト
     * @return 処理結果（status, message）
     */
    @PostMapping("/saveMstProject")
    @Transactional
    public ResponseEntity<Map<String, Object>> saveMstProject(@RequestBody List<MProjectDto> dtoList) {
        mstProjectService.save(dtoList);

        Map<String, Object> res = new HashMap<>();
        res.put("status", "OK");
        res.put("message", "登録完了");

        return ResponseEntity.ok(res);
    }

    /**
     * コードマスタの管理画面用全件リストを取得する
     * @return コードマスタDTOリスト
     */
    @PostMapping("/getMstCodeList")
    public List<MCodeDto> postMstCodeList() {
        List<MCodeDto> result = mstCodeService.getListData();
        return result;
    }

    /**
     * コードマスタを登録・更新する
     * @param dtoList コードマスタDTOリスト
     * @return 処理結果（status, message）
     */
    @PostMapping("/saveMstCode")
    @Transactional
    public ResponseEntity<Map<String, Object>> saveMstCode(@RequestBody List<MCodeDto> dtoList) {
        mstCodeService.save(dtoList);

        Map<String, Object> res = new HashMap<>();
        res.put("status", "OK");
        res.put("message", "登録完了");

        return ResponseEntity.ok(res);
    }

    /**
     * コードグループマスタの管理画面用全件リストを取得する
     * @return コードグループマスタDTOリスト
     */
    @PostMapping("/getMstGroupCodeList")
    public List<MGroupCodeDto> postMstGroupCodeList() {
        List<MGroupCodeDto> result = mstGroupCodeService.getListData();
        return result;
    }

    /**
     * コードグループマスタを登録・更新する
     * @param dtoList コードグループマスタDTOリスト
     * @return 処理結果（status, message）
     */
    @PostMapping("/saveMstGroupCode")
    @Transactional
    public ResponseEntity<Map<String, Object>> saveMstGroupCode(@RequestBody List<MGroupCodeDto> dtoList) {
        mstGroupCodeService.save(dtoList);

        Map<String, Object> res = new HashMap<>();
        res.put("status", "OK");
        res.put("message", "登録完了");

        return ResponseEntity.ok(res);
    }

    /**
     * システムマスタを削除する
     * @param dtoList 削除対象のシステムマスタDTOリスト
     * @return 処理結果（status, message）
     */
    @PostMapping("/deleteMstSystem")
    @Transactional
    public ResponseEntity<Map<String, Object>> deleteMstSystem(@RequestBody List<MSystemDto> dtoList) {
        mstSystemService.delete(dtoList);

        Map<String, Object> res = new HashMap<>();
        res.put("status", "OK");
        res.put("message", "削除完了");

        return ResponseEntity.ok(res);
    }

    /**
     * プロジェクトマスタを削除する
     * @param dtoList 削除対象のプロジェクトマスタDTOリスト
     * @return 処理結果（status, message）
     */
    @PostMapping("/deleteMstProject")
    @Transactional
    public ResponseEntity<Map<String, Object>> deleteMstProject(@RequestBody List<MProjectDto> dtoList) {
        mstProjectService.delete(dtoList);

        Map<String, Object> res = new HashMap<>();
        res.put("status", "OK");
        res.put("message", "削除完了");

        return ResponseEntity.ok(res);
    }

    /**
     * コードマスタを削除する
     * @param dtoList 削除対象のコードマスタDTOリスト
     * @return 処理結果（status, message）
     */
    @PostMapping("/deleteMstCode")
    @Transactional
    public ResponseEntity<Map<String, Object>> deleteMstCode(@RequestBody List<MCodeDto> dtoList) {
        mstCodeService.delete(dtoList);

        Map<String, Object> res = new HashMap<>();
        res.put("status", "OK");
        res.put("message", "削除完了");

        return ResponseEntity.ok(res);
    }

    /**
     * コードグループマスタを削除する
     * @param dtoList 削除対象のコードグループマスタDTOリスト
     * @return 処理結果（status, message）
     */
    @PostMapping("/deleteMstGroupCode")
    @Transactional
    public ResponseEntity<Map<String, Object>> deleteMstGroupCode(@RequestBody List<MGroupCodeDto> dtoList) {
        mstGroupCodeService.delete(dtoList);

        Map<String, Object> res = new HashMap<>();
        res.put("status", "OK");
        res.put("message", "削除完了");

        return ResponseEntity.ok(res);
    }

}
