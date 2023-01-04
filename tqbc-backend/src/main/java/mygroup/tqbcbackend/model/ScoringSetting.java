package mygroup.tqbcbackend.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "scoringsettings")
public class ScoringSetting {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ScoringSettingID")
	private long scoringSettingID;
	
	@Column(name = "ScoringSettingCreated")
	@Temporal(TemporalType.TIMESTAMP)
	private Date scoringSettingCreated;
	
	@OneToMany(
			targetEntity = PrivateLeaderboard.class,
			fetch = FetchType.LAZY,
			mappedBy = "scoringSetting"
	)
	private List<PrivateLeaderboard> privateLeaderboards;
	

	@OneToMany(
			targetEntity = ScoringSettingValue.class,
			fetch = FetchType.LAZY,
			mappedBy = "scoringSetting"
	)
	@JsonManagedReference
	private List<ScoringSettingValue> scoringSettingValues;
	
	
	public ScoringSetting() {
		
	}

	public ScoringSetting(Date scoringSettingCreated) {
		super();
		this.scoringSettingCreated = scoringSettingCreated;
	}

	public long getScoringSettingID() {
		return scoringSettingID;
	}

	public void setScoringSettingID(long scoringSettingID) {
		this.scoringSettingID = scoringSettingID;
	}

	public Date getScoringSettingCreated() {
		return this.scoringSettingCreated;
	}

	public void setScoringSettingCreated(Date scoringSettingCreated) {
		this.scoringSettingCreated = scoringSettingCreated;
	}	
	
	public List<ScoringSettingValue> getScoringSettingValues() {
		return this.scoringSettingValues;
	}
}
