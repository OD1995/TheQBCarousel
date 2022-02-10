package mygroup.tqbcbackend.model;

import java.io.Serializable;
import java.util.Objects;

public class PrivateLeagueMemberCompositeKey implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private String leagueID;
	private String userID;
	
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
