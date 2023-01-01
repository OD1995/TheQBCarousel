package mygroup.tqbcbackend.payload.request;

public class SendEmailRequest {

    private String emailHtml;


    // public SendEmailRequest(String emailHtml) {
    //     this.emailHtml = emailHtml;
    // }

    public String getEmailHtml() {
        return this.emailHtml;
    }

    public void setEmailHtml(String emailHtml) {
        this.emailHtml = emailHtml;
    }

}
