package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ScoringSettingValues")
public class ScoringSettingValue {

	@EmbeddedId
	private ScoringSettingValueCompositeKey scoringSettingValueCompositeKey;
	
	@Column(name = "ScoringPeriodID")
	private long scoringPeriodID;
	
	@Column(name = "Value")
	private double value;
	
	@ManyToOne(
		targetEntity = ScoringSetting.class,
		fetch = FetchType.LAZY
	)
	private ScoringSetting scoringSettingDescription;	
	
	public ScoringSettingValue() {
		
	}

	public ScoringSetting getScoringSettingDescription() {
		return scoringSettingDescription;
	}

	public void setScoringSettingDescription(ScoringSetting scoringSettingDescription) {
		this.scoringSettingDescription = scoringSettingDescription;
	}

	public long getScoringPeriodID() {
		return scoringPeriodID;
	}

	public void setScoringPeriodID(long scoringPeriodID) {
		this.scoringPeriodID = scoringPeriodID;
	}

	public double getValue() {
		return value;
	}

	public void setValue(double value) {
		this.value = value;
	}
	
}
