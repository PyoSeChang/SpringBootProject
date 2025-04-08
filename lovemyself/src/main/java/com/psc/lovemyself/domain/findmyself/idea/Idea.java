package com.psc.lovemyself.domain.findmyself.idea;

import com.psc.lovemyself.domain.findmyself.Cognition;
import com.psc.lovemyself.domain.findmyself.enums.Category;
import com.psc.lovemyself.dto.findmyself.CognitionDTO;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@DiscriminatorValue("EXPERIENCE")
public abstract class Idea extends Cognition {


    public Idea(CognitionDTO dto) {
        super(dto);
    }
}

