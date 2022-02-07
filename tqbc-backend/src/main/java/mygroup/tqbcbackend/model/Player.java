import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Players")
public class Player {
	@Id
	@Column(name = "PlayerID")
	private String playerID;
	
	@Column(name = "FirstName")
	private String firstName;
	
	@Column(name = "LastName")
	private String lastName;
	
	@ForeignKey
	@Column(name = "DefaultTeamID")
	private String defaultTeamID;
}