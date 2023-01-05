package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "scoringsettingvalues")
public class ScoringSettingValue {

	@EmbeddedId
	private ScoringSettingValueCompositeKey scoringSettingValueCompositeKey;
		
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
	@JoinColumn(
		name = "ScoringSettingID",
		nullable = false,
		insertable = false,
		updatable = false,
		foreignKey = @ForeignKey(
			name = "none",
			value = ConstraintMode.NO_CONSTRAINT
		)
	)
	@JsonBackReference
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

	public double getValue() {
		return value;
	}

	public void setValue(double value) {
		this.value = value;
	}

	public ScoringSettingValueCompositeKey getScoringSettingValueCompositeKey() {
		return this.scoringSettingValueCompositeKey;
	}

	public void setScoringSettingValueCompositeKey(ScoringSettingValueCompositeKey scoringSettingValueCompositeKey) {
		this.scoringSettingValueCompositeKey = scoringSettingValueCompositeKey;
	}

	public Integer getNumerator() {
		return this.numerator;
	}

	public void setNumerator(Integer numerator) {
		this.numerator = numerator;
	}

	public Integer getDenominator() {
		return this.denominator;
	}

	public void setDenominator(Integer denominator) {
		this.denominator = denominator;
	}
	
}
