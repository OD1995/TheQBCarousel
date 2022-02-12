package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "Conferences")
public class Conference {
	@Id
	@Column(name = "ConferenceID")
	private String conferenceID;
	
	@Column(name = "Season")
	private int season;
	
	@Column(name = "Name")
	private String name;
	
	@Column(name = "GridColumn")
	private int gridColumn;
	
	@Column(name = "GridRowStart")
	private int gridRowStart;
	
	@Column(name = "GridRowEnd")
	private int gridRowEnd;
	
	@Column(name = "IsActive")
	private boolean isActive;
	
	public Conference() {
		
	}

	public Conference(String conferenceID, int season, String name, int gridColumn, int gridRowStart, int gridRowEnd,
			boolean isActive) {
		super();
		this.conferenceID = conferenceID;
		this.season = season;
		this.name = name;
		this.gridColumn = gridColumn;
		this.gridRowStart = gridRowStart;
		this.gridRowEnd = gridRowEnd;
		this.isActive = isActive;
	}

	public String getConferenceID() {
		return conferenceID;
	}

	public void setConferenceID(String conferenceID) {
		this.conferenceID = conferenceID;
	}

	public int getSeason() {
		return season;
	}

	public void setSeason(int season) {
		this.season = season;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getGridColumn() {
		return gridColumn;
	}

	public void setGridColumn(int gridColumn) {
		this.gridColumn = gridColumn;
	}

	public int getGridRowStart() {
		return gridRowStart;
	}

	public void setGridRowStart(int gridRowStart) {
		this.gridRowStart = gridRowStart;
	}

	public int getGridRowEnd() {
		return gridRowEnd;
	}

	public void setGridRowEnd(int gridRowEnd) {
		this.gridRowEnd = gridRowEnd;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	
}
