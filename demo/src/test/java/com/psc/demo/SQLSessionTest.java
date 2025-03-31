package com.psc.demo;

import com.psc.demo.dto.BoardDTO;
import com.psc.demo.mapper.BoardMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SQLSessionTest {

    @Autowired
    private BoardMapper boardMapper;

    @Test
    void insertTest() {
        BoardDTO dto = new BoardDTO("테스트 제목", "세창", "이건 테스트입니다!");
        boardMapper.insertBoard(dto);
    }
}