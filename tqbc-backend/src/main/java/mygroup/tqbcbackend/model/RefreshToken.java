package mygroup.tqbcbackend.model;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "refreshtokens")
public class RefreshToken {

    // RefreshToken is generated at login and then LastUsageDateTime is updated
    //    every time it is used to create a new access token. When it hasn't been
    //    used to create a new access token for `refreshTokenExpirationMs` then it
    //    has expired
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "RefreshTokenID")
    private long refreshTokenID;

    @OneToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(
        name = "UserID",
		foreignKey = @ForeignKey(
			name = "none",
			value = ConstraintMode.NO_CONSTRAINT
		)
	)
    private User user;

    @Column(nullable = false, unique = true, name = "RefreshToken")
    private String refreshToken;

    @Column(nullable = false, name = "LastUsageDateTime")
    private Instant lastUsageDateTime;

    public RefreshToken() {
        
    }


    public long getRefreshTokenID() {
        return this.refreshTokenID;
    }

    public void setRefreshTokenID(long refreshTokenID) {
        this.refreshTokenID = refreshTokenID;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getRefreshToken() {
        return this.refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public Instant getLastUsageDateTime() {
        return this.lastUsageDateTime;
    }

    public void setLastUsageDateTime(Instant lastUsageDateTime) {
        this.lastUsageDateTime = lastUsageDateTime;
    }

}
