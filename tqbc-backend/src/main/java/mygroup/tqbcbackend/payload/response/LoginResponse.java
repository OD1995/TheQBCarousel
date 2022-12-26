package mygroup.tqbcbackend.payload.response;

import java.util.HashMap;
import java.util.List;

public class LoginResponse {
 
    private JwtResponse user;

    private List<HashMap<String,String>> privateLeaderboardInfos;

    public LoginResponse(JwtResponse user, List<HashMap<String,String>> privateLeaderboardInfos) {
        this.user = user;
        this.privateLeaderboardInfos = privateLeaderboardInfos;
    }

    public JwtResponse getUser() {
        return this.user;
    }

    public void setUser(JwtResponse user) {
        this.user = user;
    }

    public List<HashMap<String,String>> getPrivateLeaderboardInfos() {
        return this.privateLeaderboardInfos;
    }

    public void setPrivateLeaderboardInfos(List<HashMap<String,String>> privateLeaderboardInfos) {
        this.privateLeaderboardInfos = privateLeaderboardInfos;
    }

}
