package mygroup.tqbcbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mygroup.tqbcbackend.model.EmailType;

@Repository
public interface EmailTypeRepository extends JpaRepository<EmailType,String> {
    
    public List<EmailType> findByIsSubscriptionTrue();
    public EmailType findByEmailTypeID(long emailTypeID);
}
