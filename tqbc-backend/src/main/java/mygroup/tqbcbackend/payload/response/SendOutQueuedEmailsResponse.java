package mygroup.tqbcbackend.payload.response;

import java.util.List;

public class SendOutQueuedEmailsResponse {
    
    private Integer emailsSentCount;

    private List<String> errors;


    public SendOutQueuedEmailsResponse(Integer emailsSentCount, List<String> errors) {
        this.emailsSentCount = emailsSentCount;
        this.errors = errors;
    }

    public Integer getEmailsSentCount() {
        return this.emailsSentCount;
    }

    public void setEmailsSentCount(Integer emailsSentCount) {
        this.emailsSentCount = emailsSentCount;
    }

    public List<String> getErrors() {
        return this.errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }

}
