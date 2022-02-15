package mygroup.tqbcbackend.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import mygroup.tqbcbackend.model.User;
import mygroup.tqbcbackend.repository.UserRepository;

public class UserDetailsServiceImpl {

	UserRepository userRepository;
	
	public UserDetails loadUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
		return UserDetailsImpl.build(user);
	}
}
