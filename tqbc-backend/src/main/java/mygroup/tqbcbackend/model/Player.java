package mygroup.tqbcbackend.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.lang.Nullable;

@Entity
@Table(name = "Players")
public class Player {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "PlayerID")
	private long playerID;
	
	@Column(name = "Name")
	private String name;
	
	@Column(name = "IsActive")
	private boolean isActive;
	
	@OneToMany(
			targetEntity = PeriodPrediction.class,
			fetch = FetchType.LAZY,
			mappedBy = "player"
	)
	private List<PeriodPrediction> periodPredictions;
	
	@OneToOne(
			targetEntity = Team.class,
			fetch = FetchType.LAZY,
			mappedBy = "defaultPlayer"
	)
	@Nullable
	private Team defaultTeam;
	
	public Player() {
		
	}

	public Player(long playerID, String name, boolean isActive) {
		super();
		this.playerID = playerID;
		this.name = name;
		this.isActive = isActive;
	}

	public long getPlayerID() {
		return playerID;
	}

	public void setPlayerID(long playerID) {
		this.playerID = playerID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

}