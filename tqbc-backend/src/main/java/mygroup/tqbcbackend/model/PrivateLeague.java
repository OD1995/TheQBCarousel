package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PrivateLeagues")
public class PrivateLeague {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LeagueID")
	private long leagueID;
	
	@Column(name = "OwnerUserID")
	private String ownerUserID;
	
	@Column(name = "ScoringSettingsID")
	private String scoringSettingsID;
	
	public PrivateLeague() {
		
	}

	public PrivateLeague(long leagueID, String ownerUserID, String scoringSettingsID) {
		super();
		this.leagueID = leagueID;
		this.ownerUserID = ownerUserID;
		this.scoringSettingsID = scoringSettingsID;
	}

	public long getLeagueID() {
		return leagueID;
	}

	public void setLeagueID(long leagueID) {
		this.leagueID = leagueID;
	}

	public String getOwnerUserID() {
		return ownerUserID;
	}

	public void setOwnerUserID(String ownerUserID) {
		this.ownerUserID = ownerUserID;
	}

	public String getScoringSettingsID() {
		return scoringSettingsID;
	}

	public void setScoringSettingsID(String scoringSettingsID) {
		this.scoringSettingsID = scoringSettingsID;
	}
	
}

