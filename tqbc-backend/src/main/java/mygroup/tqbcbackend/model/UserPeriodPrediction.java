package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Table(name = "UserPeriodPredictions")
@IdClass(UserPeriodPredictionCompositeKey.class)
public class UserPeriodPrediction {

	@Id
	@Column(name = "PredictionPeriodID")
	private String predictionPeriodID;
	
	@Id
	@Column(name = "UserID")
	private String userID;
	
	public UserPeriodPrediction() {
		
	}

	public UserPeriodPrediction(String predictionPeriodID, String userID) {
		super();
		this.predictionPeriodID = predictionPeriodID;
		this.userID = userID;
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
	
}
