package mygroup.tqbcbackend.model;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "periodpredictions")
public class PeriodPrediction {
	
	@EmbeddedId
	private PeriodPredictionCompositeKey periodPredictionCompositeKey;
	
	@ManyToOne(targetEntity = PredictionPeriod.class, fetch = FetchType.EAGER)
	@JoinColumn(
		name = "PredictionPeriodID",
		nullable = false,
		insertable = false,
		updatable = false,
		foreignKey = @ForeignKey(
			name = "none",
			value = ConstraintMode.NO_CONSTRAINT
		)
	
	)
	private PredictionPeriod predictionPeriod;

	@ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
	@JoinColumn(
		name = "UserID",
		nullable = false,
		insertable = false,
		updatable = false,
		foreignKey = @ForeignKey(
			name = "none",
			value = ConstraintMode.NO_CONSTRAINT
		)
	)
	private User user;

	@ManyToOne(targetEntity = Team.class, fetch = FetchType.EAGER)
	@JoinColumn(
		name = "TeamID",
		nullable = false,
		insertable = false,
		updatable = false,
		foreignKey = @ForeignKey(
			name = "none",
			value = ConstraintMode.NO_CONSTRAINT
		)
	)
	private Team team;

	@ManyToOne(targetEntity = Player.class, fetch = FetchType.EAGER)
	@JoinColumn(
		name = "PlayerID",
		nullable = false,
		foreignKey = @ForeignKey(
			name = "none",
			value = ConstraintMode.NO_CONSTRAINT
		)
	)
	private Player player;
	
	@Column(name = "PredictionDateTimeUTC")
	// @Temporal(TemporalType.TIMESTAMP)
	private Instant predictionDateTimeUTC;
	
	@Column(name = "IsCorrect")
	private Boolean isCorrect;

	public PeriodPrediction() {

	}

	public PeriodPrediction(
		long predictionPeriodID,
		long userID,
		long teamID,
		Player player,
		Boolean isCorrect
	) {
		super();
		this.periodPredictionCompositeKey = new PeriodPredictionCompositeKey(predictionPeriodID, userID, teamID);
		this.player = player;
		this.predictionDateTimeUTC = Instant.now();
		this.isCorrect = isCorrect;
	}

	public PeriodPredictionCompositeKey getPeriodPredictionCompositeKey() {
		return periodPredictionCompositeKey;
	}

	public void setPeriodPredictionCompositeKey(PeriodPredictionCompositeKey periodPredictionCompositeKey) {
		this.periodPredictionCompositeKey = periodPredictionCompositeKey;
	}

	public Player getPlayer() {
		return player;
	}

	public void setPlayer(Player player) {
		this.player = player;
	}

	public Instant getPredictionDateTimeUTC() {
		return predictionDateTimeUTC;
	}

	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}

	public Boolean isCorrect() {
		return isCorrect;
	}

	public void setCorrect(Boolean isCorrect) {
		this.isCorrect = isCorrect;
	}

}
