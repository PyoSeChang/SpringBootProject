package com.psc.lovemyself.domain.directory;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Directory {

    @Id @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String name;

    private Double priority;

    private int depth;

    private Long parentId;

    @Column(length = 255)
    private String usableCategory;
}
