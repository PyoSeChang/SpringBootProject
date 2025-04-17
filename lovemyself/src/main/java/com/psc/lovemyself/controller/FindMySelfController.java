package com.psc.lovemyself.controller;

import com.psc.lovemyself.domain.directory.Directory;
import com.psc.lovemyself.dto.findmyself.CognitionDTO;
import com.psc.lovemyself.dto.findmyself.ConnectionDTO;
import com.psc.lovemyself.dto.findmyself.directory.DirectoryDTO;
import com.psc.lovemyself.dto.findmyself.directory.DirectorySavePayload;
import com.psc.lovemyself.service.findmyself.DirectoryService;
import com.psc.lovemyself.service.findmyself.FindMySelfService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/find")
public class FindMySelfController {

    private final FindMySelfService findMySelfService;
    private final DirectoryService directoryService;
    @PostMapping("write")
    public void save(@RequestBody CognitionDTO dto) {

        System.out.println("Connections: "+dto.getConnections());
        System.out.println("Connections: "+dto.getConnections());
        System.out.println("Connections: "+dto.getConnections());
        System.out.println("Connections: "+dto.getConnections());
        findMySelfService.saveCognition(dto);
    }

    @GetMapping("/view")
    public List<DirectoryDTO> view() {
        List<Directory> dirs = directoryService.getFlattenedDirectoryList();
        return dirs.stream()
                .map(d -> new DirectoryDTO(
                        d.getId(),
                        d.getName(),
                        d.getDepth(),
                        d.getParentId(),
                        d.getPriority()
                ))
                .collect(Collectors.toList());
    }

    @PostMapping("/directories/update")
    public ResponseEntity<Void> saveDirectories(@RequestBody DirectorySavePayload payload) {
        directoryService.saveDirectories(payload);
        return ResponseEntity.ok().build();
    }
}
