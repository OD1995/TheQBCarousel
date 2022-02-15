package mygroup.tqbcbackend.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@Entity
@Table(	name = "Users",
		uniqueConstraints = {
				@UniqueConstraint(columnNames = "Username"),
				@UniqueConstraint(columnNames = "EmailAddress")
		})
public class User {
	@Id
	@Column(name = "UserID")
	private String userID;
	
	@NotBlank
	@Size(max = 20)
	@Column(name = "Username")
	private String username;
	
	@Email
	@Column(name = "EmailAddress")
	private String emailAddress;
	
	@Column(name = "FavouriteTeamID")
	private String favouriteTeamID;
	
	@NotBlank
	@Size(max = 120)
	@Column(name = "HashedPassword")
	private String hashedPassword;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable( name = "UserRoles",
				joinColumns = @JoinColumn(name = "UserID"),
				inverseJoinColumns = @JoinColumn(name = "RoleID")
	)
	private Set<Role> roles = new HashSet<>();
	
	@Column(name = "IsAuthenticated")
	private boolean isAuthenticated;
		
	@Column(name = "UserCreated")
	@Temporal(TemporalType.TIMESTAMP)
	private Date userCreated;

	public User() {
		
	}

	public User(String userID, @NotBlank @Size(max = 20) String username, @Email String emailAddress,
			String favouriteTeamID, @NotBlank @Size(max = 120) String hashedPassword, Set<Role> roles,
			boolean isAuthenticated, Date userCreated) {
		super();
		this.userID = userID;
		this.username = username;
		this.emailAddress = emailAddress;
		this.favouriteTeamID = favouriteTeamID;
		this.hashedPassword = hashedPassword;
		this.roles = roles;
		this.isAuthenticated = isAuthenticated;
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

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public boolean isAuthenticated() {
		return isAuthenticated;
	}

	public void setAuthenticated(boolean isAuthenticated) {
		this.isAuthenticated = isAuthenticated;
	}

	public Date getUserCreated() {
		return userCreated;
	}

	public void setUserCreated(Date userCreated) {
		this.userCreated = userCreated;
	}
	
}