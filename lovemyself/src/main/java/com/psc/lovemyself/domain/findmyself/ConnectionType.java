package com.psc.lovemyself.domain.findmyself;

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

    @Column(nullable = false, unique = true)
    private String name;         // ex: "CAUSE", "RESULT", "유사", "반복"

    private String description;  // ex: "원인 관계", "결과를 이끈다" 등

    @Column(nullable = true)
    private String colorCode;    // UI용 (ex: "#FFD700"), 지금은 optional
}
