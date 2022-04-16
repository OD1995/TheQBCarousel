package mygroup.tqbcbackend.model;

public class FrontEndPrediction {

	private long teamID;
	
	private long playerID;

	public FrontEndPrediction(long teamID, long playerID) {
		super();
		this.teamID = teamID;
		this.playerID = playerID;
	}

	public long getTeamID() {
		return teamID;
	}

	public void setTeamID(long teamID) {
		this.teamID = teamID;
	}

	public long getPlayerID() {
		return playerID;
	}

	public void setPlayerID(long playerID) {
		this.playerID = playerID;
	}
	
}
