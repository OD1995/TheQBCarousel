package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Roles")
public class Role {

	@Id
	@Column(name = "RoleID")
	private String roleID;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "Name",length = 20)
	private ERole name;
	
	public Role() {
		
	}

	public Role(String roleID, ERole name) {
		super();
		this.roleID = roleID;
		this.name = name;
	}

	public String getRoleID() {
		return roleID;
	}

	public void setRoleID(String roleID) {
		this.roleID = roleID;
	}

	public ERole getName() {
		return name;
	}

	public void setName(ERole name) {
		this.name = name;
	}
	
}
