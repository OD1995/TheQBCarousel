import api from './api.js';

class AuthService {
    base_url = "/v1/auth/";

    login(
        usernameEmail,
        password
    ) {
        return api.post(
            this.base_url + "login",
            {
                username: usernameEmail,
                password: password
            }
        )
    }

    register(
        username,
        favTeamID,
        email,
        password
    ) {
        return api.post(
            this.base_url + "register",
            {
                username,
                favTeamID,
                email,
                password
            }
        )
    }

    sendPasswordResetEmail(
        email
    ) {
        return api.post(
            this.base_url + "send-password-reset-email",
            {
                email
            }
        )
    }

    checkPasswordResetToken(
        token
    ) {
        return api.post(
            this.base_url + "check-password-reset-token",
            {
                token
            }
        )
    }

    updateUserPassword(
        userID,
        password
    ) {
        return api.post(
            this.base_url + "update-user-password",
            {
                userID,
                password
            }
        )
    }
}
export default new AuthService();