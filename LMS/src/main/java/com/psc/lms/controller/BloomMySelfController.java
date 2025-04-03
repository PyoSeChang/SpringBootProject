package com.psc.lms.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/bloom")
public class BloomMySelfController {
    @GetMapping("")
    public String bloom() {
        return "section/bloom";
    }
}
