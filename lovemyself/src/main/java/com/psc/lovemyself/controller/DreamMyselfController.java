package com.psc.lovemyself.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/dream")
public class DreamMyselfController {
    @GetMapping("")
    public String dream() {
        return "section/dream";
    }
}
