package mygroup.tqbcbackend.payload.request;

public class UserScoreRequest {
    
    private long userID;

    private long season;


    public long getUserID() {
        return this.userID;
    }

    public void setUserID(long userID) {
        this.userID = userID;
    }

    public long getSeason() {
        return this.season;
    }

    public void setSeason(long season) {
        this.season = season;
    }

}
