package org.cloud.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.cloud.dto.BoardDto;
import org.cloud.dto.Criteria;
import org.cloud.dto.PageResponse;
import org.cloud.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@CrossOrigin(origins = "*") 
@RestController 
@RequestMapping("/api/board")
public class BoardApiController {

    @Autowired
    private BoardService boardService;

    
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getBoardList(Criteria cri) throws Exception {
        if (cri.getPageNum() <= 0) cri.setPageNum(1);
        if (cri.getAmount() <= 0) cri.setAmount(10);

        List<BoardDto> list = boardService.selectBoardListPaging(cri);
        int total = boardService.selectBoardTotalCount();
        PageResponse pageMaker = new PageResponse(cri, total);

        Map<String, Object> response = new HashMap<>();
        response.put("list", list);
        response.put("pageMaker", pageMaker);

        return ResponseEntity.ok(response);
    }

   
    @GetMapping("/detail/{boardId}")
    public ResponseEntity<BoardDto> getBoardDetail(@PathVariable("boardId") int boardId) throws Exception {
        BoardDto board = boardService.selectDetail(boardId);
        return ResponseEntity.ok(board);
    }

    
    @PostMapping("/insert")
    public ResponseEntity<String> insertBoard(@RequestBody BoardDto board) throws Exception {
                                            //MultipartHttpServletRequest request) throws Exception {
        boardService.insertBoard(board, null);
        return ResponseEntity.ok("insert success");
    }

    
    @PutMapping("/update")
    public ResponseEntity<String> updateBoard(@ModelAttribute BoardDto board, 
                                            MultipartHttpServletRequest request) throws Exception {
        boardService.updateBoard(board, request);
        return ResponseEntity.ok("update success");
    }

    
    @DeleteMapping("/delete/{boardId}")
    public ResponseEntity<String> deleteBoard(@PathVariable("boardId") int boardId) throws Exception {
        boardService.deleteBoard(boardId);
        return ResponseEntity.ok("delete success");
    }
}
