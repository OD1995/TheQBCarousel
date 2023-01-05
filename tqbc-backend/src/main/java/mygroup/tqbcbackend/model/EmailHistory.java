package mygroup.tqbcbackend.model;

import java.time.Instant;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "emailhistory")
public class EmailHistory {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EmailHistoryID")
    private long emailHistoryID;

    @ManyToOne(
        targetEntity = User.class,
        fetch = FetchType.EAGER
    )
    @JoinColumn(
        name = "UserID",
		foreignKey = @ForeignKey(
			name = "none",
			value = ConstraintMode.NO_CONSTRAINT
		)
	)
    private User user;

    @Column(name = "ToEmailAddress")
    private String toEmailAddress;

    @Column(name = "RowCreatedDateTimeUTC")
	private Instant rowCreatedDateTimeUTC;

    @Column(name = "EmailSentDateTimeUTC")
    private Instant emailSentDateTimeUTC;

    @ManyToOne(
        targetEntity = EmailTemplate.class,
        fetch = FetchType.LAZY
    )
    @JoinColumn(
        name = "EmailTemplateID",
		foreignKey = @ForeignKey(
			name = "none",
			value = ConstraintMode.NO_CONSTRAINT
		)
	)
    private EmailTemplate emailTemplate;
    

    public EmailHistory() {
    }

    public EmailHistory(
        User user,
        String toEmailAddress,
        EmailTemplate emailTemplate
    ) {
        this.user = user;
        this.toEmailAddress = toEmailAddress;
        this.rowCreatedDateTimeUTC = Instant.now();
        this.emailTemplate = emailTemplate;
    }

    public long getEmailHistoryID() {
        return this.emailHistoryID;
    }

    public void setEmailHistoryID(long emailHistoryID) {
        this.emailHistoryID = emailHistoryID;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getToEmailAddress() {
        return this.toEmailAddress;
    }

    public void setToEmailAddress(String toEmailAddress) {
        this.toEmailAddress = toEmailAddress;
    }

    public Instant getRowCreatedDateTimeUTC() {
        return this.rowCreatedDateTimeUTC;
    }

    public void setRowCreatedDateTimeUTC(Instant rowCreatedDateTimeUTC) {
        this.rowCreatedDateTimeUTC = rowCreatedDateTimeUTC;
    }

    public Instant getEmailSentDateTimeUTC() {
        return this.emailSentDateTimeUTC;
    }

    public void setEmailSentDateTimeUTC(Instant emailSentDateTimeUTC) {
        this.emailSentDateTimeUTC = emailSentDateTimeUTC;
    }

    public EmailTemplate getEmailTemplate() {
        return this.emailTemplate;
    }

    public void setEmailTemplate(EmailTemplate emailTemplate) {
        this.emailTemplate = emailTemplate;
    }


}
