package com.psc.lovemyself.domain.directory;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Directory {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private Double priority;

    private int depth;

    private Long parentId;

    @Column(length = 255)
    private String usableCategory;
}
