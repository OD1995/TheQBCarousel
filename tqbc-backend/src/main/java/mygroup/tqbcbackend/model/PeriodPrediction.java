package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.Id;

public class PeriodPrediction {
	@Id
	@Column(name="PredictionPeriodID")
	private String predictionPeriodID;
	
	@Column(name="UserID")
	private String userID;
	
	@Column(name="TeamID")
	private String teamID;
	
	@Column(name="PlayerID")
	private String playerID;
	
	public PeriodPrediction() {
		
	}

	public PeriodPrediction(String predictionPeriodID, String userID, String teamID, String playerID) {
		super();
		this.predictionPeriodID = predictionPeriodID;
		this.userID = userID;
		this.teamID = teamID;
		this.playerID = playerID;
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
