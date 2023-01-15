package mygroup.tqbcbackend.payload.request;

import java.util.UUID;

public class AnswerRequest {
    
    private long season;

    private String conference;

    private boolean global;

    private UUID privateLeaderboardUUID;

    public long getSeason() {
        return this.season;
    }

    public void setSeason(long season) {
        this.season = season;
    }

    public String getConference() {
        return this.conference;
    }

    public void setConference(String conference) {
        this.conference = conference;
    }

    public boolean isGlobal() {
        return this.global;
    }

    public boolean getGlobal() {
        return this.global;
    }

    public void setGlobal(boolean global) {
        this.global = global;
    }

    public UUID getPrivateLeaderboardUUID() {
        return this.privateLeaderboardUUID;
    }

    public void setPrivateLeaderboardUUID(UUID privateLeaderboardUUID) {
        this.privateLeaderboardUUID = privateLeaderboardUUID;
    }

}
