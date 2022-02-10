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
	private String predictionPeriodID;
	
	@Id
	@Column(name = "UserID")
	private String userID;
	
	@Column(name = "Score")
	private float score;
	
	public UserScore() {
		
	}

	public UserScore(String predictionPeriodID, String userID, float score) {
		super();
		this.predictionPeriodID = predictionPeriodID;
		this.userID = userID;
		this.score = score;
	}

	public String getPredictionPeriodID() {
		return predictionPeriodID;
	}

	public void setPredictionPeriodID(String predictionPeriodID) {
		this.predictionPeriodID = predictionPeriodID;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public float getScore() {
		return score;
	}

	public void setScore(float score) {
		this.score = score;
	}
	
}
