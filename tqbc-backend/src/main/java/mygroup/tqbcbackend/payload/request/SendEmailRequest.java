package mygroup.tqbcbackend.payload.request;

public class SendEmailRequest {

    private String emailHtml;

    private long emailSubscriptionTypeID;

    private long predictionPeriodID;

    private String username;


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

    public long getPredictionPeriodID() {
        return this.predictionPeriodID;
    }

    public void setPredictionPeriodID(long predictionPeriodID) {
        this.predictionPeriodID = predictionPeriodID;
    }
    
    public String getUsername() {
        return this.username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
}