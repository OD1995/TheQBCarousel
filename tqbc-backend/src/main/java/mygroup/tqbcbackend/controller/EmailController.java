package mygroup.tqbcbackend.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.base.Charsets;
import com.google.common.io.Files;

import mygroup.tqbcbackend.model.EmailSubscriptionType;
import mygroup.tqbcbackend.repository.EmailSubscriptionTypeRepository;
import mygroup.tqbcbackend.service.EmailBuilderService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/emails")
public class EmailController {
    
    @Autowired
    private EmailSubscriptionTypeRepository emailSubscriptionTypeRepository;
    
    @Autowired
    private EmailBuilderService emailBuilderService;

    @GetMapping("/get-email-subscription-types")
    public List<EmailSubscriptionType> getEmailSubscriptionTypes() {
        return emailSubscriptionTypeRepository.findAll();
    }

    @GetMapping("/send-email")
    public void sendEmail() {
        emailBuilderService.sendReminderEmail(
            1,
            "OliD",
            "first",
            "2023",
            "http://localhost:8081/qb-predictions",
            "100",
            "KO of the 2022 Regular Season opener",
            "7.20pm (US Eastern Time) on 9th September 2022",
            "http://localhost:8081/qb-predictions"
        );
    }

    @GetMapping("/get-email-subscription-type-template")
    public String getEmailSubscriptionTypeTemplate(long emailSubscriptionTypeID) {
        return emailBuilderService.getEmailSubscriptionTypeTemplate(emailSubscriptionTypeID);
    }
}
