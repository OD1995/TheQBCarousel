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

    queueEmailToAllSubscribedUsers(
        emailHtml,
        emailSubscriptionTypeID,
        predictionPeriodID
    ) {
        return api.post(
            this.base_url + "queue-email-to-all-subscribed-users",
            {
                emailHtml,
                emailSubscriptionTypeID,
                predictionPeriodID
            }
        );
    }

    getTotalUnsentEmailsCount() {
        return api.get(
            this.base_url + "get-total-unsent-emails-count"
        );
    }

    sendOutQueuedEmails() {
        return api.get(
            this.base_url + "send-out-queued-emails"
        );
    }

    getEmailSubscriptionType(
        emailSubscriptionType
    ) {
        return api.get(
            this.base_url + "get-email-subscription-type",
            {
                params: {
                    emailSubscriptionType
                }
            }
        )
    }

    unsubscribeUser(
        userID,
        emailSubscriptionTypeID
    ) {
        return api.post(
            this.base_url + "unsubscribe-user",
            {
                userID,
                emailSubscriptionTypeID
            }
        )
    }
}

export default new EmailService();