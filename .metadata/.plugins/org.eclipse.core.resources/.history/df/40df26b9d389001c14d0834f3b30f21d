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
	
	@Column(name = "FirstName")
	private String firstName;
	
	@Column(name = "LastName")
	private String lastName;
	
	@Column(name = "DefaultTeamID")
	private String defaultTeamID;
	
	public Player() {
		
	}
	
	public Player(String playerID, String firstName, String lastName, String defaultTeamID) {
		super();
		this.playerID = playerID;
		this.firstName = firstName;
		this.lastName = lastName;
		this.defaultTeamID = defaultTeamID;
	}

	public String getPlayerID() {
		return playerID;
	}

	public void setPlayerID(String playerID) {
		this.playerID = playerID;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getDefaultTeamID() {
		return defaultTeamID;
	}

	public void setDefaultTeamID(String defaultTeamID) {
		this.defaultTeamID = defaultTeamID;
	}
	
	
}