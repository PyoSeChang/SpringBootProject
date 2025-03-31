package com.psc.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data                   // @Getter, @Setter, @ToString 등 자동 생성
@NoArgsConstructor      // 기본 생성자 자동 생성
@AllArgsConstructor     // 모든 필드 포함 생성자 자동 생성
public class BoardDTO {
    private int bno;
    private String title;
    private String author;
    private String content;
    private String postdate;
    private int readcount;

    public BoardDTO(String title, String author, String content) {
        this.title = title;
        this.author = author;
        this.content = content;
    }
}
