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

@Entity
@Table(name = "userscores")
public class UserScore {
	
	@EmbeddedId
	private UserScoreCompositeKey userScoreCompositeKey;
	
	@Column(name = "Score")
	private float score;
	
	@ManyToOne(
			targetEntity = PredictionPeriod.class,
			fetch = FetchType.LAZY
	)
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
	
	@ManyToOne(
			targetEntity = User.class,
			fetch = FetchType.LAZY
	)
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
	
	public UserScore() {
		
	}

	public UserScore(UserScoreCompositeKey userScoreCompositeKey, float score) {
		super();
		this.userScoreCompositeKey = userScoreCompositeKey;
		this.score = score;
	}

	public UserScoreCompositeKey getUserScoreCompositeKey() {
		return userScoreCompositeKey;
	}

	public void setUserScoreCompositeKey(UserScoreCompositeKey userScoreCompositeKey) {
		this.userScoreCompositeKey = userScoreCompositeKey;
	}

	public float getScore() {
		return score;
	}

	public void setScore(float score) {
		this.score = score;
	}

	public PredictionPeriod getPredictionPeriod() {
		return this.predictionPeriod;
	}

	public void setPredictionPeriod(PredictionPeriod predictionPeriod) {
		this.predictionPeriod = predictionPeriod;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
