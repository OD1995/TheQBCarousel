package mygroup.tqbcbackend.payload.request;

import java.util.UUID;

public class UserScoreRequest {
    
    private long season;
    
    private long userID;

    private long pageNumber;

    private long seasonPeriodID;

    private String leaderboardType;

    private UUID privateLeaderboardUUID;

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

    public long getPageNumber() {
        return this.pageNumber;
    }

    public void setPageNumber(long pageNumber) {
        this.pageNumber = pageNumber;
    }

    public long getSeasonPeriodID() {
        return this.seasonPeriodID;
    }

    public void setSeasonPeriodID(long seasonPeriodID) {
        this.seasonPeriodID = seasonPeriodID;
    }

    public String getLeaderboardType() {
        return this.leaderboardType;
    }

    public void setLeaderboardType(String leaderboardType) {
        this.leaderboardType = leaderboardType;
    }

    public UUID getPrivateLeaderboardUUID() {
        return this.privateLeaderboardUUID;
    }

    public void setPrivateLeaderboardUUID(UUID privateLeaderboardUUID) {
        this.privateLeaderboardUUID = privateLeaderboardUUID;
    }

}
