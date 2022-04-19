package mygroup.tqbcbackend.controller;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.ConfirmationToken;
import mygroup.tqbcbackend.model.ERole;
import mygroup.tqbcbackend.model.Role;
import mygroup.tqbcbackend.model.User;
import mygroup.tqbcbackend.payload.request.EmailVerificationRequest;
import mygroup.tqbcbackend.payload.request.LoginRequest;
import mygroup.tqbcbackend.payload.request.SignupRequest;
import mygroup.tqbcbackend.payload.response.JwtResponse;
import mygroup.tqbcbackend.payload.response.MessageResponse;
import mygroup.tqbcbackend.repository.ConfirmationTokenRepository;
import mygroup.tqbcbackend.repository.RoleRepository;
import mygroup.tqbcbackend.repository.UserRepository;
import mygroup.tqbcbackend.security.jwt.JwtUtils;
import mygroup.tqbcbackend.security.service.UserDetailsImpl;
import mygroup.tqbcbackend.service.EmailSenderService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	PasswordEncoder encoder;
	@Autowired
	JwtUtils jwtUtils;
	@Autowired
	ConfirmationTokenRepository confirmationTokenRepository;
	@Autowired
	private EmailSenderService emailSenderService;	
	@Value("${spring.mail.username}")
	private String fromEmailAddress;	
	@Value("${tqdm.app.frontEndURL}")
	private String frontEndURL;
	
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(
			@Valid @RequestBody LoginRequest loginRequest
	) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						loginRequest.getUsername(),
						loginRequest.getPassword()
				)
		);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
		JwtResponse jwtResponse = new JwtResponse(
				jwt,
				userDetails.getUserID(),
				userDetails.getUsername(),
				userDetails.getEmail(),
				roles
		);
		return ResponseEntity.ok(jwtResponse);
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(
			@Valid @RequestBody SignupRequest signupRequest
	) {
		if (userRepository.existsByUsername(signupRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}
		
		if (userRepository.existsByEmail(signupRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}
		
		// Create new user's account
		User user = new User(
				signupRequest.getUsername(),
				signupRequest.getEmail(),
				null,
				encoder.encode(signupRequest.getPassword()),
				false,
				new Date()
		);
		Set<String> strRoles = signupRequest.getRole();
		Set<Role> roles = new HashSet<>();
		
		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found"));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found"));
					roles.add(adminRole);
					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_TESTER)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found"));
					roles.add(modRole);
					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found"));
					roles.add(userRole);
				}
			});
		}
		
		user.setRoles(roles);
		userRepository.save(user);
		
		// Create confirmation token then email user to verify address
		ConfirmationToken confirmationToken = new ConfirmationToken(user);
		confirmationTokenRepository.save(confirmationToken);
		
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setTo(user.getEmail());
		mailMessage.setSubject("The QB Carousel - Email Verification");
		mailMessage.setFrom(fromEmailAddress);
		mailMessage.setText(
			"Hi "
			+ user.getUsername()
			+ "\n\n"
			+ "Thank you for registering at TheQBCarousel.com! "
			+ "Please verify your email address by clicking here: "
			+ frontEndURL
			+ "/email-verification?token="
			+ confirmationToken.getConfirmationToken()
			+ "\n\n"
			+ "Thanks"
		);
		emailSenderService.sendMail(mailMessage);		
		
		return ResponseEntity.ok(
			new MessageResponse(
				"You have successfully registered as a user. "
				+ "Before you are able to make any predictions, "
				+ "you'll need to verify your email address "
				+ "by clicking on the link that has been sent to "
				+ user.getEmail()
			)
		);
	}
	
	@PostMapping("/verify-email")
	public ResponseEntity<?> verifyEmail(
			@Valid @RequestBody EmailVerificationRequest emailVerificationRequest
	) {
		ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(emailVerificationRequest.getToken());
		
		if (token != null) {
			User user = userRepository.findByEmailIgnoreCase(token.getUser().getEmail());
			user.setAuthenticated(true);
			userRepository.save(user);
			return ResponseEntity.ok(
					new MessageResponse(
						"success"
					)
				);
		} else {
			return ResponseEntity.badRequest().body(
					"failure"
				);
		}
	}
}
