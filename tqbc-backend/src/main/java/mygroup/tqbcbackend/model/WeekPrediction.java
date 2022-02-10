package mygroup.tqbcbackend.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Table(name = "WeekPredictions")
@IdClass(WeekPredictionCompositeKey.class)
public class WeekPrediction {
	
	@Id
	@Column(name = "PredictionAtDateTime")
	private Date predictionAtDateTime;
	
	@Id
	@Column(name = "PredictionPeriodID")
	private String predictionPeriodID;
	
	@Id
	@Column(name = "UserID")
	private String userID;
	
	@Id
	@Column(name = "TeamID")
	private String teamID;
	
	@Column(name = "PlayerID")
	private String playerID;
	
	public WeekPrediction() {
		
	}

	public WeekPrediction(Date predictionAtDateTime, String predictionPeriodID, String userID, String teamID,
			String playerID) {
		super();
		this.predictionAtDateTime = predictionAtDateTime;
		this.predictionPeriodID = predictionPeriodID;
		this.userID = userID;
		this.teamID = teamID;
		this.playerID = playerID;
	}

	public Date getPredictionAtDateTime() {
		return predictionAtDateTime;
	}

	public void setPredictionAtDateTime(Date predictionAtDateTime) {
		this.predictionAtDateTime = predictionAtDateTime;
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

	public String getTeamID() {
		return teamID;
	}

	public void setTeamID(String teamID) {
		this.teamID = teamID;
	}

	public String getPlayerID() {
		return playerID;
	}

	public void setPlayerID(String playerID) {
		this.playerID = playerID;
	}
	
	
}
