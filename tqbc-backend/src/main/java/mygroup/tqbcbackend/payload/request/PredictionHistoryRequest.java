package mygroup.tqbcbackend.payload.request;

public class PredictionHistoryRequest {

	private long userID;
	
	private String username;
	
	private long predictionPeriodID;
	
	private long season;

	public long getUserID() {
		return userID;
	}
	
	public void setUserID(long userID) {
		this.userID = userID;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public long getPredictionPeriodID() {
		return predictionPeriodID;
	}

	public void setPredictionPeriodID(long predictionPeriodID) {
		this.predictionPeriodID = predictionPeriodID;
	}

	public long getSeason() {
		return season;
	}

	public void setSeason(long season) {
		this.season = season;
	}

}
