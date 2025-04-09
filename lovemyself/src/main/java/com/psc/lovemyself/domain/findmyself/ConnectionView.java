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
public class ConnectionView {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 이 관점이 시작되는 Cognition 객체의 정보 (작성 중인 Cognition 객체)
    @Column(nullable = false)
    private Long fromId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category fromCategory;

    // 이 관점이 시작되는 Cognition 객체의 정보
    @Column(nullable = false)
    private Long toId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category toCategory;

    // 사용자 정의 관점 이름
    @Column(nullable = false, length = 100)
    private String name;

    // 선택: 관점 설명
    private String description;
}
