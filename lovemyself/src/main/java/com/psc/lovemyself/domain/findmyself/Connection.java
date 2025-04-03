package com.psc.lovemyself.domain.findmyself;

import com.psc.lovemyself.domain.findmyself.enums.Category;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Connection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long fromId;

    @Column(nullable = false)
    private Long toId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category fromCategory;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category toCategory;

    @Column(nullable = true, length = 100)
    private String view;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "connection_type_id", nullable = false)
    private ConnectionType connectionType;
}


