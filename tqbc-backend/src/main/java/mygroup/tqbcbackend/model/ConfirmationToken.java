package mygroup.tqbcbackend.model;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "ConfirmationTokens")
public class ConfirmationToken {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TokenID")
	private long tokenID;
	
	@Column(name = "ConfirmationToken")
	private String confirmationToken;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "CreatedDate")
	private Date createdDate;
	
	@OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
	@JoinColumn(nullable = false, name = "UserID")
	private User user;
	
	public ConfirmationToken() {
		
	}
	
	public ConfirmationToken(User user) {
		this.user = user;
		createdDate = new Date();
		confirmationToken = UUID.randomUUID().toString();
	}

	public long getTokenID() {
		return tokenID;
	}

	public void setTokenID(long tokenID) {
		this.tokenID = tokenID;
	}

	public String getConfirmationToken() {
		return confirmationToken;
	}

	public void setConfirmationToken(String confirmationToken) {
		this.confirmationToken = confirmationToken;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
