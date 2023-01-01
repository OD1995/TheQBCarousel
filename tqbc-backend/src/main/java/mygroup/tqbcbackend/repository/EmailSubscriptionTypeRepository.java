package mygroup.tqbcbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mygroup.tqbcbackend.model.EmailSubscriptionType;

@Repository
public interface EmailSubscriptionTypeRepository extends JpaRepository<EmailSubscriptionType,String> {
    
}
