package mygroup.tqbcbackend.model;

import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "PrivateLeaderboards")
public class PrivateLeaderboard {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PrivateLeaderboardID")
	private long privateLeaderboardID;
		
	@ManyToOne(
			targetEntity = User.class,
			fetch = FetchType.LAZY
			// fetch = FetchType.EAGER
	)
	@JoinColumn(
		name = "OwnerUserID",
		referencedColumnName = "UserID"
	)
	// @JsonManagedReference
	private User ownerUser;

	@Column(name = "PrivateLeaderboardName")
	private String privateLeaderboardName;
		
	@ManyToOne(
			targetEntity = ScoringSetting.class,
			fetch = FetchType.EAGER
	)
	@JoinColumn(name = "ScoringSettingID")
	private ScoringSetting scoringSetting;
	
	@Column(name = "PrivateLeaderboardUUID")
	@org.hibernate.annotations.Type(type = "org.hibernate.type.UUIDCharType")
	private UUID privateLeaderboardUUID;
	
	@OneToMany(
			targetEntity = PrivateLeaderboardMember.class,
			fetch = FetchType.LAZY,
			// fetch = FetchType.EAGER,
			mappedBy = "privateLeaderboard"
	)
	// @JsonManagedReference
	// @JsonBackReference
	private List<PrivateLeaderboardMember> privateLeaderboardMembers;
	
	public PrivateLeaderboard() {
		
	}

	public PrivateLeaderboard(
		User ownerUser,
		ScoringSetting scoringSetting,
		String privateLeaderboardName
	) {
		super();
		this.ownerUser = ownerUser;
		this.scoringSetting = scoringSetting;
		this.privateLeaderboardUUID = UUID.randomUUID();
		this.privateLeaderboardName = privateLeaderboardName;
	}


	public long getPrivateLeaderboardID() {
		return this.privateLeaderboardID;
	}

	public void setPrivateLeaderboardID(long privateLeaderboardID) {
		this.privateLeaderboardID = privateLeaderboardID;
	}

	public User getOwnerUser() {
		return this.ownerUser;
	}

	public void setOwnerUser(User ownerUser) {
		this.ownerUser = ownerUser;
	}

	public ScoringSetting getScoringSetting() {
		return this.scoringSetting;
	}

	public void setScoringSetting(ScoringSetting scoringSetting) {
		this.scoringSetting = scoringSetting;
	}

	public UUID getPrivateLeaderboardUUID() {
		return this.privateLeaderboardUUID;
	}

	public void setPrivateLeaderboardUUID(UUID privateLeaderboardUUID) {
		this.privateLeaderboardUUID = privateLeaderboardUUID;
	}

	public String getPrivateLeaderboardName() {
		return this.privateLeaderboardName;
	}

	public void setPrivateLeaderboardName(String privateLeaderboardName) {
		this.privateLeaderboardName = privateLeaderboardName;
	}
}

