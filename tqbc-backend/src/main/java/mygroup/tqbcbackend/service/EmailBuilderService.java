package mygroup.tqbcbackend.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
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
import mygroup.tqbcbackend.model.EmailHistory;
import mygroup.tqbcbackend.model.User;

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
            fromEmailAddress,
            "The QB Carousel - " + System.currentTimeMillis(),
            content
        );
    }


    private MimeMessage createMessage(
        String toEmailAddress,
        String subject,
        String htmlBody
    ) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);
            helper.setTo(toEmailAddress);
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
        String fromEmailAddress,
        String subject,
        String htmlBody
    ) {
        MimeMessage msg = createMessage(toEmailAddress, subject, htmlBody);
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

    public void bulkSendEmails(
        // String emailHtml,
        // long emailSubscriptionTypeID
        // List<Message> messages
        // List<EmailHistory> emails
    ) {
        List<Message> messages = new ArrayList<Message>();
        IntStream.range(0, 10).forEach(
            i -> {
                messages.add(
                    createMessage(
                        "oliverdernie1@gmail.com",
                        "Test4",
                        "Test4"
                    )
                );
            }
        );
        
        Properties props = new Properties();
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.connectiontimeout", "50000");
        props.put("mail.smtp.writetimeout", "50000");
        props.put("mail.smtp.starttls.required", "true");
        props.put("mail.smtp.timeout", "50000");
        props.put("mail.transport.protocol", "smtp");
        Session session = Session.getInstance(props);
        try {
            try (Transport t = session.getTransport()) {
                t.connect(
                    host,
                    Integer.parseInt(port),
                    username,
                    password
                );
                for(Message m : messages) {
                    // Maybe comment out the line below
                    m.saveChanges();
                    t.sendMessage(m, m.getAllRecipients());
                }
            }
        } catch (MessagingException  e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public String buildEmailBodyForUser(
        String emailTemplate,
        User user
    ) {
        String S = emailTemplate;
        S = S.replace("[username]", user.getUsername());
        return S;
    }
}
