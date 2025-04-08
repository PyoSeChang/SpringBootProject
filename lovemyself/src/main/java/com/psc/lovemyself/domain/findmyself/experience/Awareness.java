package com.psc.lovemyself.domain.findmyself.experience;

import com.psc.lovemyself.domain.findmyself.enums.Category;
import com.psc.lovemyself.dto.findmyself.CognitionDTO;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("AWARENESS")
public class Awareness extends Experience {

    @Builder
    public Awareness(String title, String content, LocalDate startDate, LocalDate endDate) {
        super.setCategory(Category.AWARENESS);
        super.setTitle(title);
        super.setContent(content);
        super.setStartDate(startDate);
        super.setEndDate(endDate);
    }

    public Awareness(CognitionDTO dto) {
        super(dto); // 부모 클래스(Experience)에서 공통 필드 처리
        // Review 전용 필드가 있다면 여기서 추가
    }
}
