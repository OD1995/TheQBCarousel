package mygroup.tqbcbackend.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name = "PeriodPredictions")
public class PeriodPrediction {
	
	@EmbeddedId
	private PeriodPredictionCompositeKey periodPredictionCompositeKey;
	
	@ManyToOne(targetEntity = PredictionPeriod.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "PredictionPeriodID", nullable = false, insertable = false, updatable = false)
	private PredictionPeriod predictionPeriod;

	@ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "UserID", nullable = false, insertable = false, updatable = false)
	private User user;

	@ManyToOne(targetEntity = Team.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "TeamID", nullable = false, insertable = false, updatable = false)
	private Team team;

	@ManyToOne(targetEntity = Player.class, fetch = FetchType.LAZY)
	@MapsId("PlayerID")
	@JoinColumn(name = "PlayerID", nullable = false)
	private Player player;

	public PeriodPrediction() {

	}

	public PeriodPrediction(PeriodPredictionCompositeKey periodPredictionCompositeKey, Player player) {
		super();
		this.periodPredictionCompositeKey = periodPredictionCompositeKey;
		this.player = player;
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

	
	
}
