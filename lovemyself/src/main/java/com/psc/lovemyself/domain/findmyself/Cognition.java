package com.psc.lovemyself.domain.findmyself;

import com.psc.lovemyself.domain.findmyself.enums.Category;
import com.psc.lovemyself.domain.findmyself.enums.CognitionType;
import com.psc.lovemyself.dto.findmyself.CognitionDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "dtype")
public abstract class Cognition {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "cognition_gen")
    @TableGenerator(name = "cognition_gen", table = "id_generator", pkColumnName = "gen_name", valueColumnName = "gen_val", pkColumnValue = "cognition_id", allocationSize = 1)
    private Long id;


    @Column(nullable = false, length = 200)
    private String title;

    @Lob
    @Column(nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Category category;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false, updatable = false)
    private Timestamp createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = Timestamp.valueOf(LocalDateTime.now());
    }

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private CognitionType cognitionType;

    private Long location;

    public Cognition(CognitionDTO dto) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.category = dto.getCategory();
        this.startDate = dto.getStartDate();
        this.endDate = dto.getEndDate();
    }
}

