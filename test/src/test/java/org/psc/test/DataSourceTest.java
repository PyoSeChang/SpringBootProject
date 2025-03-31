package org.psc.test;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.psc.test.dto.BoardDTO;
import org.psc.test.mapper.BoardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@SpringBootTest
@Log4j2
public class DataSourceTest {
    @Autowired
    private DataSource dataSource;
    @Autowired
    private BoardMapper boardMapper;

    @Test
    public void testDataSource() throws SQLException {
        Connection conn=dataSource.getConnection();
        log.info(conn);
        System.out.println(conn);
        conn.close();

    }
    @Test
    public void insertTest() throws SQLException {
        BoardDTO dto = new BoardDTO();
        dto.setAuthor("author");
        dto.setTitle("title");
        dto.setContent("content");
        boardMapper.insertBoard(dto);
    }
}
