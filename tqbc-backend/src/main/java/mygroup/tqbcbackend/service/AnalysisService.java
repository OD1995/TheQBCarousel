package mygroup.tqbcbackend.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mygroup.tqbcbackend.dto.TeamOrPlayerAndCount;
import mygroup.tqbcbackend.payload.request.PredictionSplitsRequest;
import mygroup.tqbcbackend.payload.response.PredictionSplitsResponse;
import mygroup.tqbcbackend.repository.PeriodPredictionRepository;
import mygroup.tqbcbackend.repository.TeamRepository;

@Service
public class AnalysisService {
    
    @Autowired
    private PeriodPredictionRepository periodPredictionRepository;

    // @Autowired
    // private PredictionPeriodRepository predictionPeriodRepository;

    @Autowired
    private TeamRepository teamRepository;

    public PredictionSplitsResponse getPredictionSplits(
        PredictionSplitsRequest predictionSplitsRequest
    ) {
        // Get count of user predictions
        Integer userCount;
        if (predictionSplitsRequest.getPrivateLeaderboardUUID() == null) {
            userCount = periodPredictionRepository.getUserCountForPredictionPeriod(
                predictionSplitsRequest.getSeason(),
                predictionSplitsRequest.getSeasonPeriodID()
            );
        } else {
            userCount = periodPredictionRepository.getUserCountForPredictionPeriodWithinPrivateLeaderboard(
                predictionSplitsRequest.getSeason(),
                predictionSplitsRequest.getSeasonPeriodID(),
                predictionSplitsRequest.getPrivateLeaderboardUUID().toString()
            );
        }
        // Get relevant data
        List<TeamOrPlayerAndCount> countData;
        if (predictionSplitsRequest.getTeamID() == null) {
            countData = getPlayerPredictionSplitsData(
                predictionSplitsRequest
            );
        } else {
            countData = getTeamPredictionSplitsData(
                predictionSplitsRequest
            );
        }
        // Get running count of user accounted for
        //    some players won't have been predicted to be on a team, so a
        //    "Not a Starter" value may be necessary
        Integer runningUserCount = 0;
        // Divide by `userCount` to get percentages
        HashMap<String,Float> percentageData = new HashMap<String,Float>();
        for (TeamOrPlayerAndCount topac : countData) {
            percentageData.put(
                topac.getName(),
                (float) topac.getPredictionCount() / userCount
            );
            runningUserCount += topac.getPredictionCount();
        }
        Integer difference = userCount - runningUserCount;
        if (difference > 0) {
            percentageData.put(
                "Not A Starter",
                (float) difference / userCount
            );
        }
        return new PredictionSplitsResponse(
            userCount,
            percentageData
        );
    }

    private List<TeamOrPlayerAndCount> getPlayerPredictionSplitsData(
        PredictionSplitsRequest predictionSplitsRequest
    ) {
        // e.g.
        //    Ravens : 10
        //    Bills : 8
        //    Not A Starter : 3 (added in `getPredictionSplits` above)
        if (predictionSplitsRequest.getPrivateLeaderboardUUID() == null) {
            return periodPredictionRepository.getTeamsAndCounts(
                predictionSplitsRequest.getSeason(),
                predictionSplitsRequest.getSeasonPeriodID(),
                predictionSplitsRequest.getPlayerID()
            );
        } else {
            return periodPredictionRepository.getTeamsAndCountsWithinPrivateLeaderboard(
                predictionSplitsRequest.getSeason(),
                predictionSplitsRequest.getSeasonPeriodID(),
                predictionSplitsRequest.getPlayerID(),
                predictionSplitsRequest.getPrivateLeaderboardUUID().toString()
            );
        }
    }

    private List<TeamOrPlayerAndCount> getTeamPredictionSplitsData(
        PredictionSplitsRequest predictionSplitsRequest
    ) {
        // e.g.
        //    Josh Allen : 10
        //    Jordan Love : 8
        //    Jalen Hurts : 3

        // Get franchise ID from teamID
        long franchiseID = teamRepository.findByTeamID(
            predictionSplitsRequest.getTeamID()
        ).getFranchise().getFranchiseID();
        // Return results from db
        if (predictionSplitsRequest.getPrivateLeaderboardUUID() == null) {
            return periodPredictionRepository.getPlayersAndCounts(
                predictionSplitsRequest.getSeason(),
                predictionSplitsRequest.getSeasonPeriodID(),
                franchiseID
            );
        } else {
            return periodPredictionRepository.getPlayersAndCountsWithinPrivateLeaderboard(
                predictionSplitsRequest.getSeason(),
                predictionSplitsRequest.getSeasonPeriodID(),
                franchiseID,
                predictionSplitsRequest.getPrivateLeaderboardUUID().toString()
            );
        }
    }
}
