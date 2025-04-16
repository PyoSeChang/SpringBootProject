package com.psc.lovemyself.domain.findmyself.idea;

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
public class Model extends Idea {
    public Model(CognitionDTO dto) {
        super(dto);
    }
}
