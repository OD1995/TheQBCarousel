package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Table(name = "PeriodPredictions")
@IdClass(PeriodPredictionCompositeKey.class)
public class PeriodPrediction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PredictionPeriodID")
	private long predictionPeriodID;

	@Id
	@Column(name = "UserID")
	private long userID;

	@Id
	@Column(name = "TeamID")
	private long teamID;

	@Column(name = "PlayerID")
	private long playerID;

	public PeriodPrediction() {

	}

	public PeriodPrediction(
			long predictionPeriodID,
			long userID,
			long teamID,
			long playerID
	) {
		super();
		this.predictionPeriodID = predictionPeriodID;
		this.userID = userID;
		this.teamID = teamID;
		this.playerID = playerID;
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

	public long getTeamID() {
		return teamID;
	}

	public void setTeamID(long teamID) {
		this.teamID = teamID;
	}

	public long getPlayerID() {
		return playerID;
	}

	public void setPlayerID(long playerID) {
		this.playerID = playerID;
	}

}
