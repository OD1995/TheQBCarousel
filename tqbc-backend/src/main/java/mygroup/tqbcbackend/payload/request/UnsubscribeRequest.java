package mygroup.tqbcbackend.payload.request;

public class UnsubscribeRequest {
    
    private long userID;

    private long emailSubscriptionTypeID;


    public UnsubscribeRequest(long userID, long emailSubscriptionTypeID) {
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

}
