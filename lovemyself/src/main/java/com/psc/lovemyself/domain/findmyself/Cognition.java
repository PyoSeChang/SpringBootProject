package com.psc.lovemyself.domain.findmyself;

import com.psc.lovemyself.domain.findmyself.enums.Category;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDate;
@Getter
@Setter
public class Cognition {
    Long id;
    String title;
    String content;
    Category category;
    LocalDate startDate;
    LocalDate endDate;
    Timestamp createdAt;
}
