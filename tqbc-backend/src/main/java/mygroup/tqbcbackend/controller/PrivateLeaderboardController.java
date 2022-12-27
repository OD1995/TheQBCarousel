package mygroup.tqbcbackend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.PrivateLeaderboard;
import mygroup.tqbcbackend.model.PrivateLeaderboardMember;
import mygroup.tqbcbackend.model.PrivateLeaderboardMemberCompositeKey;
import mygroup.tqbcbackend.model.ScoringSetting;
import mygroup.tqbcbackend.model.ScoringSettingValue;
import mygroup.tqbcbackend.model.User;
import mygroup.tqbcbackend.payload.request.PrivateLeaderboardRequest;
import mygroup.tqbcbackend.repository.PrivateLeaderboardMemberRepository;
import mygroup.tqbcbackend.repository.PrivateLeaderboardRepository;
import mygroup.tqbcbackend.repository.UserRepository;
import mygroup.tqbcbackend.service.PrivateLeaderboardService;
import mygroup.tqbcbackend.service.ScoringSettingService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/private-leaderboards")
public class PrivateLeaderboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ScoringSettingService scoringSettingService;

    @Autowired
    private PrivateLeaderboardRepository privateLeaderboardRepository;

    @Autowired
    private PrivateLeaderboardMemberRepository privateLeaderboardMemberRepository;

    @Autowired
    private PrivateLeaderboardService privateLeaderboardService;
    
    @PostMapping("/post-private-leaderboard-data")
    public UUID postPrivateLeaderboardData(
        @Valid @RequestBody PrivateLeaderboardRequest privateLeaderboardRequest
    ) {
        User user = userRepository.findByUserID(privateLeaderboardRequest.getUserID());

        ScoringSetting scoringSetting = scoringSettingService.getScoringSetting(
            privateLeaderboardRequest.getWeightings()
        );

        PrivateLeaderboard privateLeaderboard = new PrivateLeaderboard(
            user,
            scoringSetting,
            privateLeaderboardRequest.getPrivateLeaderboardName()
        );

        privateLeaderboardRepository.saveAndFlush(privateLeaderboard);

        PrivateLeaderboardMemberCompositeKey privateLeaderboardMemberCompositeKey = new PrivateLeaderboardMemberCompositeKey(
            privateLeaderboard.getPrivateLeaderboardID(),
            privateLeaderboardRequest.getUserID()
        );
        
        PrivateLeaderboardMember privateLeaderboardMember = new PrivateLeaderboardMember(
            privateLeaderboardMemberCompositeKey
        );

        privateLeaderboardMemberRepository.save(privateLeaderboardMember);
        
        return privateLeaderboard.getPrivateLeaderboardUUID();
    }

    @GetMapping("/get-private-leaderboard-name")
    public String getPrivateLeaderboardName(
        PrivateLeaderboardRequest privateLeaderboardRequest
    ) {
        PrivateLeaderboard privateLeaderboard = privateLeaderboardRepository.findByPrivateLeaderboardUUID(
            privateLeaderboardRequest.getPrivateLeaderboardUUID()
        );

        return privateLeaderboard.getPrivateLeaderboardName();
    }

    @GetMapping("/get-private-leaderboard-weightings")
    // public List<ScoringSettingValue> getPrivateLeaderboardWeightings(
    public HashMap<Long,ScoringSettingValue> getPrivateLeaderboardWeightings(
        PrivateLeaderboardRequest privateLeaderboardRequest
    ) {
        PrivateLeaderboard privateLeaderboard = privateLeaderboardRepository.findByPrivateLeaderboardUUID(
            privateLeaderboardRequest.getPrivateLeaderboardUUID()
        );

        // return privateLeaderboard.getScoringSetting().getScoringSettingValues();
        HashMap<Long,ScoringSettingValue> hm = new HashMap<Long,ScoringSettingValue>();
        for (ScoringSettingValue ssv : privateLeaderboard.getScoringSetting().getScoringSettingValues()) {
            hm.put(
                ssv.getScoringSettingValueCompositeKey().getSeasonPeriodID(),
                ssv
            );
        }
        return hm;
    }

    @GetMapping("/get-private-leaderboard")
    public PrivateLeaderboard getPrivateLeaderboard(
        PrivateLeaderboardRequest privateLeaderboardRequest
    ) {
        PrivateLeaderboard privateLeaderboard = privateLeaderboardRepository.findByPrivateLeaderboardUUID(
            privateLeaderboardRequest.getPrivateLeaderboardUUID()
        );

        return privateLeaderboard;
    }

    @GetMapping("/get-private-leaderboard-infos")
    public List<HashMap<String,String>> getPrivateLeaderboardInfos(
        long userID
    ) {
        return privateLeaderboardService.getPrivateLeaderboardInfos(userID);
    }

    @PostMapping("/join-private-leaderboard")
    public ResponseEntity<?> joinPrivateLeaderboard(
        @Valid @RequestBody PrivateLeaderboardRequest privateLeaderboardRequest
    ) {
        PrivateLeaderboard privateLeaderboard = privateLeaderboardRepository.findByPrivateLeaderboardUUID(
            privateLeaderboardRequest.getPrivateLeaderboardUUID()
        );
        PrivateLeaderboardMemberCompositeKey plmck = new PrivateLeaderboardMemberCompositeKey(
            privateLeaderboard.getPrivateLeaderboardID(),
            privateLeaderboardRequest.getUserID()
        );        
        PrivateLeaderboardMember privateLeaderboardMember = new PrivateLeaderboardMember(
            plmck
        );
        privateLeaderboardMemberRepository.save(privateLeaderboardMember);
        return ResponseEntity.ok().build();
    }
}
