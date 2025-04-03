package com.psc.lms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {

    @GetMapping("/layout-test")
    public String testLayout() {
        return "layout/layout";
    }

    @GetMapping("/test-style")
    public String testStyle() {
        return "section/test-style";
    }
}