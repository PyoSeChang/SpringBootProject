package com.psc.demo.dao;

import com.psc.demo.dto.BoardDTO;

import java.util.List;

public interface BoardDAO {
    List<BoardDTO> searchAllBoard();
}
