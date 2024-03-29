package mygroup.tqbcbackend.model;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.lang.Nullable;


@Entity
@Table(	name = "users",
		uniqueConstraints = {
				@UniqueConstraint(columnNames = "Username"),
				@UniqueConstraint(columnNames = "Email")
		})
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "UserID")
	private long userID;
	
	@NotBlank
	@Size(max = 20)
	@Column(name = "Username")
	private String username;
	
	@Email
	@Column(name = "Email")
	private String email;
	
//	@Column(name = "FavouriteTeamID")
//	private Long favouriteTeamID;
	
//	@Nullable
	@ManyToOne(
			targetEntity = Franchise.class,
			fetch = FetchType.LAZY
	)
	@JoinColumn(
		name = "FavouriteFranchiseID",
		foreignKey = @ForeignKey(
			name = "none",
			value = ConstraintMode.NO_CONSTRAINT
		)
	)
	private Franchise favouriteFranchise;
	
	@NotBlank
	@Size(max = 120)
	@Column(name = "Password")
	private String password;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
		name = "userroles",
		joinColumns = @JoinColumn(
			name = "UserID",
			foreignKey = @ForeignKey(
				name = "none",
				value = ConstraintMode.NO_CONSTRAINT
			)		
		),
		inverseJoinColumns = @JoinColumn(
			name = "RoleID",
			foreignKey = @ForeignKey(
				name = "none",
				value = ConstraintMode.NO_CONSTRAINT
			)
		)
	)
	private Set<Role> roles = new HashSet<>();
	
	@Column(name = "IsAuthenticated")
	private boolean isAuthenticated;
		
	@Column(name = "UserCreatedDateTimeUTC")
	private Instant userCreatedDateTimeUTC;
	
	@OneToMany(
		targetEntity = PeriodPrediction.class,
		fetch = FetchType.LAZY,
		mappedBy = "user" 
	)
	private List<PeriodPrediction> periodPredictions;
	
	@OneToMany(
		targetEntity = PrivateLeaderboard.class,
		fetch = FetchType.LAZY,
		mappedBy = "ownerUser"
	)
	@Nullable
	// @JsonBackReference
	private List<PrivateLeaderboard> ownedPrivateLeaderboards;
	
	@OneToMany(
		targetEntity = PrivateLeaderboardMember.class,
		fetch = FetchType.LAZY,
		mappedBy = "user"
	)
	private List<PrivateLeaderboardMember> privateLeaderboardMemberships;
	
	@OneToMany(
		targetEntity = UserScore.class,
		fetch = FetchType.LAZY,
		mappedBy = "user"
	)
	private List<UserScore> scores;

	// @OneToMany(
	// 	targetEntity = EmailHistory.class,
	// 	fetch = FetchType.LAZY,
	// 	mappedBy = "user"
	// )
	// private List<EmailHistory> emailsReceived;
	
	public User() {
		
	}

	public User(
		@NotBlank @Size(max = 20) String username,
		@Email String email,
		Franchise favouriteFranchise,
		@NotBlank @Size(max = 120) String password,
		boolean isAuthenticated
		// Date userCreated
	) {
		super();
		this.username = username;
		this.email = email;
		this.favouriteFranchise = favouriteFranchise;
		this.password = password;
//		this.roles = roles;
		this.isAuthenticated = isAuthenticated;
		this.userCreatedDateTimeUTC = Instant.now();
	}

	public User(
		@NotBlank @Size(max = 20) String username,
		@Email String email,
		@NotBlank @Size(max = 120) String password,
		boolean isAuthenticated
		// Date userCreated
	) {
		super();
		this.username = username;
		this.email = email;
		// this.favouriteFranchise = favouriteFranchise;
		this.password = password;
		// this.roles = roles;
		this.isAuthenticated = isAuthenticated;
		this.userCreatedDateTimeUTC = Instant.now();
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

	public Franchise getFavouriteFranchise() {
		return favouriteFranchise;
	}

	public void setFavouriteFranchise(Franchise favouriteFranchise) {
		this.favouriteFranchise = favouriteFranchise;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public Instant getUserCreatedDateTimeUTC() {
		return userCreatedDateTimeUTC;
	}

	public void setUserCreatedDateTimeUTC(Instant userCreatedDateTimeUTC) {
		this.userCreatedDateTimeUTC = userCreatedDateTimeUTC;
	}

	public List<PrivateLeaderboardMember> getPrivateLeaderboardMemberships() {
		return this.privateLeaderboardMemberships;
	}

	@Override
	public boolean equals(Object o) {
		if (o == this)
			return true;
		if (!(o instanceof User)) {
			return false;
		}
		User user = (User) o;
		return userID == user.userID && Objects.equals(username, user.username) && Objects.equals(email, user.email) && Objects.equals(favouriteFranchise, user.favouriteFranchise) && Objects.equals(password, user.password) && Objects.equals(roles, user.roles) && isAuthenticated == user.isAuthenticated && Objects.equals(userCreatedDateTimeUTC, user.userCreatedDateTimeUTC) && Objects.equals(periodPredictions, user.periodPredictions) && Objects.equals(ownedPrivateLeaderboards, user.ownedPrivateLeaderboards) && Objects.equals(privateLeaderboardMemberships, user.privateLeaderboardMemberships) && Objects.equals(scores, user.scores);
	}

	@Override
	public int hashCode() {
		return Objects.hash(userID, username, email, favouriteFranchise, password, roles, isAuthenticated, userCreatedDateTimeUTC, periodPredictions, ownedPrivateLeaderboards, privateLeaderboardMemberships, scores);
	}
	
}