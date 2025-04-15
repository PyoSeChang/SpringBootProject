package com.psc.lovemyself.domain.directory;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Directory {

    @Id @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String name;

    private Double order;

    private int depth;

    private Long parentId;
}
