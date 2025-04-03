package com.psc.lovemyself.domain.findmyself.idea;

import com.psc.lovemyself.domain.findmyself.enums.Category;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public abstract class Idea {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    private String title;
    private String content;

    private Timestamp createdAt;

    @PrePersist
    protected void onCreate() {
        Timestamp now = Timestamp.valueOf(LocalDateTime.now());
        this.createdAt = now;
    }

    @Entity
    @Getter
    @Setter
    @NoArgsConstructor
    @SuperBuilder
    public static class Study extends Idea {
    }
}

