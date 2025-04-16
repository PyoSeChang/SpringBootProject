package com.psc.lovemyself.dto.findmyself.directory;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateDirectoryDTO {
    private Long tempId;
    private String name;
    private Long parentId;
    private Double priority;
    private List<String> categories;
}
