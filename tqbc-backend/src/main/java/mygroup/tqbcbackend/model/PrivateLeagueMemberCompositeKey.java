package mygroup.tqbcbackend.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class PrivateLeagueMemberCompositeKey implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Column(name = "LeagueID")
	private long leagueID;
	
	@Column(name = "UserID")
	private long userID;
	
	public PrivateLeagueMemberCompositeKey() {
		
	}

	@Override
	public int hashCode() {
		return Objects.hash(leagueID, userID);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PrivateLeagueMemberCompositeKey other = (PrivateLeagueMemberCompositeKey) obj;
		return Objects.equals(leagueID, other.leagueID) && Objects.equals(userID, other.userID);
	}
	
}
