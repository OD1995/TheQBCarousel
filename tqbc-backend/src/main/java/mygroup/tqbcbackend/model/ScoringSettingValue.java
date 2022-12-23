package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.criteria.CriteriaBuilder.In;

@Entity
@Table(name = "ScoringSettingValues")
public class ScoringSettingValue {

	@EmbeddedId
	private ScoringSettingValueCompositeKey scoringSettingValueCompositeKey;
	
//	@Column(name = "ScoringPeriodID")
//	private long scoringPeriodID;
	
	@Column(name = "Numerator")
	private Integer numerator;

	@Column(name = "Denominator")
	private Integer denominator;

	@Column(name = "Value")
	private double value;
	
	@ManyToOne(
		targetEntity = ScoringSetting.class,
		fetch = FetchType.LAZY
	)
	@JoinColumn(name = "ScoringSettingID", nullable = false, insertable = false, updatable = false)
	private ScoringSetting scoringSetting;	
	
	public ScoringSettingValue() {
		
	}

	public ScoringSettingValue(
		ScoringSettingValueCompositeKey scoringSettingValueCompositeKey,
		Integer numerator,
		Integer denominator,
		double value
	) {
		super();
		this.scoringSettingValueCompositeKey = scoringSettingValueCompositeKey;
		this.numerator = numerator;
		this.denominator = denominator;
		this.value = value;
	}

	public ScoringSetting getScoringSetting() {
		return scoringSetting;
	}

	public void setScoringSetting(ScoringSetting scoringSetting) {
		this.scoringSetting = scoringSetting;
	}

//	public long getScoringPeriodID() {
//		return scoringPeriodID;
//	}
//
//	public void setScoringPeriodID(long scoringPeriodID) {
//		this.scoringPeriodID = scoringPeriodID;
//	}

	public double getValue() {
		return value;
	}

	public void setValue(double value) {
		this.value = value;
	}
	
}
