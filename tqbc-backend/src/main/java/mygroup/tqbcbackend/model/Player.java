package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Players")
public class Player {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PlayerID")
	private long playerID;
	
	@Column(name = "Name")
	private String name;
	
	@Column(name = "DefaultTeamID")
	private Long defaultTeamID;
	
	@Column(name = "IsActive")
	private boolean isActive;
	
	public Player() {
		
	}

	public Player(long playerID, String name, Long defaultTeamID, boolean isActive) {
		super();
		this.playerID = playerID;
		this.name = name;
		this.defaultTeamID = defaultTeamID;
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

	public Long getDefaultTeamID() {
		return defaultTeamID;
	}

	public void setDefaultTeamID(Long defaultTeamID) {
		this.defaultTeamID = defaultTeamID;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

}