package mygroup.tqbcbackend.security;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImpl implements UserDetails {

	private static final long serialVersionUID = 1L;
	private String userID;
	private String username;
	private String emailAddress;
	@JsonIgnore
	private String hashedPassword;
	private Collection<? extends GrantedAuthority> authories;
	public UserDetailsImpl(String userID, String username, String emailAddress, String hashedPassword,
			Collection<? extends GrantedAuthority> authories) {
		this.userID = userID;
		this.username = username;
		this.emailAddress = emailAddress;
		this.hashedPassword = hashedPassword;
		this.authories = authories;
	}
	public static UserDetailsImpl build(User user) {
		List<GrantedAuthority> authorities = user.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getName().name()))
				.collect(Collectors.toList());
		return new UserDetailsImpl(
				user.getUserID(), 
				user.getUsername(),
				user.getEmailAddress(),
				user.getHashedPassword(),
				authorities
		);
	}
	
}
