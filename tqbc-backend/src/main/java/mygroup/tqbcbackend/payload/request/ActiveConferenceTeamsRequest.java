package mygroup.tqbcbackend.payload.request;

public class ActiveConferenceTeamsRequest {
    
    private long season;

    private String conference;

    public String getConference() {
        return this.conference;
    }

    public void setConference(String conference) {
        this.conference = conference;
    }

    public long getSeason() {
        return this.season;
    }

    public void setSeason(long season) {
        this.season = season;
    }

}
