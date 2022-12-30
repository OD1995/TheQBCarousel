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
}
export default new AuthService();