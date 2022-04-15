package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Table(name = "UserScores")
@IdClass(UserScoreCompositeKey.class)
public class UserScore {

	@Id
	@Column(name = "PredictionPeriodID")
	private long predictionPeriodID;
	
	@Id
	@Column(name = "UserID")
	private long userID;
	
	@Column(name = "Score")
	private float score;
	
	public UserScore() {
		
	}

	public UserScore(long predictionPeriodID, long userID, float score) {
		super();
		this.predictionPeriodID = predictionPeriodID;
		this.userID = userID;
		this.score = score;
	}

	public long getPredictionPeriodID() {
		return predictionPeriodID;
	}

	public void setPredictionPeriodID(long predictionPeriodID) {
		this.predictionPeriodID = predictionPeriodID;
	}

	public long getUserID() {
		return userID;
	}

	public void setUserID(long userID) {
		this.userID = userID;
	}

	public float getScore() {
		return score;
	}

	public void setScore(float score) {
		this.score = score;
	}
	
}
