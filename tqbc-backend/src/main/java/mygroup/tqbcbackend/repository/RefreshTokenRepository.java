package mygroup.tqbcbackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import mygroup.tqbcbackend.model.RefreshToken;
import mygroup.tqbcbackend.model.User;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    
    Optional<RefreshToken> findByRefreshTokenID(long refreshTokenID);
    Optional<RefreshToken> findByRefreshToken(String refreshToken);

    @Modifying
    int deleteByUser(User user);
}
