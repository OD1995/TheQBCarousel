package mygroup.tqbcbackend.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;

import javax.mail.MessagingException;
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

@Service
public class EmailBuilderService {
    
    @Value("${spring.mail.username}")
	private String fromEmailAddress;
    
    @Autowired
	private EmailSenderService emailSenderService;

    @Autowired
    private JavaMailSender javaMailSender;

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
        try {
            String content = getEmailSubscriptionTypeTemplate(emailSubscriptionTypeID);
            content = doReplacements(
                content,
                username,
                ordinalPredictionPeriod,
                predictionSeason,
                qbPredictionsURL,
                daysLeft,
                toEvent,
                toEventDateTimeET,
                unsubscribeURL
            );
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);
            helper.setTo("oliverdernie1@gmail.com");
            Long unix = System.currentTimeMillis();
            helper.setSubject("The QB Carousel - " + unix);
            helper.setFrom(fromEmailAddress);
            // mailMessage.setText(content,true);
            helper.setText(content, true);
            javaMailSender.send(helper.getMimeMessage());
        } catch (MessagingException e) {
            Integer a = 1;
        }
    }

    private String doReplacements(
        String content,
        String username,
        String ordinalPredictionPeriod,
        String predictionSeason,
        String qbPredictionsURL,
        String daysLeft,
        String toEvent,
        String toEventDateTimeET,
        String unsubscribeURL
    ) {
        content = content.replace("[username]", username);
        content = content.replace("[ordinalPredictionPeriod]", ordinalPredictionPeriod);
        content = content.replace("[predictionSeason]", predictionSeason);
        content = content.replace("[qbPredictionsURL]", qbPredictionsURL);
        content = content.replace("[daysLeft]", daysLeft);
        content = content.replace("[toEvent]", toEvent);
        content = content.replace("[toEventDateTimeET]", toEventDateTimeET);
        content = content.replace("[unsubscribeURL]", unsubscribeURL);
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
}
