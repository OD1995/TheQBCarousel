import api from "./api";

class EmailService {
    base_url = "/v1/emails/"

    getEmailSubscriptionTypes() {
        return api.get(
            this.base_url + "get-email-subscription-types"
        )
    }

    getEmailSubscriptionTypeTemplate(
        emailSubscriptionTypeID
    ) {
        return api.get(
            this.base_url + "get-email-subscription-type-template",
            {
                params: {
                    emailSubscriptionTypeID
                }
            }
        );
    }

    sendEmailJustToMe(
        emailHtml
    ) {
        return api.post(
            this.base_url + "send-email-just-to-me",
            {
                emailHtml
            }
        )
    }
}

export default new EmailService();