package com.psc.lovemyself.dto.findmyself;

import com.psc.lovemyself.domain.findmyself.*;
import com.psc.lovemyself.domain.findmyself.enums.Category;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ConnectionDTO {

    // --- 필수: 도착 Cognition 정보 ---
    private Long toId;
    private Category toCategory;

    // --- 필수: 연결 타입 정보 (by name로 조회해서 매핑) ---
    private String connectionTypeName;

    // --- 필수: 관점(View) 정보 (by name로 조회해서 매핑) ---
    private String viewName;

    // --- 선택: View 또는 Type이 없을 경우 새로 만들기 위한 필드들 ---
    private String typeDescription;      // ConnectionType 설명
    private Category usableCategory;     // ConnectionType 사용 가능 범주
    private Boolean isDirectional = false;

    private String viewDescription;      // 관점 설명
    private Long viewFromId;             // 관점이 시작되는 Cognition
    private Category viewFromCategory;


    public ConnectionType toConnectionTypeEntity() {
        return ConnectionType.builder()
                .connectionType(this.connectionTypeName)
                .description(this.typeDescription)
                .isDirectional(this.isDirectional != null ? this.isDirectional : false)
                .build();
    }


    public ConnectionView toViewEntity(Cognition cognition) {
        return ConnectionView.builder()
                .fromId(cognition.getId())
                .fromCategory(cognition.getCategory())
                .name(this.viewName)
                .description(this.viewDescription)
                .build();
    }


    public Connection toEntity(Long fromId, Category fromCategory, ConnectionType type, ConnectionView view) {
        return Connection.builder()
                .fromId(fromId)
                .fromCategory(fromCategory)
                .toId(this.toId)
                .toCategory(this.toCategory)
                .connectionType(type)
                .view(view)
                .build();
    }

}
