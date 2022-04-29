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
	
	public Answer() {
		
	}

	public Answer(long answerID, Team team, Player player) {
		super();
		this.answerID = answerID;
		this.team = team;
		this.player = player;
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
	
}
