package mygroup.tqbcbackend.payload.request;

public class SendEmailRequest {

    private String emailHtml;

    private long emailSubscriptionTypeID;


    public String getEmailHtml() {
        return this.emailHtml;
    }

    public void setEmailHtml(String emailHtml) {
        this.emailHtml = emailHtml;
    }

    public long getEmailSubscriptionTypeID() {
        return this.emailSubscriptionTypeID;
    }

    public void setEmailSubscriptionTypeID(long emailSubscriptionTypeID) {
        this.emailSubscriptionTypeID = emailSubscriptionTypeID;
    }
    

}
