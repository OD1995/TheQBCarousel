package mygroup.tqbcbackend.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "Users")
public class User {
	@Column(name="UserID")
	private String userID;
	
	@Column(name="Username")
	private String username;
	
	@Column(name="EmailAddress")
	private String emailAddress;
	
	@Column(name="FavouriteTeamID")
	private String favouriteTeamID;
	
	@Column(name="HashedPassword")
	private String hashedPassword;
	
	@Column(name="IsAuthenticated")
	private boolean isAuthenticated;
	
	@Column(name="IsActive")
	private boolean isActive;

	@Column(name="IsAdmin")
	private boolean isAdmin;
	
	@Column(name="UserCreated")
	@Temporal(TemporalType.TIMESTAMP)
	private Date userCreated;



	public User(String userID, String username, String emailAddress, String favouriteTeamID, String hashedPassword,
			boolean isAuthenticated, boolean isActive, boolean isAdmin, Date userCreated) {
		super();
		this.userID = userID;
		this.username = username;
		this.emailAddress = emailAddress;
		this.favouriteTeamID = favouriteTeamID;
		this.hashedPassword = hashedPassword;
		this.isAuthenticated = isAuthenticated;
		this.isActive = isActive;
		this.isAdmin = isAdmin;
		this.userCreated = userCreated;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getFavouriteTeamID() {
		return favouriteTeamID;
	}

	public void setFavouriteTeamID(String favouriteTeamID) {
		this.favouriteTeamID = favouriteTeamID;
	}

	public String getHashedPassword() {
		return hashedPassword;
	}

	public void setHashedPassword(String hashedPassword) {
		this.hashedPassword = hashedPassword;
	}

	public boolean isAuthenticated() {
		return isAuthenticated;
	}

	public void setAuthenticated(boolean isAuthenticated) {
		this.isAuthenticated = isAuthenticated;
	}
	
	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public boolean isAdmin() {
		return isAdmin;
	}

	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public Date getUserCreated() {
		return userCreated;
	}

	public void setUserCreated(Date userCreated) {
		this.userCreated = userCreated;
	}
	
}