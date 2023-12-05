package mygroup.tqbcbackend.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.collect.Lists;

import mygroup.tqbcbackend.dto.LeaderboardRow;
import mygroup.tqbcbackend.model.PrivateLeaderboard;
import mygroup.tqbcbackend.model.PrivateLeaderboardMember;
import mygroup.tqbcbackend.model.ScoringSetting;
import mygroup.tqbcbackend.model.User;
import mygroup.tqbcbackend.model.UserScore;
import mygroup.tqbcbackend.payload.request.UserScoreRequest;
import mygroup.tqbcbackend.payload.response.LeaderboardResponse;
import mygroup.tqbcbackend.repository.PrivateLeaderboardMemberRepository;
import mygroup.tqbcbackend.repository.PrivateLeaderboardRepository;
import mygroup.tqbcbackend.repository.UserRepository;
import mygroup.tqbcbackend.repository.UserScoreRepository;
import mygroup.tqbcbackend.service.ScoringSettingService;
import mygroup.tqbcbackend.service.UserScoreService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/user-scores")
public class UserScoreController {
	
	@Autowired
	private UserScoreService userScoreService;

	@Autowired
	private UserScoreRepository userScoreRepository;

	// Max number of rows displayed on a leaderboard at once
	int pageSize = 20;

	@Autowired
	private PrivateLeaderboardRepository privateLeaderboardRepository;

	@Autowired
	private ScoringSettingService scoringSettingService;

	@Autowired
	private PrivateLeaderboardMemberRepository privateLeaderboardMemberRepository;
	
	@Autowired
	private UserRepository userRepository;

	@PostMapping("/calculate-user-season-scores")
	public ResponseEntity<?> calculateUserSeasonScores(
		@Valid @RequestBody UserScoreRequest userScoreRequest
	) {
		// Maybe return a count of users scored, maybe just return a successful response
		userScoreService.calculateUserScoreForPredictionPeriodsInSeasonForAllUsers(
			userScoreRequest.getSeason()
		);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/get-season-scores-for-user")
	public Map<String, Float> getSeasonScoresForUser(
		UserScoreRequest userScoreRequest
	) {
		List<UserScore> userScores = userScoreRepository.findByUser_UserIDAndPredictionPeriod_Season(
			userScoreRequest.getUserID(),
			userScoreRequest.getSeason()
		);
		Map<String, Float> scoresByPredictionPeriod = new HashMap<String,Float>();
		for (UserScore userScore : userScores) {
			String key = userScore.getPredictionPeriod().getSeasonPeriodID() == null ?
				"Season" : "SP" + userScore.getPredictionPeriod().getSeasonPeriodID();
			scoresByPredictionPeriod.put(
				key,
				userScore.getScore()
			);
		}
		return scoresByPredictionPeriod;
	}

	@GetMapping("/get-leaderboard-data")
	public LeaderboardResponse getGlobalLeaderboardData(
		UserScoreRequest userScoreRequest
	) {
		LeaderboardResponse leaderboardResponse;
		if (userScoreRequest.getLeaderboardType().equals("global")) {

			List <UserScore> userScores = userScoreRepository.findByPredictionPeriod_Season(
				userScoreRequest.getSeason()
			);
			HashMap<User,HashMap<Long,Float>> user_seasonPeriodScores = new HashMap<User,HashMap<Long,Float>>();
			HashMap<User,Float> user_seasonScore = new HashMap<User,Float>();
	
			for (UserScore userScore : userScores) {
				User user = userScore.getUser();
				if (userScore.getPredictionPeriod().isIsSeasonTotal()) {
					if (user_seasonScore.containsKey(user)) {
						String s = "The userID should not already be in the map";
						throw new IllegalArgumentException(s);
					} else {
						user_seasonScore.put(
							user,
							userScore.getScore()
						);
					}
				} else {
					if (! user_seasonPeriodScores.containsKey(user)) {
						HashMap<Long,Float> seasonPeriodScores = new HashMap<Long,Float>();
						seasonPeriodScores.put(
							userScore.getPredictionPeriod().getSeasonPeriodID(),
							userScore.getScore()
						);
						user_seasonPeriodScores.put(
							user,
							seasonPeriodScores
						);
					} else {
						user_seasonPeriodScores.get(user).put(
							userScore.getPredictionPeriod().getSeasonPeriodID(),
							userScore.getScore()
						);
					}
				}
			}
			List<LeaderboardRow> leaderboardRows = new ArrayList<LeaderboardRow>();
			List<LeaderboardRow> requestingUserLeaderboardRowList = new ArrayList<LeaderboardRow>();
			// long requestingUserIndex = -1;
			for (User user : user_seasonPeriodScores.keySet()) {
				LeaderboardRow leaderboardRow = new LeaderboardRow(
					// user,
					// Hibernate.unproxy(user),
					user.getUserID(),
					user.getUsername(),
					user_seasonPeriodScores.get(user),
					user_seasonScore.get(user)
				);
				leaderboardRows.add(leaderboardRow);
				if (userScoreRequest.getUserID() == user.getUserID()) {
					requestingUserLeaderboardRowList.add(leaderboardRow);
					// requestingUserIndex = leaderboardRows.size() - 1;
				}
			}
			// Order `leaderboardRows` by provided metric
			Collections.sort(
				leaderboardRows,
				(lr1, lr2) -> {
					Long spID = userScoreRequest.getSeasonPeriodID();
					Float lr1Val;
					Float lr2Val;
					Boolean isSeasonScore = String.valueOf(spID).length() == 4;
					if (isSeasonScore) {
						lr1Val = Optional.ofNullable(lr1.getSeasonScore()).orElse(-1.00f);
						lr2Val = Optional.ofNullable(lr2.getSeasonScore()).orElse(-1.00f);
					} else {
						lr1Val = Optional.ofNullable(lr1.getSeasonPeriodScores().get(spID)).orElse(-1.00f);
						lr2Val = Optional.ofNullable(lr2.getSeasonPeriodScores().get(spID)).orElse(-1.00f);
					}
					return lr2Val.compareTo(lr1Val);
				}
			);
			// Split `leaderboardRows` list into list of lists of length `pageSize`
			List<List<LeaderboardRow>> blocks = Lists.partition(leaderboardRows, pageSize);
			int pageCount = blocks.size();
			List<LeaderboardRow> blockToReturn = blocks.get(Math.toIntExact(userScoreRequest.getPageNumber()-1));
			// Don't include separate requesting user row if they're already in the returned rows
			boolean includeSeparateRequestingUserRow = false;
			if (requestingUserLeaderboardRowList.size() > 0) {
				includeSeparateRequestingUserRow = true;
				for (LeaderboardRow leaderboardRow : blockToReturn) {
					if (leaderboardRow.getUserID() == userScoreRequest.getUserID()) {
						includeSeparateRequestingUserRow = false;
						break;
					}
				}
			}
			leaderboardResponse = new LeaderboardResponse(
				blockToReturn,
				pageCount,
				((userScoreRequest.getPageNumber() - 1) * pageSize) + 1
			);
			if (includeSeparateRequestingUserRow) {
				LeaderboardRow requestingUserRow = requestingUserLeaderboardRowList.get(0);
				// Calculate the requesting user's rank
				Integer rank = 1;
				Long spID = userScoreRequest.getSeasonPeriodID();
				Boolean useSeasonScore = String.valueOf(spID).length() == 4;
				Float userScore = userScoreService.getRelevantScore(requestingUserRow, useSeasonScore, spID);
				for (LeaderboardRow leaderboardRow : leaderboardRows) {
					Float score = userScoreService.getRelevantScore(leaderboardRow, useSeasonScore, spID);
					if (score > userScore) {
						rank += 1;
					} else {
						break;
					}
				}
				leaderboardResponse.setRequestingUserRowRank(rank);
				leaderboardResponse.setRequestingUserRow(requestingUserRow);
			}
			
			// return leaderboardResponse;
		} else {
			PrivateLeaderboard privateLeaderboard = privateLeaderboardRepository.findByPrivateLeaderboardUUID(
				userScoreRequest.getPrivateLeaderboardUUID()
			);
			List <UserScore> userScores = userScoreRepository.findByPrivateLeaderboardIDAndSeason(
				privateLeaderboard.getPrivateLeaderboardID(),
				userScoreRequest.getSeason()
			);
				if (userScores.size() != 0) {
					HashMap<User,HashMap<Long,Float>> user_seasonPeriodScores = new HashMap<User,HashMap<Long,Float>>();
					HashMap<User,Float> user_seasonScore = new HashMap<User,Float>();
			
					for (UserScore userScore : userScores) {
						/// Add filter so this doesn't need to happen
						if (!userScore.getPredictionPeriod().isIsSeasonTotal()) {
							User user = userScore.getUser();
							if (! user_seasonPeriodScores.containsKey(user)) {
								HashMap<Long,Float> seasonPeriodScores = new HashMap<Long,Float>();
								seasonPeriodScores.put(
									userScore.getPredictionPeriod().getSeasonPeriodID(),
									userScore.getScore()
								);
								user_seasonPeriodScores.put(
									user,
									seasonPeriodScores
								);
							} else {
								user_seasonPeriodScores.get(user).put(
									userScore.getPredictionPeriod().getSeasonPeriodID(),
									userScore.getScore()
								);
							}
						}
					}
					ScoringSetting scoringSetting = privateLeaderboard.getScoringSetting();
					HashMap<Long,HashMap<String,Integer>> seasonPeriodID_weightings = scoringSettingService.getScoringSettingValuesHashMap(
						scoringSetting
					);
					for (Map.Entry<User,HashMap<Long,Float>> entry : user_seasonPeriodScores.entrySet()) {
						User user = entry.getKey();
						HashMap<Long,Float> seasonPeriodScores = entry.getValue();
						Float seasonScore = 0.00f;
						for (Map.Entry<Long,Float> entry2 : seasonPeriodScores.entrySet()) {
							Long seasonPeriodID = entry2.getKey();
							Float seasonPeriodScore = entry2.getValue();
							Integer numerator = seasonPeriodID_weightings.get(seasonPeriodID).get("numerator");
							Integer denominator = seasonPeriodID_weightings.get(seasonPeriodID).get("denominator");
							Float weightedScore = seasonPeriodScore * numerator / denominator;
							seasonScore += weightedScore;
						}
						user_seasonScore.put(user, seasonScore);
					}
		
		
					List<LeaderboardRow> leaderboardRows = new ArrayList<LeaderboardRow>();
					List<LeaderboardRow> requestingUserLeaderboardRowList = new ArrayList<LeaderboardRow>();
					for (User user : user_seasonPeriodScores.keySet()) {
						LeaderboardRow leaderboardRow = new LeaderboardRow(
							user.getUserID(),
							user.getUsername(),
							user_seasonPeriodScores.get(user),
							user_seasonScore.get(user)
						);
						leaderboardRows.add(leaderboardRow);
						if (userScoreRequest.getUserID() == user.getUserID()) {
							requestingUserLeaderboardRowList.add(leaderboardRow);
						}
					}
					// Order `leaderboardRows` by provided metric
					Collections.sort(
						leaderboardRows,
						(lr1, lr2) -> {
							Long spID = userScoreRequest.getSeasonPeriodID();
							Float lr1Val;
							Float lr2Val;
							Boolean isSeason = String.valueOf(spID).length() == 4;
							if (isSeason) {
								lr1Val = Optional.ofNullable(lr1.getSeasonScore()).orElse(-1.00f);
								lr2Val = Optional.ofNullable(lr2.getSeasonScore()).orElse(-1.00f);
							} else {
								lr1Val = Optional.ofNullable(lr1.getSeasonPeriodScores().get(spID)).orElse(-1.00f);
								lr2Val = Optional.ofNullable(lr2.getSeasonPeriodScores().get(spID)).orElse(-1.00f);
							}
							return lr2Val.compareTo(lr1Val);
						}
					);
					// Split `leaderboardRows` list into list of lists of length `pageSize`
					List<List<LeaderboardRow>> blocks = Lists.partition(leaderboardRows, pageSize);
					int pageCount = blocks.size();
					List<LeaderboardRow> blockToReturn = blocks.get(Math.toIntExact(userScoreRequest.getPageNumber()-1));
					// Don't include separate requesting user row if they're already in the returned rows
					boolean includeSeparateRequestingUserRow = false;
					if (requestingUserLeaderboardRowList.size() > 0) {
						includeSeparateRequestingUserRow = true;
						for (LeaderboardRow leaderboardRow : blockToReturn) {
							if (leaderboardRow.getUserID() == userScoreRequest.getUserID()) {
								includeSeparateRequestingUserRow = false;
								break;
							}
						}
					}
					leaderboardResponse = new LeaderboardResponse(
						blockToReturn,
						pageCount,
						((userScoreRequest.getPageNumber() - 1) * pageSize) + 1
					);
					if (includeSeparateRequestingUserRow) {
						LeaderboardRow requestingUserRow = requestingUserLeaderboardRowList.get(0);
						// Calculate the requesting user's rank
						Integer rank = 1;
						Long spID = userScoreRequest.getSeasonPeriodID();
						Boolean useSeasonScore = String.valueOf(spID).length() == 4;
						Float userScore = userScoreService.getRelevantScore(requestingUserRow, useSeasonScore, spID);
						for (LeaderboardRow leaderboardRow : leaderboardRows) {
							Float score = userScoreService.getRelevantScore(leaderboardRow, useSeasonScore, spID);
							if (score > userScore) {
								rank += 1;
							} else {
								break;
							}
						}
						leaderboardResponse.setRequestingUserRowRank(rank);
						leaderboardResponse.setRequestingUserRow(requestingUserRow);
					}
				} else {
					List<PrivateLeaderboardMember> plMembers = privateLeaderboardMemberRepository.findByPrivateLeaderboard(
						privateLeaderboard	
					);
					List<Long> userIDs = new ArrayList<Long>();
					for (PrivateLeaderboardMember privateLeaderboardMember : plMembers) {
						userIDs.add(
							privateLeaderboardMember.getPrivateLeaderboardMemberCompositeKey().getUserID()
						);
					}
					List<User> users = userRepository.findByUserIDIn(userIDs);
					List<LeaderboardRow> leaderboardRows = new ArrayList<LeaderboardRow>();
					for (User user : users) {
						LeaderboardRow leaderboardRow = new LeaderboardRow(
							user.getUserID(),
							user.getUsername(),
							null,
							null
						);
						leaderboardRows.add(leaderboardRow);
					}
					List<List<LeaderboardRow>> blocks = Lists.partition(leaderboardRows, pageSize);
					int pageCount = blocks.size();
					List<LeaderboardRow> blockToReturn = blocks.get(Math.toIntExact(userScoreRequest.getPageNumber()-1));
					leaderboardResponse = new LeaderboardResponse(
						blockToReturn,
						pageCount,
						((userScoreRequest.getPageNumber() - 1) * pageSize) + 1
					);
				}
			}
		return leaderboardResponse;
	}

    @GetMapping("/get-leaderboard-page-count")
    public int getLeaderboardPageCount(
		UserScoreRequest userScoreRequest
	) {
		long uniqueUserCount;
		if (userScoreRequest.getLeaderboardType().equals("global")) {
			uniqueUserCount = userScoreRepository.findUniqueUsersForSeason(userScoreRequest.getSeason());
		} else {
			PrivateLeaderboard privateLeaderboard = privateLeaderboardRepository.findByPrivateLeaderboardUUID(
				userScoreRequest.getPrivateLeaderboardUUID()
			);
			uniqueUserCount = userScoreRepository.findUniqueUsersForPrivateLeaderboardSeason(
				privateLeaderboard.getPrivateLeaderboardID(),
				userScoreRequest.getSeason()
			);
		}
		// PrivateLeaderboard privateLeaderboard = privateLeaderboardRepository.findByPrivateLeaderboardUUID(
		// 	userScoreRequest.getPrivateLeaderboardUUID()
		// );
		// long uniqueUserCount = privateLeaderboardMemberRepository.countByPrivateLeaderboard(
		// 	privateLeaderboard
		// );
		return (int) Math.ceil((float) uniqueUserCount / (float) pageSize);
    }
}
