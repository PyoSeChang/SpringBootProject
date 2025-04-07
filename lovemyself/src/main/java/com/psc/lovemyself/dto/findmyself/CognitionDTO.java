package com.psc.lovemyself.dto.findmyself;

import com.psc.lovemyself.domain.findmyself.Connection;
import com.psc.lovemyself.domain.findmyself.enums.Category;
import com.psc.lovemyself.domain.findmyself.enums.CognitionType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class CognitionDTO {
    private String title;
    private String content;
    private Category category;  // 카테고리 (Review, Event, etc.)
    private LocalDate startDate;
    private LocalDate endDate;
    private CognitionType cognitionType;
    private List<Connection> connections;
}
