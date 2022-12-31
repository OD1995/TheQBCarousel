package mygroup.tqbcbackend.payload.response;

import java.util.List;

import mygroup.tqbcbackend.dto.UsersByPredictionPeriod;

public class AdminBoardSummaryStatsResponse {

    private long totalUserCount;

    private List<UsersByPredictionPeriod> usersByPredictionPeriod;

    public AdminBoardSummaryStatsResponse(long totalUserCount, List<UsersByPredictionPeriod> usersByPredictionPeriod) {
        this.totalUserCount = totalUserCount;
        this.usersByPredictionPeriod = usersByPredictionPeriod;
    }

    public long getTotalUserCount() {
        return this.totalUserCount;
    }

    public void setTotalUserCount(long totalUserCount) {
        this.totalUserCount = totalUserCount;
    }

    public List<UsersByPredictionPeriod> getUsersByPredictionPeriod() {
        return this.usersByPredictionPeriod;
    }

    public void setUsersByPredictionPeriod(List<UsersByPredictionPeriod> usersByPredictionPeriod) {
        this.usersByPredictionPeriod = usersByPredictionPeriod;
    }

}
