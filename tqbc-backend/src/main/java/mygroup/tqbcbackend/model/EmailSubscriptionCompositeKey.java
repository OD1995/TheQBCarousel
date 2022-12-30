package mygroup.tqbcbackend.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;

public class EmailSubscriptionCompositeKey implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "UserID")
    private long userID;

    @Column(name = "EmailSubscriptionTypeID")
    private long emailSubscriptionTypeID;


    public EmailSubscriptionCompositeKey() {
    }

    public EmailSubscriptionCompositeKey(long userID, long emailSubscriptionTypeID) {
        this.userID = userID;
        this.emailSubscriptionTypeID = emailSubscriptionTypeID;
    }

    public long getUserID() {
        return this.userID;
    }

    public void setUserID(long userID) {
        this.userID = userID;
    }

    public long getEmailSubscriptionTypeID() {
        return this.emailSubscriptionTypeID;
    }

    public void setEmailSubscriptionTypeID(long emailSubscriptionTypeID) {
        this.emailSubscriptionTypeID = emailSubscriptionTypeID;
    }

    
    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof EmailSubscriptionCompositeKey)) {
            return false;
        }
        EmailSubscriptionCompositeKey emailSubscriptionCompositeKey = (EmailSubscriptionCompositeKey) o;
        return userID == emailSubscriptionCompositeKey.userID && emailSubscriptionTypeID == emailSubscriptionCompositeKey.emailSubscriptionTypeID;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userID, emailSubscriptionTypeID);
    }

    
}
