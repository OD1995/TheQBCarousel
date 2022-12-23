package mygroup.tqbcbackend.payload.request;

import java.util.Map;

public class PrivateLeaderboardRequest {
    
    private long userID;

    private String privateLeaderboardName;

    private Map<Integer,Map<String,Integer>> weightings;


    public long getUserID() {
        return this.userID;
    }

    public void setUserID(long userID) {
        this.userID = userID;
    }

    public String getPrivateLeaderboardName() {
        return this.privateLeaderboardName;
    }

    public void setPrivateLeaderboardName(String privateLeaderboardName) {
        this.privateLeaderboardName = privateLeaderboardName;
    }

    public Map<Integer,Map<String,Integer>> getWeightings() {
        return this.weightings;
    }

    public void setWeightings(Map<Integer,Map<String,Integer>> weightings) {
        this.weightings = weightings;
    }

}
