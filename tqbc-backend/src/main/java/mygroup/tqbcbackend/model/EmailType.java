package mygroup.tqbcbackend.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name = "emailtypes")
public class EmailType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EmailTypeID")
    private long emailTypeID;

    @Enumerated(EnumType.STRING)
    @Column(name = "EmailType")
    private EEmailType emailType;

    @Column(name = "Description")
    private String description;

    @Column(name = "EmailTypeTidy")
    private String emailTypeTidy;

    @Column(name = "IsSubscription")
    private boolean isSubscription;

    @OneToMany(
        targetEntity = EmailTemplate.class,
        fetch = FetchType.LAZY,
        mappedBy = "emailType"
    )
    private List<EmailTemplate> emailTemplates;

    public EmailType() {
    }

    public EmailType(
        long emailTypeID,
        EEmailType emailType,
        String description,
        String emailTypeTidy,
        boolean isSubscription
    ) {
        this.emailTypeID = emailTypeID;
        this.emailType = emailType;
        this.description = description;
        this.emailTypeTidy = emailTypeTidy;
        this.isSubscription = isSubscription;
    }


    public long getEmailTypeID() {
        return this.emailTypeID;
    }

    public void setEmailTypeID(long emailTypeID) {
        this.emailTypeID = emailTypeID;
    }

    public EEmailType getEmailType() {
        return this.emailType;
    }

    public void setEmailType(EEmailType emailType) {
        this.emailType = emailType;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmailTypeTidy() {
        return this.emailTypeTidy;
    }

    public void setEmailTypeTidy(String emailTypeTidy) {
        this.emailTypeTidy = emailTypeTidy;
    }

    public boolean getIsSubscription() {
        return this.isSubscription;
    }

    public void setIsSubscription(boolean isSubscription) {
        this.isSubscription = isSubscription;
    }

}
