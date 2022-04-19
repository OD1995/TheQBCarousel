package mygroup.tqbcbackend.model;

import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "PrivateLeagues")
public class PrivateLeague {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LeagueID")
	private long leagueID;
		
	@OneToOne(
			targetEntity = User.class,
			fetch = FetchType.LAZY
	)
	@JoinColumn(name = "OwnerUserID")
	private User ownerUser;
		
	@ManyToOne(
			targetEntity = ScoringSetting.class,
			fetch = FetchType.LAZY
	)
	@JoinColumn(name = "ScoringSettingID")
	private ScoringSetting scoringSetting;
	
	@Column(name = "LeagueUUID")
	private UUID leagueUUID;
	
	@OneToMany(
			targetEntity = PrivateLeagueMember.class,
			fetch = FetchType.LAZY,
			mappedBy = "privateLeague"
	)
	private List<PrivateLeagueMember> privateLeagueMembers;
	
	public PrivateLeague() {
		
	}

	public PrivateLeague(long leagueID, User ownerUser, ScoringSetting scoringSetting) {
		super();
		this.leagueID = leagueID;
		this.ownerUser = ownerUser;
		this.scoringSetting = scoringSetting;
		this.leagueUUID = UUID.randomUUID();
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

	public ScoringSetting getScoringSetting() {
		return scoringSetting;
	}

	public void setScoringSetting(ScoringSetting scoringSetting) {
		this.scoringSetting = scoringSetting;
	}

	public UUID getLeagueUUID() {
		return leagueUUID;
	}

}

