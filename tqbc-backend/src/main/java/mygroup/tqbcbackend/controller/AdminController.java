package mygroup.tqbcbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.service.EmailBuilderService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    @Autowired
    EmailBuilderService emailBuilderService;
    
    @GetMapping("/hbd-lr")
    private boolean checkAnswer(String answer) {
        emailBuilderService.sendEmail(
            "oliverdernie1@googlemail.com",
            "HBD LR Guess",
            answer,
            false
        );
        return answer.toLowerCase().equals("glovebox");
    }
}
