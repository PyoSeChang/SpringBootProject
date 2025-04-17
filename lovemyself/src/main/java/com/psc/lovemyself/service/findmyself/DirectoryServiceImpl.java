package com.psc.lovemyself.service.findmyself;

import com.psc.lovemyself.domain.directory.Directory;
import com.psc.lovemyself.dto.findmyself.directory.DirectorySavePayload;
import com.psc.lovemyself.repository.findmyself.DirectoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DirectoryServiceImpl implements DirectoryService {

    private final DirectoryRepository directoryRepository;

    /**
     * priority가 null인 경우 0.0으로 간주하여 비교하는 Comparator
     */
    private static final Comparator<Directory> PRIORITY_COMPARATOR =
            Comparator.comparingDouble(d -> d.getPriority() != null ? d.getPriority() : 0.0);

    @Override
    public void saveDirectories(DirectorySavePayload payload) {

        // 1. 삭제
        Optional.ofNullable(payload.getDeleted())
                .orElse(Collections.emptyList())
                .forEach(directoryRepository::deleteById);

        // 2. 수정
        Optional.ofNullable(payload.getUpdated())
                .orElse(Collections.emptyList())
                .forEach(dto -> directoryRepository.findById(dto.getId()).ifPresent(dir -> {
                    dir.setName(dto.getName());
                    dir.setPriority(dto.getPriority());
                    dir.setUsableCategory(dto.getCategories() != null
                            ? String.join(",", dto.getCategories())
                            : null);
                    dir.setDepth(dto.getDepth());
                    dir.setParentId(dto.getParentId());
                }));

        // 3. 생성 (tempId → realId 추적용 Map 생성)
        Map<Integer, Long> tempToRealIdMap = new HashMap<>();

        Optional.ofNullable(payload.getCreated())
                .orElse(Collections.emptyList())
                .forEach(dto -> {
                    Directory dir = new Directory();
                    dir.setName(dto.getName());
                    dir.setPriority(dto.getPriority());
                    dir.setUsableCategory(dto.getCategories() != null
                            ? String.join(",", dto.getCategories())
                            : null);
                    dir.setDepth(dto.getDepth());

                    // ✅ parentId 변환 처리
                    if (dto.getParentId() != null && dto.getParentId() < 0) {
                        Long realParentId = tempToRealIdMap.get(dto.getParentId());
                        if (realParentId == null) {
                            throw new IllegalStateException("부모 tempId가 아직 매핑되지 않았습니다: " + dto.getParentId());
                        }
                        dir.setParentId(realParentId);
                    } else {
                        dir.setParentId(dto.getParentId() != null ? dto.getParentId() : 0L);
                    }

                    directoryRepository.save(dir);

                    // ✅ tempId → realId 매핑 저장
                    tempToRealIdMap.put(dto.getTempId(), dir.getId());
                });
    }
    @Override
    @Transactional(readOnly = true)
    public List<Directory> getFlattenedDirectoryList() {
        List<Directory> all = directoryRepository.findAll();

        // id → 자식 목록 맵핑 (entity에 children 필드 불필요)
        Map<Long, List<Directory>> childrenMap = new HashMap<>();
        for (Directory dir : all) {
            childrenMap.put(dir.getId(), new ArrayList<>());
        }

        // 자식 할당
        for (Directory dir : all) {
            Long pid = dir.getParentId();
            if (pid != null && pid > 0 && childrenMap.containsKey(pid)) {
                childrenMap.get(pid).add(dir);
            }
        }

        // 루트 추출 및 정렬
        List<Directory> roots = all.stream()
                .filter(d -> d.getParentId() == null || d.getParentId() <= 0)
                .sorted(PRIORITY_COMPARATOR)
                .collect(Collectors.toList());

        // DFS로 재귀 탐색하며 depth 세팅 및 평탄화
        List<Directory> result = new ArrayList<>();
        for (Directory root : roots) {
            traverse(root, 0, childrenMap, result);
        }
        return result;
    }

    private void traverse(Directory dir,
                          int depth,
                          Map<Long, List<Directory>> childrenMap,
                          List<Directory> out) {
        dir.setDepth(depth);
        out.add(dir);

        List<Directory> children = childrenMap.get(dir.getId());
        if (children == null || children.isEmpty()) return;

        // 우선순위 정렬 후 재귀
        children.sort(PRIORITY_COMPARATOR);
        for (Directory child : children) {
            traverse(child, depth + 1, childrenMap, out);
        }
    }
}
