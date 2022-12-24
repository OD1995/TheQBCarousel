package mygroup.tqbcbackend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mygroup.tqbcbackend.model.PrivateLeaderboard;
import mygroup.tqbcbackend.model.PrivateLeaderboardMember;
import mygroup.tqbcbackend.model.User;
import mygroup.tqbcbackend.repository.UserRepository;

@Service
public class PrivateLeaderboardService {
    
    @Autowired
    private UserRepository userRepository;

    public List<HashMap<String,String>> getPrivateLeaderboardInfos(
        long userID
    ) {
        User user = userRepository.findByUserID(userID);
		List<PrivateLeaderboardMember> privateLeaderboardMembers = user.getPrivateLeaderboardMemberships();
		List<HashMap<String,String>> privateLeaderboardInfos = new ArrayList<HashMap<String,String>>();
		for (PrivateLeaderboardMember privateLeaderboardMember : privateLeaderboardMembers) {
            HashMap<String,String> hm = new HashMap<String,String>();
            PrivateLeaderboard privateLeaderboard = privateLeaderboardMember.getPrivateLeaderboard();
            hm.put("name", privateLeaderboard.getPrivateLeaderboardName());
            hm.put("uuid",privateLeaderboard.getPrivateLeaderboardUUID().toString());
            privateLeaderboardInfos.add(hm);
        }
        return privateLeaderboardInfos;
    }
}
