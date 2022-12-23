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
	
	@Column(name = "SeasonPeriodID")
	private long seasonPeriodID;
	
	public ScoringSettingValueCompositeKey() {
		
	}

	public ScoringSettingValueCompositeKey(
		long scoringSettingID,
		long seasonPeriodID
	) {
		this.scoringSettingID = scoringSettingID;
		this.seasonPeriodID = seasonPeriodID;
	}

	@Override
	public int hashCode() {
		return Objects.hash(seasonPeriodID, scoringSettingID);
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
		return seasonPeriodID == other.seasonPeriodID && scoringSettingID == other.scoringSettingID;
	}

	public long getScoringSettingID() {
		return this.scoringSettingID;
	}

	public void setScoringSettingID(long scoringSettingID) {
		this.scoringSettingID = scoringSettingID;
	}

	public long getSeasonPeriodID() {
		return this.seasonPeriodID;
	}

	public void setSeasonPeriodID(long seasonPeriodID) {
		this.seasonPeriodID = seasonPeriodID;
	}
	
	
}
