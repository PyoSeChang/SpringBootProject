package com.psc.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data                   // @Getter, @Setter, @ToString 등 자동 생성
@NoArgsConstructor      // 기본 생성자 자동 생성
@AllArgsConstructor     // 모든 필드 포함 생성자 자동 생성
public class BoardDTO {
    private String title;
    private String author;
    private String content;
}
