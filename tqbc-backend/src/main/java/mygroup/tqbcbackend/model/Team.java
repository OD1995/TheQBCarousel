package mygroup.tqbcbackend.model;


import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Teams")
public class Team {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TeamID")
	private Long teamID;	
	
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
	
	@Column(name = "GridColumn")
	private int gridColumn;
	
	@Column(name = "GridRow")
	private int gridRow;
	
	@OneToOne(
			targetEntity = Player.class,
			fetch = FetchType.EAGER
	)
	@JoinColumn(name = "DefaultPlayerID")
//	@JsonIgnore
	private Player defaultPlayer;
	
	@OneToMany(
			targetEntity = PeriodPrediction.class,
			fetch = FetchType.LAZY,
			mappedBy = "team"
	)
	private List<PeriodPrediction> periodPredictions;
	
	@OneToMany(
			targetEntity = User.class,
			fetch = FetchType.LAZY,
			mappedBy = "favouriteTeam"
	)
	private List<User> fans;
	
	
	public Team() {
		
	}

	public Team(Long teamID, int season, String location, String nickname, String conference, String division,
			boolean isActive, int gridColumn, int gridRow, Player defaultPlayer) {
		super();
		this.teamID = teamID;
		this.season = season;
		this.location = location;
		this.nickname = nickname;
		this.conference = conference;
		this.division = division;
		this.isActive = isActive;
		this.gridColumn = gridColumn;
		this.gridRow = gridRow;
		this.defaultPlayer = defaultPlayer;
	}

	public Long getTeamID() {
		return teamID;
	}

	public void setTeamID(Long teamID) {
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

	public int getGridColumn() {
		return gridColumn;
	}

	public void setGridColumn(int gridColumn) {
		this.gridColumn = gridColumn;
	}

	public int getGridRow() {
		return gridRow;
	}

	public void setGridRow(int gridRow) {
		this.gridRow = gridRow;
	}

	public Player getDefaultPlayer() {
		return defaultPlayer;
	}

	public void setDefaultPlayer(Player defaultPlayer) {
		this.defaultPlayer = defaultPlayer;
	}

}
