package com.psc.lovemyself.dto.findmyself.directory;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateDirectoryDTO {
    private Integer tempId;
    private String name;
    private Integer parentId;
    private Double priority;
    private int depth;
    private List<String> categories;
}
