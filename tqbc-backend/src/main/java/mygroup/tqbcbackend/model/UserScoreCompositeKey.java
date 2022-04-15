package mygroup.tqbcbackend.model;

import java.io.Serializable;
import java.util.Objects;

public class UserScoreCompositeKey implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private long predictionPeriodID;
	private long userID;
	
	public UserScoreCompositeKey() {
		
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
		UserScoreCompositeKey other = (UserScoreCompositeKey) obj;
		return Objects.equals(predictionPeriodID, other.predictionPeriodID) && Objects.equals(userID, other.userID);
	}
	
}
