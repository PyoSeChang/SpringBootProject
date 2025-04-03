package com.psc.lms.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/dream")
public class DreamMySelfController {
    @GetMapping("")
    public String dream() {
        return "section/dream";
    }
}
