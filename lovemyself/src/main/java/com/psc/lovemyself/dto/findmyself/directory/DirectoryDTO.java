package com.psc.lovemyself.dto.findmyself.directory;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DirectoryDTO {
    private Long id;
    private String name;
    private Integer depth;
    private Long parentId;
    private Double priority;
}
