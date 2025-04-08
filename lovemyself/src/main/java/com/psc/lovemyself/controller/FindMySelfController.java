package com.psc.lovemyself.controller;

import com.psc.lovemyself.dto.findmyself.CognitionDTO;
import com.psc.lovemyself.dto.findmyself.ConnectionDTO;
import com.psc.lovemyself.service.findmyself.FindMySelfService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/find")
public class FindMySelfController {

    private final FindMySelfService findMySelfService;

    @PostMapping("write")
    public void save(@RequestBody CognitionDTO dto) {

        System.out.println("Connections: "+dto.getConnections());
        System.out.println("Connections: "+dto.getConnections());
        System.out.println("Connections: "+dto.getConnections());
        System.out.println("Connections: "+dto.getConnections());
        findMySelfService.saveCognition(dto);
    }
}
