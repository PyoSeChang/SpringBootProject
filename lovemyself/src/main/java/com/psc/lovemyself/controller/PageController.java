package com.psc.lovemyself.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/find")
    public String find() {
        return "section/find";
    }

    @GetMapping("/dream")
    public String dream() {
        return "section/dream";
    }

    @GetMapping("/bloom")
    public String bloom() {
        return "section/bloom";
    }

    @GetMapping("/test-style")
    public String testStyle() {
        return "section/test-style";
    }
}
