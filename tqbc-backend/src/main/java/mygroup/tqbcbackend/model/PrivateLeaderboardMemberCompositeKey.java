package mygroup.tqbcbackend.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class PrivateLeaderboardMemberCompositeKey implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Column(name = "PrivateLeaderboardID")
	private long privateLeaderboardID;
	
	@Column(name = "UserID")
	private long userID;
	
	public PrivateLeaderboardMemberCompositeKey(long privateLeaderboardID,long userID) {
		this.privateLeaderboardID = privateLeaderboardID;
		this.userID = userID;
	}

	public PrivateLeaderboardMemberCompositeKey() {
		
	}

	@Override
	public int hashCode() {
		return Objects.hash(privateLeaderboardID, userID);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PrivateLeaderboardMemberCompositeKey other = (PrivateLeaderboardMemberCompositeKey) obj;
		return Objects.equals(privateLeaderboardID, other.privateLeaderboardID) && Objects.equals(userID, other.userID);
	}
	
}
