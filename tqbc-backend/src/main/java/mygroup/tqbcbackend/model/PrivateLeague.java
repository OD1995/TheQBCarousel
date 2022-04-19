package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "PrivateLeagues")
public class PrivateLeague {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LeagueID")
	private long leagueID;
	
//	@Column(name = "OwnerUserID")
//	private String ownerUserID;
	
	@OneToOne(
			targetEntity = User.class,
			fetch = FetchType.LAZY
	)
	@JoinColumn(name = "OwnerUserID")
	private User ownerUser;
	
	@Column(name = "ScoringSettingsID")
	private String scoringSettingsID;
	
	public PrivateLeague() {
		
	}

	public PrivateLeague(long leagueID, User ownerUser, String scoringSettingsID) {
		super();
		this.leagueID = leagueID;
		this.ownerUser = ownerUser;
		this.scoringSettingsID = scoringSettingsID;
	}

	public long getLeagueID() {
		return leagueID;
	}

	public void setLeagueID(long leagueID) {
		this.leagueID = leagueID;
	}

	public User getOwnerUser() {
		return ownerUser;
	}

	public void setOwnerUser(User ownerUser) {
		this.ownerUser = ownerUser;
	}

	public String getScoringSettingsID() {
		return scoringSettingsID;
	}

	public void setScoringSettingsID(String scoringSettingsID) {
		this.scoringSettingsID = scoringSettingsID;
	}

}

