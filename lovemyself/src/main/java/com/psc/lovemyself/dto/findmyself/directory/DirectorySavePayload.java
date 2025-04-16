package com.psc.lovemyself.dto.findmyself.directory;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class DirectorySavePayload {
    private List<CreateDirectoryDTO> created;
    private List<UpdateDirectoryDTO> updated;
    private List<Long> deleted;
}

