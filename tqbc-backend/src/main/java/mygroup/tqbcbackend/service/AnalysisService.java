package mygroup.tqbcbackend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mygroup.tqbcbackend.dto.TeamOrPlayerAndCount;
import mygroup.tqbcbackend.payload.request.PredictionSplitsRequest;
import mygroup.tqbcbackend.payload.response.PredictionSplitsResponse;
import mygroup.tqbcbackend.repository.PeriodPredictionRepository;
import mygroup.tqbcbackend.repository.PredictionPeriodRepository;
import mygroup.tqbcbackend.repository.TeamRepository;

// import mygroup.tqbcbackend.repository.PeriodPredictionRepository;

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
        // Integer userCount = 1;
        Integer userCount = periodPredictionRepository.getUserCountForPredictionPeriod(
            predictionSplitsRequest.getSeason(),
            predictionSplitsRequest.getSeasonPeriodID()
        );
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
        // Divide by `userCount` to get percentages
        HashMap<String,Float> percentageData = new HashMap<String,Float>();
        for (TeamOrPlayerAndCount topac : countData) {
            percentageData.put(
                topac.getName(),
                (float) topac.getPredictionCount() / userCount
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
        //    No Team : 3
        List<TeamOrPlayerAndCount> a = new ArrayList<TeamOrPlayerAndCount>();
        return a;
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
        return periodPredictionRepository.getPlayersAndCounts(
            predictionSplitsRequest.getSeason(),
            predictionSplitsRequest.getSeasonPeriodID(),
            franchiseID
        );
    }
}
