package mygroup.tqbcbackend.payload.request;

public class AnswerRequest {
    
    private long season;

    private String conference;

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

}
