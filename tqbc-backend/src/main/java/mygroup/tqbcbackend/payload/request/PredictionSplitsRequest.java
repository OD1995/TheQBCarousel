package mygroup.tqbcbackend.payload.request;

public class PredictionSplitsRequest {
    
    private long season;

    private long seasonPeriodID;

    private Long teamID;

    private Long playerID;

    public long getSeason() {
        return this.season;
    }

    public void setSeason(long season) {
        this.season = season;
    }

    public long getSeasonPeriodID() {
        return this.seasonPeriodID;
    }

    public void setSeasonPeriodID(long seasonPeriodID) {
        this.seasonPeriodID = seasonPeriodID;
    }

    public Long getTeamID() {
        return this.teamID;
    }

    public void setTeamID(Long teamID) {
        this.teamID = teamID;
    }

    public Long getPlayerID() {
        return this.playerID;
    }

    public void setPlayerID(Long playerID) {
        this.playerID = playerID;
    }

}
