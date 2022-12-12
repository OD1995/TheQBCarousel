package mygroup.tqbcbackend.dto;

import java.io.Serializable;
import java.util.HashMap;

import com.fasterxml.jackson.annotation.JsonIgnore;

import mygroup.tqbcbackend.model.User;

public class LeaderboardRow {
    
    private User user;

    // private float seasonPeriod1;

    // private float seasonPeriod2;

    // private float seasonPeriod3;

    // private float seasonPeriod4;

    private HashMap<Long,Float> seasonPeriodScores;

    private Float seasonScore;


    public LeaderboardRow(User user, HashMap<Long,Float> seasonPeriodScores, Float seasonScore) {
        this.user = user;
        this.seasonPeriodScores = seasonPeriodScores;
        this.seasonScore = seasonScore;
    }
    

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // // public float getSeasonPeriod1() {
    // //     return this.seasonPeriod1;
    // // }

    // // public void setSeasonPeriod1(float seasonPeriod1) {
    // //     this.seasonPeriod1 = seasonPeriod1;
    // // }

    // // public float getSeasonPeriod2() {
    // //     return this.seasonPeriod2;
    // // }

    // // public void setSeasonPeriod2(float seasonPeriod2) {
    // //     this.seasonPeriod2 = seasonPeriod2;
    // // }

    // // public float getSeasonPeriod3() {
    // //     return this.seasonPeriod3;
    // // }

    // // public void setSeasonPeriod3(float seasonPeriod3) {
    // //     this.seasonPeriod3 = seasonPeriod3;
    // // }

    // // public float getSeasonPeriod4() {
    // //     return this.seasonPeriod4;
    // // }

    // public void setSeasonPeriod4(float seasonPeriod4) {
    //     this.seasonPeriod4 = seasonPeriod4;
    // }

    public HashMap<Long,Float> getSeasonPeriodScores() {
        return this.seasonPeriodScores;
    }

    public void setSeasonPeriodScores(HashMap<Long,Float> seasonPeriodScores) {
        this.seasonPeriodScores = seasonPeriodScores;
    }

    public Float getSeasonScore() {
        return this.seasonScore;
    }

    public void setSeasonScore(Float seasonScore) {
        this.seasonScore = seasonScore;
    }

}
