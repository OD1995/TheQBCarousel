package mygroup.tqbcbackend.model;

import java.io.Serializable;
import java.util.Objects;

public class UserPeriodPredictionCompositeKey implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private String predictionPeriodID;
	private String userID;
	
	public UserPeriodPredictionCompositeKey() {
		
	}

	public UserPeriodPredictionCompositeKey(String predictionPeriodID, String userID) {
		this.predictionPeriodID = predictionPeriodID;
		this.userID = userID;
	}

	@Override
	public int hashCode() {
		return Objects.hash(predictionPeriodID, userID);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserPeriodPredictionCompositeKey other = (UserPeriodPredictionCompositeKey) obj;
		return Objects.equals(predictionPeriodID, other.predictionPeriodID) && Objects.equals(userID, other.userID);
	}
	
}
