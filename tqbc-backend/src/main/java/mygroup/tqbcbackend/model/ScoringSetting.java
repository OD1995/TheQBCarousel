package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ScoringSettings")
public class ScoringSetting {

	@Id
	@Column(name = "ScoringSettingsID")
	private String scoringSettingsID;
	
	@Column(name = "Description")
	private String description;
	
	@Column(name = "SP1")
	private String sp1;
	
	@Column(name = "SP2")
	private String sp2;
	
	@Column(name = "SP3")
	private String sp3;
	
	@Column(name = "SP4")
	private String sp4;
	
	@Column(name = "SP5")
	private String sp5;
	
	public ScoringSetting() {
		
	}

	public ScoringSetting(String scoringSettingsID, String description, String sp1, String sp2, String sp3, String sp4,
			String sp5) {
		super();
		this.scoringSettingsID = scoringSettingsID;
		this.description = description;
		this.sp1 = sp1;
		this.sp2 = sp2;
		this.sp3 = sp3;
		this.sp4 = sp4;
		this.sp5 = sp5;
	}

	public String getScoringSettingsID() {
		return scoringSettingsID;
	}

	public void setScoringSettingsID(String scoringSettingsID) {
		this.scoringSettingsID = scoringSettingsID;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSp1() {
		return sp1;
	}

	public void setSp1(String sp1) {
		this.sp1 = sp1;
	}

	public String getSp2() {
		return sp2;
	}

	public void setSp2(String sp2) {
		this.sp2 = sp2;
	}

	public String getSp3() {
		return sp3;
	}

	public void setSp3(String sp3) {
		this.sp3 = sp3;
	}

	public String getSp4() {
		return sp4;
	}

	public void setSp4(String sp4) {
		this.sp4 = sp4;
	}

	public String getSp5() {
		return sp5;
	}

	public void setSp5(String sp5) {
		this.sp5 = sp5;
	}
	
}