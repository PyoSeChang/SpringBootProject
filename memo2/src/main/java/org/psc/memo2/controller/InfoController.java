package org.psc.memo2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class InfoController {
    @GetMapping("/info")
    public String getInto() {
        return "info";
    }
}
