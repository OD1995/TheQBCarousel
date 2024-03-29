package mygroup.tqbcbackend.security.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import mygroup.tqbcbackend.model.User;
import mygroup.tqbcbackend.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	UserRepository userRepository;
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user;
		if (username.contains("@")) {
			user = userRepository.findByEmail(username)
					.orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + username));
		} else {
			user = userRepository.findByUsername(username)
					.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
		}
		return UserDetailsImpl.build(user);
	}
}
