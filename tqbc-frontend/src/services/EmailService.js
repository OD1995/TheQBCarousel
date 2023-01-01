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
}

export default new EmailService();