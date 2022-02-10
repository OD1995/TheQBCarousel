package mygroup.tqbcbackend.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

public class WeekPredictionCompositeKey implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Date predictionAtDateTime;
	private String predictionPeriodID;
	private String userID;
	private String teamID;
	
	public WeekPredictionCompositeKey() {
		
	}

	public WeekPredictionCompositeKey(Date predictionAtDateTime, String predictionPeriodID, String userID,
			String teamID) {
		this.predictionAtDateTime = predictionAtDateTime;
		this.predictionPeriodID = predictionPeriodID;
		this.userID = userID;
		this.teamID = teamID;
	}

	@Override
	public int hashCode() {
		return Objects.hash(predictionAtDateTime, predictionPeriodID, teamID, userID);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		WeekPredictionCompositeKey other = (WeekPredictionCompositeKey) obj;
		return Objects.equals(predictionAtDateTime, other.predictionAtDateTime)
				&& Objects.equals(predictionPeriodID, other.predictionPeriodID) && Objects.equals(teamID, other.teamID)
				&& Objects.equals(userID, other.userID);
	}
	
}
