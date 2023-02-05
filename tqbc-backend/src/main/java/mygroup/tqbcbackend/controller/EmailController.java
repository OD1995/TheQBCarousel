package mygroup.tqbcbackend.controller;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.mail.Message;
import javax.management.RuntimeErrorException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.autoconfigure.metrics.export.wavefront.WavefrontProperties.Sender;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.base.Charsets;
import com.google.common.io.Files;

import mygroup.tqbcbackend.model.ConfirmationToken;
import mygroup.tqbcbackend.model.EEmailType;
import mygroup.tqbcbackend.model.EmailHistory;
import mygroup.tqbcbackend.model.EmailSubscription;
import mygroup.tqbcbackend.model.EmailTemplate;
import mygroup.tqbcbackend.model.EmailType;
import mygroup.tqbcbackend.model.User;
import mygroup.tqbcbackend.payload.request.PasswordResetRequest;
import mygroup.tqbcbackend.payload.request.SendEmailRequest;
import mygroup.tqbcbackend.payload.request.UnsubscribeRequest;
import mygroup.tqbcbackend.payload.response.SendOutQueuedEmailsResponse;
import mygroup.tqbcbackend.repository.ConfirmationTokenRepository;
import mygroup.tqbcbackend.repository.EmailHistoryRepository;
import mygroup.tqbcbackend.repository.EmailSubscriptionRepository;
import mygroup.tqbcbackend.repository.EmailTemplateRepository;
import mygroup.tqbcbackend.repository.EmailTypeRepository;
import mygroup.tqbcbackend.repository.UserRepository;
import mygroup.tqbcbackend.service.EmailBuilderService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/emails")
public class EmailController {
    
    @Autowired
    private EmailTypeRepository emailTypeRepository;
    
    @Autowired
    private EmailBuilderService emailBuilderService;
    
    @Value("${spring.mail.username}")
	private String fromEmailAddress;

    @Autowired
    private EmailSubscriptionRepository emailSubscriptionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailHistoryRepository emailHistoryRepository;

    @Autowired
    private EmailTemplateRepository emailTemplateRepository;

    @GetMapping("/get-email-subscription-types")
    public List<EmailType> getEmailSubscriptionTypes() {
        return emailTypeRepository.findByIsSubscriptionTrue();
    }

    @PostMapping("/queue-email-to-all-subscribed-users")
    public int queueEmailToAllSubscribedUsers(
        @Valid @RequestBody SendEmailRequest sendEmailRequest
    ) {
        // Create new email template
        EmailType emailType = emailTypeRepository.findByEmailTypeID(
            sendEmailRequest.getEmailSubscriptionTypeID()
        );
        EmailTemplate emailTemplate = new EmailTemplate(
            sendEmailRequest.getEmailHtml(),
            "The QB Carousel - " + emailType.getEmailTypeTidy(),
            sendEmailRequest.getPredictionPeriodID(),
            emailType
        );
        emailTemplateRepository.saveAndFlush(emailTemplate);
        // Get all users to send email to
        List<EmailSubscription> emailSubscriptions = emailSubscriptionRepository.findByValueTrueAndEmailSubscriptionTypeID(
            sendEmailRequest.getEmailSubscriptionTypeID()
        );
        List<Long> userIDs = emailSubscriptionRepository.findUserIDsByValueTrueAndEmailSubscriptionTypeID(
            sendEmailRequest.getEmailSubscriptionTypeID()
        );
        List<User> users = userRepository.findByUserIDIn(userIDs);
        HashMap<Long,User> hm = new HashMap<Long,User>();
        for (User user : users) {
            hm.put(user.getUserID(), user);
        }
        // Create emailhistory row for each
        List<EmailHistory> emailHistoryRows = new ArrayList<EmailHistory>();
        for (EmailSubscription emailSubscription : emailSubscriptions) {
            User user = hm.get(
                emailSubscription.getEmailSubscriptionCompositeKey().getUserID()
            );
            EmailHistory emailHistory = new EmailHistory(
                user,
                user.getEmail(),
                emailTemplate
            );
            emailHistoryRows.add(emailHistory);
        }
        emailHistoryRepository.saveAll(emailHistoryRows);
        return emailHistoryRows.size();
    }

    @GetMapping("/get-email-subscription-type-template")
    public String getEmailSubscriptionTypeTemplate(long emailSubscriptionTypeID) {
        return emailBuilderService.getEmailSubscriptionTypeTemplate(emailSubscriptionTypeID);
    }

    @PostMapping("/send-email-just-to-me")
    public void sendEmailJustToMe(
        @Valid @RequestBody SendEmailRequest sendEmailRequest
    ) {
        emailBuilderService.sendEmail(
            "oliverdernie1@gmail.com",
            "Test " + System.currentTimeMillis(),
            sendEmailRequest.getEmailHtml(),
            false
        );
    }

    @PostMapping("/send-reported-issue-email")
    public void sendReportedIssueEmail (
        @Valid @RequestBody SendEmailRequest sendEmailRequest
    ) {
        String subject;
        if (sendEmailRequest.getUsername() != null) {
            subject = "Reported Issue From " + sendEmailRequest.getUsername();
        } else {
            subject = "Reported Issue From Non-User";
        }
        emailBuilderService.sendEmail(
            "theqbcarousel@gmail.com",
            subject,
            sendEmailRequest.getEmailHtml(),
                false
        );
    }

    @GetMapping("/get-total-unsent-emails-count")
    public int getTotalUnsentEmailsCount() {
        return emailHistoryRepository.countByEmailSentDateTimeUTCIsNull();
    }

    @GetMapping("/send-out-queued-emails")
    public SendOutQueuedEmailsResponse sendOutQueuedEmails() {
        // Get all unsent emails
        List<EmailHistory> emailsToSend = emailHistoryRepository.findByEmailSentDateTimeUTCIsNull();
        // Send them
        SendOutQueuedEmailsResponse r = emailBuilderService.bulkSendQueuedEmails(emailsToSend);
        return r;
    }

    @GetMapping("/get-email-subscription-type")
    public EmailType getEmailSubscriptionType(
        String emailSubscriptionType
    ) {
        EEmailType eEmailType = EEmailType.valueOf(emailSubscriptionType);
        return emailTypeRepository.findByEmailType(eEmailType);
    }

    @PostMapping("/unsubscribe-user")
    public ResponseEntity<?> unsubscribeUser(
        @Valid @RequestBody UnsubscribeRequest unsubscribeRequest
    ) {
        EmailSubscription emailSubscription = emailSubscriptionRepository.findByEmailSubscriptionCompositeKey_UserIDAndEmailSubscriptionCompositeKey_EmailSubscriptionTypeID(
            unsubscribeRequest.getUserID(),
            unsubscribeRequest.getEmailSubscriptionTypeID()
        );
        emailSubscription.setValue(false);
        emailSubscriptionRepository.save(emailSubscription);
        return ResponseEntity.ok().build();
    }
}
