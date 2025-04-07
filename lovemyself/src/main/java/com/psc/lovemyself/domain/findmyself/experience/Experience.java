package com.psc.lovemyself.domain.findmyself.experience;

import com.psc.lovemyself.dto.findmyself.CognitionDTO;
import jakarta.persistence.*;
import lombok.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import com.psc.lovemyself.domain.findmyself.enums.Category;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Getter
@Setter
@NoArgsConstructor
public abstract class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category; // REVIEW, EVENT, ...

    private String title;
    private String content;

    private LocalDate startDate;
    private LocalDate endDate;

    private Timestamp createdAt;

    @PrePersist
    protected void onCreate() {
        Timestamp now = Timestamp.valueOf(LocalDateTime.now());
        this.createdAt = now;
    }


    public Experience(CognitionDTO dto) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.category = dto.getCategory();
        this.startDate = dto.getStartDate();
        this.endDate = dto.getEndDate();
    }
}
