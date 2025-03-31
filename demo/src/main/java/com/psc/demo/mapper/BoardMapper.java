package com.psc.demo.mapper;

import com.psc.demo.dto.BoardDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {

    // 게시글 전체 조회
    List<BoardDTO> selectAll();

    // 게시글 등록
    void insertBoard(BoardDTO dto);
}
