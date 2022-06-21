package mygroup.tqbcbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mygroup.tqbcbackend.model.ConfirmationToken;

@Repository
public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, String>{

	ConfirmationToken findByConfirmationToken(String confirmationToken);
}
