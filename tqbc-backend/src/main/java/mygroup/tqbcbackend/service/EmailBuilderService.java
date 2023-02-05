package mygroup.tqbcbackend.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.stream.IntStream;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.NoSuchProviderException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.MailMessage;
import org.springframework.stereotype.Service;

import com.google.common.base.Charsets;
import com.google.common.io.Files;

import io.micrometer.core.instrument.util.IOUtils;
import mygroup.tqbcbackend.model.ConfirmationToken;
import mygroup.tqbcbackend.model.EmailHistory;
import mygroup.tqbcbackend.model.EmailTemplate;
import mygroup.tqbcbackend.model.User;
import mygroup.tqbcbackend.payload.response.SendOutQueuedEmailsResponse;
import mygroup.tqbcbackend.repository.EmailHistoryRepository;
import mygroup.tqbcbackend.repository.EmailTemplateRepository;

@Service
public class EmailBuilderService {
    
    @Value("${spring.mail.username}")
	private String fromEmailAddress;
    
    @Autowired
	private EmailSenderService emailSenderService;

    @Autowired
    private JavaMailSender javaMailSender;	
	
	@Value("${tqdm.app.frontEndURL}")
	private String frontEndURL;

    @Value("${spring.mail.host}")
	private String host;

    @Value("${spring.mail.port}")
	private String port;

    @Value("${spring.mail.username}")
	private String username;

    @Value("${spring.mail.password}")
	private String password;

    @Autowired
    private EmailHistoryRepository emailHistoryRepository;

    @Autowired EmailTemplateRepository emailTemplateRepository;

    public void sendReminderEmail(
        long emailSubscriptionTypeID,
        String username,
        String ordinalPredictionPeriod,
        String predictionSeason,
        String qbPredictionsURL,
        String daysLeft,
        String toEvent,
        String toEventDateTimeET,
        String unsubscribeURL
    ) {
        // try {
            // MimeMessage message = javaMailSender.createMimeMessage();
            // MimeMessageHelper helper = new MimeMessageHelper(message);
            // helper.setTo("oliverdernie1@gmail.com");
            // Long unix = System.currentTimeMillis();
            // helper.setSubject("The QB Carousel - " + unix);
            // helper.setFrom(fromEmailAddress);
            // // mailMessage.setText(content,true);
            // helper.setText(content, true);
            // javaMailSender.send(helper.getMimeMessage());
        // } catch (MessagingException e) {
        //     Integer a = 1;
        // }
        String content = getEmailSubscriptionTypeTemplate(emailSubscriptionTypeID);
        content = doNonUsernameReplacements(
            content,
            ordinalPredictionPeriod,
            predictionSeason,
            qbPredictionsURL,
            daysLeft,
            toEvent,
            toEventDateTimeET
        );
        sendEmail(
            "oliverdernie1@gmail.com",
            "The QB Carousel - " + System.currentTimeMillis(),
            content,
            false
        );
    }


    public MimeMessage createMessage(
        String toEmailAddress,
        String subject,
        String htmlBody,
        Boolean bccMe
    ) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);
            helper.setTo(toEmailAddress);
            if (bccMe) {
                helper.setBcc(fromEmailAddress);
            }
            helper.setSubject(subject);
            helper.setFrom(fromEmailAddress);
            helper.setText(htmlBody, true);
            return helper.getMimeMessage();
        } catch (MessagingException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void sendEmail(
        String toEmailAddress,
        String subject,
        String htmlBody,
        Boolean bccMe
    ) {
        MimeMessage msg = createMessage(
            toEmailAddress,
            subject,
            htmlBody,
            bccMe
        );
        javaMailSender.send(msg);
    }

    private String doNonUsernameReplacements(
        String content,
        String ordinalPredictionPeriod,
        String predictionSeason,
        String qbPredictionsURL,
        String daysLeft,
        String toEvent,
        String toEventDateTimeET
    ) {
        content = content.replace("[ordinalPredictionPeriod]", ordinalPredictionPeriod);
        content = content.replace("[predictionSeason]", predictionSeason);
        content = content.replace("[daysLeft]", daysLeft);
        content = content.replace("[toEvent]", toEvent);
        content = content.replace("[toEventDateTimeET]", toEventDateTimeET);
        content = content.replace(
            "[qbPredictionsURL]",
            frontEndURL + "/qb-predictions"
        );
        return content;
    }

    public String getEmailSubscriptionTypeTemplate(long emailSubscriptionTypeID) {
        try {
            File file = new File(
                    "src/main/resources/emails/" + emailSubscriptionTypeID + ".html"
                    // Charsets.UTF_8
                );
            String content = Files.asCharSource(file, Charsets.UTF_8).read();
            return content;
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public SendOutQueuedEmailsResponse bulkSendQueuedEmails(
        List<EmailHistory> emailsToSend
    ) {
        Properties props = new Properties();
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.connectiontimeout", "50000");
        props.put("mail.smtp.writetimeout", "50000");
        props.put("mail.smtp.starttls.required", "true");
        props.put("mail.smtp.timeout", "50000");
        props.put("mail.transport.protocol", "smtp");
        Session session = Session.getInstance(props);
        List<String> errors = new ArrayList<String>();
        Integer emailsSentCount = 0;
        try {
            try (Transport t = session.getTransport()) {
                t.connect(
                    host,
                    Integer.parseInt(port),
                    username,
                    password
                );
                for (EmailHistory emailHistory : emailsToSend) {
                    try {
                        String emailBody = buildEmailBodyForUser(
                            emailHistory.getEmailTemplate().getEmailTemplate(),
                            emailHistory.getUser()
                        );
                        Message msg = createMessage(
                            emailHistory.getToEmailAddress(),
                            emailHistory.getEmailTemplate().getEmailSubject(),
                            emailBody,
                            false
                        );
                        // Maybe comment out the line below
                        // msg.saveChanges();
                        t.sendMessage(msg, msg.getAllRecipients());
                        emailHistory.setEmailSentDateTimeUTC(Instant.now());
                        emailHistoryRepository.save(emailHistory);
                        emailsSentCount += 1;
                    } catch (MessagingException e) {
                        errors.add(e.getMessage());
                    }
                }
            }
        } catch (MessagingException  e) {
            // throw new RuntimeException(e.getMessage());
            errors.add(e.getMessage());
        }
        return new SendOutQueuedEmailsResponse(emailsSentCount, errors);
    }

    private String buildEmailBodyForUser(
        String emailTemplate,
        User user
    ) {
        String S = emailTemplate;
        S = S.replace("[username]", user.getUsername());
        return S;
    }

    public void sendNonSubscriptionTypeEmail(
        long emailTemplateID,
        User user,
        ConfirmationToken confirmationToken
    ) {

        // 1 = email verification
        // 2 = password reset

        // Get the template used for email verification
        EmailTemplate emailTemplate = emailTemplateRepository.findByEmailTemplateID(
            emailTemplateID
        );
        // Create an email history row
        EmailHistory emailHistory = new EmailHistory(
            user,
            user.getEmail(),
            emailTemplate
        );
        emailHistoryRepository.saveAndFlush(emailHistory);
        // Replace both username and confirmation token to get email body to send
        String emailBody = replaceUsernameAndConfirmationToken(
            emailTemplate.getEmailTemplate(),
            user,
            confirmationToken
        );
        // Send email
        sendEmail(
            user.getEmail(),
            emailTemplate.getEmailSubject(),
            emailBody,
            // Only BCC me if new user
            emailTemplateID == 1
        );
        emailHistory.setEmailSentDateTimeUTC(Instant.now());
        emailHistoryRepository.save(emailHistory);
    }

    public String replaceUsernameAndConfirmationToken(
        String emailBody,
        User user,
        ConfirmationToken confirmationToken
    ) {
        String emailBody1 = buildEmailBodyForUser(emailBody, user);
        String emailBody2 = emailBody1.replace(
            "[confirmationToken]",
            confirmationToken.getConfirmationToken()
        );
        String emailBody3 = emailBody2.replaceAll(
            "tqbcDomain",
            frontEndURL
        );
        return emailBody3;
    }
}
