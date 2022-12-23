package mygroup.tqbcbackend.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class ScoringSettingValueCompositeKey implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Column(name = "ScoringSettingID")
	private long scoringSettingID;
	
	@Column(name = "ScoringPeriodID")
	private long scoringPeriodID;
	
	public ScoringSettingValueCompositeKey() {
		
	}

	public ScoringSettingValueCompositeKey(
		long scoringSettingID,
		long scoringPeriodID
	) {
		this.scoringSettingID = scoringSettingID;
		this.scoringPeriodID = scoringPeriodID;
	}

	@Override
	public int hashCode() {
		return Objects.hash(scoringPeriodID, scoringSettingID);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ScoringSettingValueCompositeKey other = (ScoringSettingValueCompositeKey) obj;
		return scoringPeriodID == other.scoringPeriodID && scoringSettingID == other.scoringSettingID;
	}
	
	
}
