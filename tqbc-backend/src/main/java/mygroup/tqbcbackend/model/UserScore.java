package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "UserScores")
public class UserScore {
	
	@EmbeddedId
	private UserScoreCompositeKey userScoreCompositeKey;
	
	@Column(name = "Score")
	private float score;
	
	@ManyToOne(
			targetEntity = PredictionPeriod.class,
			fetch = FetchType.LAZY
	)
	private PredictionPeriod predictionPeriod;
	
	@ManyToOne(
			targetEntity = User.class,
			fetch = FetchType.LAZY
	)
	private User user;
	
	public UserScore() {
		
	}

	public UserScore(UserScoreCompositeKey userScoreCompositeKey, float score) {
		super();
		this.userScoreCompositeKey = userScoreCompositeKey;
		this.score = score;
	}

	public UserScoreCompositeKey getUserScoreCompositeKey() {
		return userScoreCompositeKey;
	}

	public void setUserScoreCompositeKey(UserScoreCompositeKey userScoreCompositeKey) {
		this.userScoreCompositeKey = userScoreCompositeKey;
	}

	public float getScore() {
		return score;
	}

	public void setScore(float score) {
		this.score = score;
	}
	
}
