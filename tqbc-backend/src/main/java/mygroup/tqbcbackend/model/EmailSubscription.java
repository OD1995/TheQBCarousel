package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "EmailSubscriptions")
public class EmailSubscription {

    @EmbeddedId
    private EmailSubscriptionCompositeKey emailSubscriptionCompositeKey;

    @Column(name = "Value")
    private boolean value;


    public EmailSubscription() {
    }

    public EmailSubscription(EmailSubscriptionCompositeKey emailSubscriptionCompositeKey, boolean value) {
        this.emailSubscriptionCompositeKey = emailSubscriptionCompositeKey;
        this.value = value;
    }

    public EmailSubscriptionCompositeKey getEmailSubscriptionCompositeKey() {
        return this.emailSubscriptionCompositeKey;
    }

    public void setEmailSubscriptionCompositeKey(EmailSubscriptionCompositeKey emailSubscriptionCompositeKey) {
        this.emailSubscriptionCompositeKey = emailSubscriptionCompositeKey;
    }

    public boolean getValue() {
        return this.value;
    }

    public void setValue(boolean value) {
        this.value = value;
    }

}