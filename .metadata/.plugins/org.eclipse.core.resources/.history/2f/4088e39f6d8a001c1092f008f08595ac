package mygroup.tqbcbackend.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Teams")
public class Team {
	@Id
	@OneToMany(mappedBy="Teams")
	@Column(name = "TeamID")
	private String teamID;	
	
	@Column(name = "Season")
	private int season;	
	
	@Column(name = "Location")
	private String location;
	
	@Column(name = "Nickname")
	private String nickname;	
	
	@Column(name = "Conference")
	private String conference;	
	
	@Column(name = "Division")
	private String division;	
	
	@Column(name = "IsActive")
	private boolean isActive;
	
	
	public Team() {
		
	}
	
	public Team(String teamID, int season, String location, String nickname, String conference, String division,
			boolean isActive) {
		super();
		this.teamID = teamID;
		this.season = season;
		this.location = location;
		this.nickname = nickname;
		this.conference = conference;
		this.division = division;
		this.isActive = isActive;
	}
	public String getTeamID() {
		return teamID;
	}
	public void setTeamID(String teamID) {
		this.teamID = teamID;
	}
	public int getSeason() {
		return season;
	}
	public void setSeason(int season) {
		this.season = season;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getConference() {
		return conference;
	}
	public void setConference(String conference) {
		this.conference = conference;
	}
	public String getDivision() {
		return division;
	}
	public void setDivision(String division) {
		this.division = division;
	}
	public boolean isActive() {
		return isActive;
	}
	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	
	
}
