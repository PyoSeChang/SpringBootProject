package com.psc.lovemyself.domain.findmyself;

import com.psc.lovemyself.dto.findmyself.CognitionDTO;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("Model")
public class Model extends Cognition {
    public Model(CognitionDTO dto) {
        super(dto);
    }
}
