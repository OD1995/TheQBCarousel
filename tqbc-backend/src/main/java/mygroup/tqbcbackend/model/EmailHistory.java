package mygroup.tqbcbackend.model;

import java.time.Instant;

import javax.annotation.Generated;
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
@Table(name = "EmailHistory")
public class EmailHistory {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long emailHistoryID;

    @ManyToOne(
        targetEntity = User.class,
        fetch = FetchType.LAZY
    )
    @JoinColumn(
        name = "UserID",
        nullable = false,
        insertable = false,
        updatable = false
    )
    private User user;

    @ManyToOne(
        targetEntity = EmailType.class,
        fetch = FetchType.LAZY
    )
    @JoinColumn(
        name = "EmailTypeID",
        nullable = false,
        insertable = false,
        updatable = false
    )
    private EmailType emailType;

    @Column(name = "ToEmailAddress")
    private String toEmailAddress;

    @Column(name = "PredictionPeriodID")
    private long predictionPeriodID;

    @Column(name = "RowCreatedDateTimeUTC")
	private Instant rowCreatedDateTimeUTC;

    @Column(name = "EmailSentDateTimeUTC")
    private Instant emailSentDateTimeUTC;

    public EmailHistory() {
    }

    public EmailHistory(
        long emailHistoryID, User user, EmailType emailType, String toEmailAddress, 
        long predictionPeriodID, Instant rowCreatedDateTimeUTC, Instant emailSentDateTimeUTC
    ) {
        this.emailHistoryID = emailHistoryID;
        this.user = user;
        this.emailType = emailType;
        this.toEmailAddress = toEmailAddress;
        this.predictionPeriodID = predictionPeriodID;
        this.rowCreatedDateTimeUTC = rowCreatedDateTimeUTC;
        this.emailSentDateTimeUTC = emailSentDateTimeUTC;
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

    public EmailType getEmailType() {
        return this.emailType;
    }

    public void setEmailType(EmailType emailType) {
        this.emailType = emailType;
    }

    public String getToEmailAddress() {
        return this.toEmailAddress;
    }

    public void setToEmailAddress(String toEmailAddress) {
        this.toEmailAddress = toEmailAddress;
    }

    public long getPredictionPeriodID() {
        return this.predictionPeriodID;
    }

    public void setPredictionPeriodID(long predictionPeriodID) {
        this.predictionPeriodID = predictionPeriodID;
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

}
