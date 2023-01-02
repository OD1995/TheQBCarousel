package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "EmailTemplates")
public class EmailTemplate {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EmailTemplateID")
    private long emailTemplateID;

    @Column(name = "EmailTemplate", length = 1000)
    private String emailTemplate;

    @Column(name = "EmailSubject")
    private String emailSubject;

    @Column(name = "PredictionPeriodID")
    private Long predictionPeriodID;

    @ManyToOne(
        targetEntity = EmailType.class,
        fetch = FetchType.LAZY
    )
    @JoinColumn(name = "EmailTypeID")
    private EmailType emailType;

    public EmailTemplate() {

    }


    public EmailTemplate(String emailTemplate, String emailSubject, long predictionPeriodID, EmailType emailType) {
        this.emailTemplate = emailTemplate;
        this.emailSubject = emailSubject;
        this.predictionPeriodID = predictionPeriodID;
        this.emailType = emailType;
    }
    

    public long getEmailTemplateID() {
        return this.emailTemplateID;
    }

    public void setEmailTemplateID(long emailTemplateID) {
        this.emailTemplateID = emailTemplateID;
    }

    public String getEmailTemplate() {
        return this.emailTemplate;
    }

    public void setEmailTemplate(String emailTemplate) {
        this.emailTemplate = emailTemplate;
    }

    public String getEmailSubject() {
        return this.emailSubject;
    }

    public void setEmailSubject(String emailSubject) {
        this.emailSubject = emailSubject;
    }

    public long getPredictionPeriodID() {
        return this.predictionPeriodID;
    }

    public void setPredictionPeriodID(long predictionPeriodID) {
        this.predictionPeriodID = predictionPeriodID;
    }

    public EmailType getEmailType() {
        return this.emailType;
    }

    public void setEmailType(EmailType emailType) {
        this.emailType = emailType;
    }

}
