package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Players")
public class Player {
	@Id
	@Column(name = "PlayerID")
	private String playerID;
	
	@Column(name = "Name")
	private String name;
	
	@Column(name = "DefaultTeamID")
	private String defaultTeamID;
	
	@Column(name = "IsActive")
	private boolean isActive;
	
	public Player() {
		
	}

	public Player(String playerID, String name, String defaultTeamID, boolean isActive) {
		super();
		this.playerID = playerID;
		this.name = name;
		this.defaultTeamID = defaultTeamID;
		this.isActive = isActive;
	}

	public String getPlayerID() {
		return playerID;
	}

	public void setPlayerID(String playerID) {
		this.playerID = playerID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDefaultTeamID() {
		return defaultTeamID;
	}

	public void setDefaultTeamID(String defaultTeamID) {
		this.defaultTeamID = defaultTeamID;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

}