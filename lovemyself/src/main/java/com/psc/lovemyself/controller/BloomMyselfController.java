package com.psc.lovemyself.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/bloom")
public class BloomMyselfController {
    @GetMapping("")
    public String bloom() {
        return "section/bloom";
    }
}
