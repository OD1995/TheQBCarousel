package mygroup.tqbcbackend.payload.request;

public class UserScoreRequest {
    
    private long season;
    
    private long userID;

    // private String seasonPeriod;

    private long pageNumber;

    private long seasonPeriodID;

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

    // public String getSeasonPeriod() {
    //     return this.seasonPeriod;
    // }

    // public void setSeasonPeriod(String seasonPeriod) {
    //     this.seasonPeriod = seasonPeriod;
    // }

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

}
