package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Answers")
public class Answer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "AnswerID")
	private long answerID;
	
	@ManyToOne(
			targetEntity = Team.class,
			fetch = FetchType.EAGER
	)
	@JoinColumn(name = "TeamID")
	private Team team;
	
	@ManyToOne(
			targetEntity = Player.class,
			fetch = FetchType.EAGER
	)
	@JoinColumn(name = "PlayerID")
	private Player player;

	@ManyToOne(
			targetEntity = AnswerType.class,
			fetch = FetchType.EAGER
	)
	@JoinColumn(name = "AnswerTypeID")
	private AnswerType answerType;
	
	public Answer() {
		
	}

	public Answer(Team team, Player player, AnswerType answerType) {
		super();
		this.team = team;
		this.player = player;
		this.answerType = answerType;
	}

	public long getAnswerID() {
		return answerID;
	}

	public void setAnswerID(long answerID) {
		this.answerID = answerID;
	}

	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}

	public Player getPlayer() {
		return player;
	}

	public void setPlayer(Player player) {
		this.player = player;
	}

	public AnswerType getAnswerType() {
		return answerType;
	}

	public void setAnswerType(AnswerType answerType) {
		this.answerType = answerType;
	}
	
}
