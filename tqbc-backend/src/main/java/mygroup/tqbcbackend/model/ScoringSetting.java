package mygroup.tqbcbackend.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "ScoringSettings")
public class ScoringSetting {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ScoringSettingID")
	private long scoringSettingID;
	
	@Column(name = "Description")
	private String description;
	
	@OneToMany(
			targetEntity = PrivateLeague.class,
			fetch = FetchType.LAZY,
			mappedBy = "scoringSetting"
	)
	private List<PrivateLeague> privateLeagues;
	

	@OneToMany(
			targetEntity = ScoringSettingValue.class,
			fetch = FetchType.LAZY,
			mappedBy = "scoringSettingDescription"
	)
	private List<ScoringSettingValue> scoringSettingValues;
	
	
	public ScoringSetting() {
		
	}

	public ScoringSetting(long scoringSettingID, String description) {
		super();
		this.scoringSettingID = scoringSettingID;
		this.description = description;
	}

	public long getScoringSettingID() {
		return scoringSettingID;
	}

	public void setScoringSettingID(long scoringSettingID) {
		this.scoringSettingID = scoringSettingID;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
}
