package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "EmailSubscriptionTypes")
public class EmailSubscriptionType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EmailSubscriptionTypeID")
    private long emailSubscriptionTypeID;

    @Enumerated(EnumType.STRING)
    @Column(name = "EmailSubscriptionType")
    private EEmailSubscriptionType emailSubscriptionType;

    @Column(name = "Description")
    private String description;

    public EmailSubscriptionType() {
    }

    public EmailSubscriptionType(
        long emailSubscriptionTypeID,
        EEmailSubscriptionType emailSubscriptionType,
        String description
    ) {
        this.emailSubscriptionTypeID = emailSubscriptionTypeID;
        this.emailSubscriptionType = emailSubscriptionType;
        this.description = description;
    }


    public long getEmailSubscriptionTypeID() {
        return this.emailSubscriptionTypeID;
    }

    public void setEmailSubscriptionTypeID(long emailSubscriptionTypeID) {
        this.emailSubscriptionTypeID = emailSubscriptionTypeID;
    }

    public EEmailSubscriptionType getEmailSubscriptionType() {
        return this.emailSubscriptionType;
    }

    public void setEmailSubscriptionType(EEmailSubscriptionType emailSubscriptionType) {
        this.emailSubscriptionType = emailSubscriptionType;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}