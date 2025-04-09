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
    private String toCategory;

    // --- 필수: 관점(View) 정보 (by name로 조회해서 매핑) ---
    private String viewName;
    private Long viewFromId;             // 관점이 시작되는 Cognition
    private String viewFromCategory;
    private Long viewToId;
    private String viewToCategory;

    // --- 연결 타입 정보 (by name로 조회해서 매핑) ---
    private String connectionTypeName;
    private String usableCategory;     // ConnectionType 사용 가능 범주
    private Boolean isDirectional = false;
    private String typeDescription;      // ConnectionType 설명

    public ConnectionType toConnectionTypeEntity() {
        return ConnectionType.builder()
                .connectionType(this.connectionTypeName)
                .description(this.typeDescription)
                .isDirectional(this.isDirectional != null ? this.isDirectional : false)
                .usableCategory(
                        usableCategory == null || usableCategory.isBlank()
                                ? null
                                : Category.valueOf(usableCategory))
                .build();
    }


    public ConnectionView toViewEntity(Cognition cognition) {
        return ConnectionView.builder()
                .fromId(cognition.getId())
                .fromCategory(cognition.getCategory())
                .toId(this.toId)
                .toCategory(
                        toCategory == null || toCategory.isBlank()
                                ? null
                                : Category.valueOf(toCategory))
                .name(this.viewName)
                .build();
    }


    public Connection toEntity(Long fromId, Category fromCategory, ConnectionType type, ConnectionView view) {
        return Connection.builder()
                .fromId(fromId)
                .fromCategory(fromCategory)
                .toId(this.toId)
                .toCategory(
                        toCategory == null || toCategory.isBlank()
                                ? null
                                : Category.valueOf(toCategory))
                .connectionType(type)
                .view(view)
                .build();
    }

}
