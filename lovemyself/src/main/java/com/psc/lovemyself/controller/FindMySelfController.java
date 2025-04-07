package com.psc.lovemyself.controller;

import com.psc.lovemyself.dto.findmyself.CognitionDTO;
import com.psc.lovemyself.service.findmyself.FindMySelfService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/find")
public class FindMySelfController {

    private final FindMySelfService findMySelfService;

    @PostMapping("write")
    public String save(CognitionDTO dto) {
        System.out.println("Cognition Type: "+dto.getCognitionType());
        System.out.println("Cognition Type: "+dto.getCognitionType());
        System.out.println("Cognition Type: "+dto.getCognitionType());
        findMySelfService.saveCognition(dto);

        return "section/find";
    }
}
