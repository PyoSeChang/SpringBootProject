package com.psc.demo;

import com.psc.demo.dto.BoardDTO;
import com.psc.demo.mapper.BoardMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class SQLSessionTest {

    @Autowired
    private BoardMapper boardMapper;

    @Test
    void insertBoardTest() {
        BoardDTO dto = new BoardDTO("테스트 제목", "세창", "이건 테스트입니다!");
        boardMapper.insertBoard(dto);
    }
    @Test
    void selectAllTest() {
        List<BoardDTO> blist = boardMapper.selectAll();
        for (BoardDTO dto : blist) {
            System.out.println(dto);
        }
    }

    @Test
    void selectBoardByNumTest() {
        int testBno = 1;
        BoardDTO board = boardMapper.selectBoardByNum(testBno);
        System.out.println("조회된 게시글 제목: " + board.getTitle());
    }

    @Test
    void updateBoardTest() {
        BoardDTO dto = new BoardDTO();
        dto.setBno(1); // 수정할 게시글 번호
        dto.setTitle("수정된 제목");
        dto.setAuthor("세창 수정자");
        dto.setContent("수정된 내용입니다!");

        boardMapper.updateBoard(dto);

        // 검증: 다시 불러와서 수정 내용이 반영됐는지 확인
        BoardDTO updatedBoard = boardMapper.selectBoardByNum(dto.getBno());

        assertEquals("수정된 제목", updatedBoard.getTitle());
        assertEquals("세창 수정자", updatedBoard.getAuthor());
        assertEquals("수정된 내용입니다!", updatedBoard.getContent());

    }


}