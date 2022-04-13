package mygroup.tqbcbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mygroup.tqbcbackend.model.ConfirmationToken;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, String>{

	ConfirmationToken findByConfirmationToken(String confirmationToken);
}
