package mygroup.tqbcbackend.payload.request;

import java.util.List;

public class AnswerPostRequest {
    
    private long teamID;

    private long season;

    private long answerTypeID;

    private List<Long> answers;


    public long getTeamID() {
        return this.teamID;
    }

    public void setTeamID(long teamID) {
        this.teamID = teamID;
    }

    public long getSeason() {
        return this.season;
    }

    public void setSeason(long season) {
        this.season = season;
    }

    public List<Long> getAnswers() {
        return this.answers;
    }

    public void setAnswers(List<Long> answers) {
        this.answers = answers;
    }

    public long getAnswerTypeID() {
        return this.answerTypeID;
    }

    public void setAnswerTypeID(long answerTypeID) {
        this.answerTypeID = answerTypeID;
    }

}
