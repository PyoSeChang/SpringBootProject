package com.psc.lovemyself.domain.findmyself.experience;

import com.psc.lovemyself.domain.findmyself.enums.Category;
import com.psc.lovemyself.dto.findmyself.CognitionDTO;
import jakarta.persistence.Entity;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor

public class Project extends Experience {

    @Builder
    public Project(String title, String content, LocalDate startDate, LocalDate endDate) {
        super.setCategory(Category.PROJECT);
        super.setTitle(title);
        super.setContent(content);
        super.setStartDate(startDate);
        super.setEndDate(endDate);
    }

    public Project(CognitionDTO dto) {
        super(dto); // 부모 클래스(Experience)에서 공통 필드 처리
        // Review 전용 필드가 있다면 여기서 추가
    }
}
