package mygroup.tqbcbackend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.dto.UsersByPredictionPeriod;
import mygroup.tqbcbackend.payload.request.PredictionSplitsRequest;
import mygroup.tqbcbackend.payload.response.AdminBoardSummaryStatsResponse;
import mygroup.tqbcbackend.payload.response.PredictionSplitsResponse;
import mygroup.tqbcbackend.repository.PeriodPredictionRepository;
import mygroup.tqbcbackend.repository.UserRepository;
import mygroup.tqbcbackend.service.AnalysisService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/analysis")
public class AnalysisController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PeriodPredictionRepository periodPredictionRepository;

    @Autowired
    private AnalysisService  analysisService;
    
    @GetMapping("/get-admin-board-summary-stats")
    private AdminBoardSummaryStatsResponse getAdminBoardSummaryStats() {
        // Total users
        long totalUserCount = userRepository.count();
        // Users by prediction period
        List<UsersByPredictionPeriod> usersByPredictionPeriod = periodPredictionRepository.getUsersByPredictionPeriod();

        return new AdminBoardSummaryStatsResponse(totalUserCount, usersByPredictionPeriod);
    }

    @GetMapping("/get-prediction-splits")
    private PredictionSplitsResponse getPredictionSplits(
        PredictionSplitsRequest predictionSplitsRequest
    ) {
        return analysisService.getPredictionSplits(predictionSplitsRequest);
    }
}
