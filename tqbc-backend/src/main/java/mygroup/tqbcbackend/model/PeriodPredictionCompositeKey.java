package mygroup.tqbcbackend.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;

@Embeddable
public class PeriodPredictionCompositeKey implements Serializable {

    private static final long serialVersionUID = 1L;

    private long predictionPeriodID;
    private long userID;
    private long teamID;

	public PeriodPredictionCompositeKey() {
    	
    }
    
    public PeriodPredictionCompositeKey(
    		long predictionPeriodID,
    		long userID,
    		long teamID
    ) {
    	this.predictionPeriodID = predictionPeriodID;
    	this.userID = userID;
    	this.teamID = teamID;
    }
    
    @Override
	public int hashCode() {
		return Objects.hash(predictionPeriodID, teamID, userID);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PeriodPredictionCompositeKey other = (PeriodPredictionCompositeKey) obj;
		return predictionPeriodID == other.predictionPeriodID && teamID == other.teamID && userID == other.userID;
	}
    
}
