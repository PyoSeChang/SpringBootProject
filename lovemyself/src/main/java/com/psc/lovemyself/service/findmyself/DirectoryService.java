package com.psc.lovemyself.service.findmyself;

import com.psc.lovemyself.dto.findmyself.directory.CreateDirectoryDTO;
import com.psc.lovemyself.dto.findmyself.directory.DirectorySavePayload;
import com.psc.lovemyself.dto.findmyself.directory.UpdateDirectoryDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DirectoryService {
    void saveDirectories(DirectorySavePayload payload); // 전체 저장 단위

    void processCreated(List<CreateDirectoryDTO> created); // 생성 처리
    void processUpdated(List<UpdateDirectoryDTO> updated); // 수정 처리
    void processDeleted(List<Integer> deleted);
}
