package com.psc.lovemyself.service.findmyself;

import com.psc.lovemyself.domain.directory.Directory;
import com.psc.lovemyself.dto.findmyself.directory.CreateDirectoryDTO;
import com.psc.lovemyself.dto.findmyself.directory.DirectorySavePayload;
import com.psc.lovemyself.dto.findmyself.directory.UpdateDirectoryDTO;
import com.psc.lovemyself.repository.findmyself.DirectoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Service // ✅ 스프링 서비스 등록
@RequiredArgsConstructor // ✅ 생성자 주입 (final 필드 자동 주입)
@Transactional // ✅ 메서드 전체 트랜잭션 처리
public class DirectoryServiceImpl implements DirectoryService {

    private final DirectoryRepository directoryRepository;

    @Override
    public void saveDirectories(DirectorySavePayload payload) {
        List<CreateDirectoryDTO> created = payload.getCreated();
        List<UpdateDirectoryDTO> updated = payload.getUpdated();
        List<Integer> deleted = payload.getDeleted();

        processDeleted(deleted);
        processUpdated(updated);
        processCreated(created);
    }

    @Override
    public void processDeleted(List<Integer> deleted) {
        if (deleted == null) return;

        for (Integer id : deleted) {
            directoryRepository.deleteById(id);
        }
    }

    @Override
    public void processUpdated(List<UpdateDirectoryDTO> updated) {
        if (updated == null) return;

        for (UpdateDirectoryDTO dto : updated) {
            directoryRepository.findById(dto.getId()).ifPresent(dir -> {
                dir.setName(dto.getName());
                dir.setPriority(dto.getPriority());
                dir.setUsableCategory(dto.getCategories() != null
                        ? String.join(",", dto.getCategories())
                        : null);
            });
        }
    }

    @Override
    public void processCreated(List<CreateDirectoryDTO> created) {
        if (created == null) return;

        for (CreateDirectoryDTO dto : created) {
            Directory dir = new Directory();
            dir.setName(dto.getName());
            dir.setPriority(dto.getPriority());
            dir.setParentId(dto.getParentId() != null ? dto.getParentId() : 0);
            dir.setUsableCategory(dto.getCategories() != null
                    ? String.join(",", dto.getCategories())
                    : null);
            dir.setDepth(0); // TODO: 필요 시 계산

            directoryRepository.save(dir);
        }
    }
}
