package com.psc.lovemyself.domain.findmyself.idea;

import com.psc.lovemyself.dto.findmyself.CognitionDTO;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@DiscriminatorValue("INSIGHT")
public class Insight extends Idea {
    public Insight(CognitionDTO dto) {
        super(dto); // 부모 클래스(Experience)에서 공통 필드 처리
        // Review 전용 필드가 있다면 여기서 추가
    }
}
