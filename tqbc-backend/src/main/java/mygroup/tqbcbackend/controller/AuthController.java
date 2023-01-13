package mygroup.tqbcbackend.controller;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.exception.TokenRefreshException;
import mygroup.tqbcbackend.model.ConfirmationToken;
import mygroup.tqbcbackend.model.ERole;
import mygroup.tqbcbackend.model.EmailSubscription;
import mygroup.tqbcbackend.model.EmailSubscriptionCompositeKey;
import mygroup.tqbcbackend.model.EmailType;
import mygroup.tqbcbackend.model.Franchise;
import mygroup.tqbcbackend.model.RefreshToken;
import mygroup.tqbcbackend.model.Role;
import mygroup.tqbcbackend.model.Team;
import mygroup.tqbcbackend.model.User;
import mygroup.tqbcbackend.payload.request.EmailVerificationRequest;
import mygroup.tqbcbackend.payload.request.LoginRequest;
import mygroup.tqbcbackend.payload.request.PasswordResetRequest;
import mygroup.tqbcbackend.payload.request.SignupRequest;
import mygroup.tqbcbackend.payload.request.TokenRefreshRequest;
import mygroup.tqbcbackend.payload.response.JwtResponse;
import mygroup.tqbcbackend.payload.response.LoginResponse;
import mygroup.tqbcbackend.payload.response.MessageResponse;
import mygroup.tqbcbackend.payload.response.TokenRefreshResponse;
import mygroup.tqbcbackend.repository.ConfirmationTokenRepository;
import mygroup.tqbcbackend.repository.EmailSubscriptionRepository;
import mygroup.tqbcbackend.repository.EmailTypeRepository;
import mygroup.tqbcbackend.repository.FranchiseRepository;
import mygroup.tqbcbackend.repository.RefreshTokenRepository;
import mygroup.tqbcbackend.repository.RoleRepository;
import mygroup.tqbcbackend.repository.TeamRepository;
import mygroup.tqbcbackend.repository.UserRepository;
import mygroup.tqbcbackend.security.jwt.JwtUtils;
import mygroup.tqbcbackend.security.service.UserDetailsImpl;
import mygroup.tqbcbackend.service.EmailBuilderService;
import mygroup.tqbcbackend.service.EmailSenderService;
import mygroup.tqbcbackend.service.PrivateLeaderboardService;
import mygroup.tqbcbackend.service.RefreshTokenService;

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
	TeamRepository teamRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	JwtUtils jwtUtils;
	
	@Autowired
	RefreshTokenService refreshTokenService;

	@Autowired
	RefreshTokenRepository refreshTokenRepository;

	@Autowired
	ConfirmationTokenRepository confirmationTokenRepository;
	
	@Autowired
	private EmailSenderService emailSenderService;	
	
	@Value("${spring.mail.username}")
	private String fromEmailAddress;	
	
	@Value("${tqdm.app.frontEndURL}")
	private String frontEndURL;

	@Autowired
	private PrivateLeaderboardService privateLeaderboardService;

	@Autowired
	private FranchiseRepository franchiseRepository;

	@Autowired
	private EmailTypeRepository emailTypeRepository;

	@Autowired
	private EmailSubscriptionRepository emailSubscriptionRepository;

	@Autowired
	private EmailBuilderService emailBuilderService;
		
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
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		User user = userRepository.findByUserID(userDetails.getUserID());
		if (user.isAuthenticated()) {
			String jwt = jwtUtils.generateJwtToken(userDetails);
			List<String> roles = userDetails.getAuthorities().stream()
					.map(item -> item.getAuthority())
					.collect(Collectors.toList());
			RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getUserID());
			List<HashMap<String,String>> privateLeaderboardInfos = privateLeaderboardService.getPrivateLeaderboardInfos(
				userDetails.getUserID()
			);
			JwtResponse jwtResponse = new JwtResponse(
					jwt,
					refreshToken.getRefreshToken(),
					userDetails.getUserID(),
					userDetails.getUsername(),
					userDetails.getEmail(),
					roles
			);
	
			LoginResponse loginResponse = new LoginResponse(jwtResponse, privateLeaderboardInfos);
	
			return ResponseEntity.ok(loginResponse);
		} else {
			return ResponseEntity
			.badRequest()
			.body(new MessageResponse(
				"Error: Please verify your email by following the link in the email sent to " + user.getEmail()
			));
		}
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(
			@Valid @RequestBody SignupRequest signupRequest
	) {
		if (userRepository.existsByUsername(signupRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken"));
		}
		
		if (userRepository.existsByEmail(signupRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use"));
		}
		User user;
		if (signupRequest.getFavTeamID() != null) {
			Team favTeam = teamRepository.findByTeamID(signupRequest.getFavTeamID());
			Franchise franchise = franchiseRepository.findByFranchiseID(favTeam.getFranchise().getFranchiseID());
			user = new User(
				signupRequest.getUsername(),
				signupRequest.getEmail(),
				franchise,
				encoder.encode(signupRequest.getPassword()),
				false
			);
		} else {
			user = new User(
				signupRequest.getUsername(),
				signupRequest.getEmail(),
				encoder.encode(signupRequest.getPassword()),
				false
			);
		}
		
		Set<Role> roles = new HashSet<>();
		
		Role userRole = roleRepository.findByName(ERole.ROLE_USER)
				.orElseThrow(() -> new RuntimeException("Error: Role is not found"));
		roles.add(userRole);
		
		user.setRoles(roles);
		userRepository.saveAndFlush(user);
		
		// Create confirmation token then email user to verify address
		ConfirmationToken confirmationToken = new ConfirmationToken(user);
		confirmationTokenRepository.save(confirmationToken);
		emailBuilderService.sendNonSubscriptionTypeEmail(
			1,
			user,
			confirmationToken
		);
		// SimpleMailMessage mailMessage = new SimpleMailMessage();
		// mailMessage.setTo(user.getEmail());
		// mailMessage.setSubject("The QB Carousel - Email Verification");
		// mailMessage.setFrom(fromEmailAddress);
		// mailMessage.setText(
		// 	"Hi "
		// 	+ user.getUsername()
		// 	+ "\n\n"
		// 	+ "Thank you for registering at TheQBCarousel.com! "
		// 	+ "Please verify your email address by clicking here: "
		// 	+ frontEndURL
		// 	+ "/email-verification?token="
		// 	+ confirmationToken.getConfirmationToken()
		// 	+ "\n\n"
		// 	+ "Thanks"
		// );
		// emailSenderService.sendMail(mailMessage);

		// Subscribe user to all subscriptions
		List<EmailSubscription> newSubscriptions = new ArrayList<EmailSubscription>();
		List<EmailType> emailSubscriptionTypes = emailTypeRepository.findByIsSubscriptionTrue();
		for (EmailType emailType : emailSubscriptionTypes) {
			EmailSubscriptionCompositeKey esck = new EmailSubscriptionCompositeKey(
				user.getUserID(),
				emailType.getEmailTypeID()
			);
			EmailSubscription es = new EmailSubscription(
				esck,
				true
			);
			newSubscriptions.add(es);
		}
		emailSubscriptionRepository.saveAll(newSubscriptions);
		
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

	@PostMapping("/refresh-access-token")
	public ResponseEntity<?> refreshAccessToken(
		@Valid @RequestBody TokenRefreshRequest request
	) {
		String requestRefreshToken = request.getRefreshToken();
		return refreshTokenService.findByRefreshToken(requestRefreshToken)
			.map(refreshTokenService::verifyExpiration)
			.map(refreshToken -> {
				refreshToken.setLastUsageDateTime(Instant.now());
				refreshTokenRepository.save(refreshToken);
				return refreshToken;
			})
			.map(RefreshToken::getUser)
			.map(user -> {
				String token = jwtUtils.generateTokenFromUsername(user.getUsername());
				return ResponseEntity.ok(
					new TokenRefreshResponse(
						token,
						requestRefreshToken
					)
				);
			})
			.orElseThrow(() -> new TokenRefreshException(
				requestRefreshToken,
				"Refresh token is not in database"
			));
	}

    @PostMapping("/send-password-reset-email")
    public ResponseEntity<?> sendPasswordResetEmail(
        @Valid @RequestBody PasswordResetRequest passwordResetRequest
    ) {
        String email = passwordResetRequest.getEmail();
        User user = userRepository.findByEmail(email)
					.orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));
        // Create confirmation token then email user to verify address
		ConfirmationToken confirmationToken = new ConfirmationToken(user);
		confirmationTokenRepository.save(confirmationToken);
		emailBuilderService.sendNonSubscriptionTypeEmail(
			2,
			user,
			confirmationToken
		);
        return ResponseEntity.ok().build();
    }

	@PostMapping("/check-password-reset-token")
	public long checkPasswordResetToken(
			@Valid @RequestBody PasswordResetRequest passwordResetRequest
	) {
		ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(
			passwordResetRequest.getToken()
		);
		
		if (token != null) {
			User user = userRepository.findByEmailIgnoreCase(token.getUser().getEmail());
			return user.getUserID();
		} else {
			throw new RuntimeException("Invalid token");
		}
	}

	@PostMapping("/update-user-password")
	public ResponseEntity<?> updateUserPassword(
		@Valid @RequestBody PasswordResetRequest passwordResetRequest
	) {
		User user = userRepository.findByUserID(passwordResetRequest.getUserID());
		user.setPassword(
			encoder.encode(passwordResetRequest.getPassword())
		);
		userRepository.save(user);
		return ResponseEntity.ok().build();
	}
}
