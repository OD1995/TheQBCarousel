package mygroup.tqbcbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import mygroup.tqbcbackend.model.Answer;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
	
	public List<Answer> findByTeam_Season(long season);
	public List<Answer> findByTeam_SeasonAndTeam_Conference(long season, String conference);
	// @Modifying
	// public int deleteByTeam_TeamIDAndAnswerType_AnswerTypeID(long teamID, long answerTypeID);
	public List<Answer> findByTeam_TeamIDAndAnswerType_AnswerTypeID(long teamID, long answerTypeID);
	
	@Query(
		value = "SELECT max(a.team.season) FROM Answer a"
	)
	public long findMaxSeason();

	@Query(
		value = "SELECT distinct(a.team.season) FROM Answer a"
	)
	public List<Long> findUniqueSeasons();
}
