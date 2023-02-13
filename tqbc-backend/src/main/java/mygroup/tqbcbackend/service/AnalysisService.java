package mygroup.tqbcbackend.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;

// import java.util.Map;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mygroup.tqbcbackend.payload.request.PredictionSplitsRequest;
import mygroup.tqbcbackend.payload.response.PredictionSplitsResponse;
import mygroup.tqbcbackend.repository.PeriodPredictionRepository;
import mygroup.tqbcbackend.repository.TeamRepository;

// import mygroup.tqbcbackend.repository.PeriodPredictionRepository;

@Service
public class AnalysisService {
    
    @Autowired
    private PeriodPredictionRepository periodPredictionRepository;

    @Autowired
    private TeamRepository teamRepository;

    public PredictionSplitsResponse getPredictionSplits(
        PredictionSplitsRequest predictionSplitsRequest
    ) {
        // Get count of user predictions
        Integer userCount = 1;
        // Get relevant data
        HashMap<String,Integer> countData;
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

        return new PredictionSplitsResponse(percentageData);
    }

    private HashMap<String,Integer> getPlayerPredictionSplitsData(
        PredictionSplitsRequest predictionSplitsRequest
    ) {
        // e.g.
        //    Ravens : 10
        //    Bills : 8
        //    No Team : 3
        HashMap<String,Integer> a;
        return a;
    }

    private HashMap<String,Integer> getTeamPredictionSplitsData(
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

        HashMap<String,Integer> a;
        return a;
    }
}
