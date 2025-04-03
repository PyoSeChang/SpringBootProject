package com.psc.lovemyself.domain.findmyself.experience;

import com.psc.lovemyself.domain.findmyself.enums.Category;
import jakarta.persistence.Entity;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor

public class Review extends Experience {

    @Builder
    public Review(String title, String content, Timestamp startDate, Timestamp endDate) {
        super.setCategory(Category.REVIEW);
        super.setTitle(title);
        super.setContent(content);
        super.setStartDate(startDate);
        super.setEndDate(endDate);
    }
}
