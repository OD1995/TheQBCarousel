package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;


@Entity
@Table(name = "PrivateLeagueMembers")
@IdClass(PrivateLeagueMemberCompositeKey.class)
public class PrivateLeagueMember {

	@Id
	@Column(name = "LeagueID")
	private long leagueID;
	
	@Id
	@Column(name = "UserID")
	private long userID;
	
	public PrivateLeagueMember() {
		
	}

	public PrivateLeagueMember(long leagueID, long userID) {
		super();
		this.leagueID = leagueID;
		this.userID = userID;
	}

	public long getLeagueID() {
		return leagueID;
	}

	public void setLeagueID(long leagueID) {
		this.leagueID = leagueID;
	}

	public long getUserID() {
		return userID;
	}

	public void setUserID(long userID) {
		this.userID = userID;
	}
	
}
