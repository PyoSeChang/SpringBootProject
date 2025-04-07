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
public class ConnectionType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 어떤 카테고리에서 사용 가능한 타입인지 (nullable)
    @Enumerated(EnumType.STRING)
    private Category usableCategory;

    // 연결 타입 이름 (예: REFERENCE, SUPPORTS, CONTRAST 등)
    @Column(nullable = false, unique = true, length = 50)
    private String connectionType;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isDirectional = false; // 🔥 기본값 fals

    // 선택: 설명 필드
    private String description;
}
