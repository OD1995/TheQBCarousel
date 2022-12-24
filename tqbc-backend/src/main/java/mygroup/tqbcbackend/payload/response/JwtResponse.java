package mygroup.tqbcbackend.payload.response;

import java.util.HashMap;
import java.util.List;

import mygroup.tqbcbackend.model.PrivateLeaderboard;
import mygroup.tqbcbackend.model.PrivateLeaderboardMember;

public class JwtResponse {

	private String accessToken;
	private String type = "Bearer";
	private String refreshToken;
	private long userID;
	private String username;
	private String email;
	private List<String> roles;
	private List<HashMap<String,String>> privateLeaderboardInfos;
	
	public JwtResponse(
		String accessToken,
		String refreshToken,
		long userID,
		String username,
		String email,
		List<String> roles,
		List<HashMap<String,String>> privateLeaderboardInfos
	) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.userID = userID;
		this.username = username;
		this.email = email;
		this.roles = roles;
		this.privateLeaderboardInfos = privateLeaderboardInfos;
	}
	public String getAccessToken() {
		return accessToken;
	}
	public void setToken(String accessToken) {
		this.accessToken = accessToken;
	}
	public String getRefreshToken() {
		return refreshToken;
	}
	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public long getUserID() {
		return userID;
	}
	public void setUserID(long userID) {
		this.userID = userID;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public List<String> getRoles() {
		return roles;
	}
	public void setRoles(List<String> roles) {
		this.roles = roles;
	}
	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public List<HashMap<String,String>> getPrivateLeaderboardInfos() {
		return this.privateLeaderboardInfos;
	}

	public void setPrivateLeaderboardInfos(List<HashMap<String,String>> privateLeaderboardInfos) {
		this.privateLeaderboardInfos = privateLeaderboardInfos;
	}
	
}
