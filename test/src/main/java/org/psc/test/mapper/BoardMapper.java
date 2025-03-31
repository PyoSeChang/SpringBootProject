package org.psc.test.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.psc.test.dto.BoardDTO;

import java.util.List;

@Mapper
public interface BoardMapper {
    List<BoardDTO> selectAll();
    void insertBoard(BoardDTO board);

}
