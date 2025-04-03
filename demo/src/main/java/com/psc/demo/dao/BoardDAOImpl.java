package com.psc.demo.dao;

import com.psc.demo.dto.BoardDTO;
import com.psc.demo.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;


@Repository
@RequiredArgsConstructor
public class BoardDAOImpl implements BoardDAO {
    private final BoardMapper boardMapper;
    @Override
    public List<BoardDTO> searchAllBoard() {
        return boardMapper.selectAll();
    }
}
