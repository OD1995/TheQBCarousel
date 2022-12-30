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
@Table(name = "Franchises")
public class Franchise {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "FranchiseID")
	private long franchiseID;

    @Column(name = "Location2022")
    private String location2022;

    @Column(name = "Nickname2022")
    private String nickname2022;

    @OneToMany(
        targetEntity = Team.class,
        fetch = FetchType.LAZY,
        mappedBy = "franchise"
    )
    private List<Team> teams;

    public Franchise() {
    }

    public Franchise(long franchiseID, String location2022, String nickname2022) {
        this.franchiseID = franchiseID;
        this.location2022 = location2022;
        this.nickname2022 = nickname2022;
    }

    public long getFranchiseID() {
        return this.franchiseID;
    }

    public void setFranchiseID(long franchiseID) {
        this.franchiseID = franchiseID;
    }

    public String getLocation2022() {
        return this.location2022;
    }

    public void setLocation2022(String location2022) {
        this.location2022 = location2022;
    }

    public String getNickname2022() {
        return this.nickname2022;
    }

    public void setNickname2022(String nickname2022) {
        this.nickname2022 = nickname2022;
    }
	
}
