package com.psc.lovemyself.domain.findmyself.experience;

import com.psc.lovemyself.domain.findmyself.enums.Category;
import jakarta.persistence.Entity;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor

public class Project extends Experience {

    @Builder
    public Project(String title, String content, Timestamp startDate, Timestamp endDate) {
        super.setCategory(Category.PROJECT);
        super.setTitle(title);
        super.setContent(content);
        super.setStartDate(startDate);
        super.setEndDate(endDate);
    }
}
