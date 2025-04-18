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

    // 출발 Cognition
    @Column(nullable = false)
    private Long fromId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category fromCategory;

    // 도착 Cognition
    @Column(nullable = false)
    private Long toId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category toCategory;

    // 연결의 의미
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private ConnectionType connectionType;

    // 관점 (연결 그룹)
    @ManyToOne(fetch = FetchType.LAZY)
    private ConnectionView view;
}
