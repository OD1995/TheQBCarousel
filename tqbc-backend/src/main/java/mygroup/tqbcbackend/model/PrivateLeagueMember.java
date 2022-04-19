package mygroup.tqbcbackend.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "PrivateLeagueMembers")
public class PrivateLeagueMember {
	
	@EmbeddedId
	private PrivateLeagueMemberCompositeKey privateLeagueMemberCompositeKey;
	
	@ManyToOne(targetEntity = PrivateLeague.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "LeagueID", nullable = false, insertable = false, updatable = false)
	private PrivateLeague privateLeague;
	
	@ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "UserID", nullable = false, insertable = false, updatable = false)
	private User user;
	
	
	public PrivateLeagueMember() {
		
	}


	public PrivateLeagueMember(PrivateLeagueMemberCompositeKey privateLeagueMemberCompositeKey) {
		super();
		this.privateLeagueMemberCompositeKey = privateLeagueMemberCompositeKey;
	}


	public PrivateLeagueMemberCompositeKey getPrivateLeagueMemberCompositeKey() {
		return privateLeagueMemberCompositeKey;
	}


	public void setPrivateLeagueMemberCompositeKey(PrivateLeagueMemberCompositeKey privateLeagueMemberCompositeKey) {
		this.privateLeagueMemberCompositeKey = privateLeagueMemberCompositeKey;
	}
	
}
