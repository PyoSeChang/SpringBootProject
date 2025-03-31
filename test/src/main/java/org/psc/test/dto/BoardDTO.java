package org.psc.test.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardDTO {
    private int bnum;
    private String title;
    private String content;
    private String author;
    private String postdate;
    private int readcount;
}
