package com.psc.lovemyself.dto.findmyself.directory;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UpdateDirectoryDTO {
    private Long id;
    private String name;
    private Double priority;
    private List<String> categories;
}

