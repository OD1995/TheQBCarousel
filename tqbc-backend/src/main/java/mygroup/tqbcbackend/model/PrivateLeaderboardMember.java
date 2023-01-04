package mygroup.tqbcbackend.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "privateleaderboardmembers")
public class PrivateLeaderboardMember {
	
	@EmbeddedId
	private PrivateLeaderboardMemberCompositeKey privateLeaderboardMemberCompositeKey;
	
	@ManyToOne(targetEntity = PrivateLeaderboard.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "PrivateLeaderboardID", nullable = false, insertable = false, updatable = false)
	// @JsonBackReference
	// @JsonManagedReference
	private PrivateLeaderboard privateLeaderboard;
	
	@ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "UserID", nullable = false, insertable = false, updatable = false)
	private User user;
	
	
	public PrivateLeaderboardMember() {
		
	}


	public PrivateLeaderboardMember(PrivateLeaderboardMemberCompositeKey privateLeaderboardMemberCompositeKey) {
		super();
		this.privateLeaderboardMemberCompositeKey = privateLeaderboardMemberCompositeKey;
	}


	public PrivateLeaderboardMemberCompositeKey getPrivateLeaderboardMemberCompositeKey() {
		return privateLeaderboardMemberCompositeKey;
	}


	public void setPrivateLeaderboardMemberCompositeKey(PrivateLeaderboardMemberCompositeKey privateLeaderboardMemberCompositeKey) {
		this.privateLeaderboardMemberCompositeKey = privateLeaderboardMemberCompositeKey;
	}
	
	public PrivateLeaderboard getPrivateLeaderboard() {
		return this.privateLeaderboard;
	}

	public void setPrivateLeaderboard(PrivateLeaderboard privateLeaderboard) {
		this.privateLeaderboard = privateLeaderboard;
	}
}
