package com.psc.lovemyself.domain.findmyself.experience;

import com.psc.lovemyself.domain.findmyself.Cognition;
import com.psc.lovemyself.dto.findmyself.CognitionDTO;
import jakarta.persistence.*;
import lombok.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import com.psc.lovemyself.domain.findmyself.enums.Category;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("EXPERIENCE")
public abstract class Experience extends Cognition {


    public Experience(CognitionDTO dto) {
        super(dto);
    }
}
