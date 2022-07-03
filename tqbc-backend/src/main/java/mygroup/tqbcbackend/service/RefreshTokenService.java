package mygroup.tqbcbackend.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import mygroup.tqbcbackend.exception.TokenRefreshException;
import mygroup.tqbcbackend.model.RefreshToken;
import mygroup.tqbcbackend.repository.RefreshTokenRepository;
import mygroup.tqbcbackend.repository.UserRepository;

@Service
public class RefreshTokenService {
    
    @Value("${tqdm.app.jwtRefreshExpirationMs}")
    private Long refreshTokenExpirationMs;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<RefreshToken> findByRefreshToken(String refreshToken) {
        return refreshTokenRepository.findByRefreshToken(refreshToken);
    }

    public RefreshToken createRefreshToken(Long userID) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(userRepository.findByUserID(userID));
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenExpirationMs));
        refreshToken.setRefreshToken(UUID.randomUUID().toString());
        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(
                token.getRefreshToken(),
                "Refresh token has expired. Please make a new signin request"
            );
        }
        return token;
    }

    @Transactional
    public int deleteByUserID(long userID) {
        return refreshTokenRepository.deleteByUser(userRepository.findByUserID(userID));
    }
}
