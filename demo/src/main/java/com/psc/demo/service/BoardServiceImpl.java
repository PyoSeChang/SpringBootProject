package com.psc.demo.service;

import com.psc.demo.dao.BoardDAO;
import com.psc.demo.dao.BoardDAOImpl;
import com.psc.demo.dto.BoardDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    private final BoardDAOImpl boardDAO;
    @Override // 전체 조회
    public List<BoardDTO> getList() {
        return boardDAO.searchAllBoard();
    }

    @Override // 게시글 가져오기
    public BoardDTO getBoardByNum() {
        return null;
    }

    @Override // 게시글 삽입
    public void writeBoard(BoardDTO dto) {

    }

    @Override
    public void removeBoard(BoardDTO dto) {

    }

    @Override
    public void modifyBoard(BoardDTO dto) {

    }
}
