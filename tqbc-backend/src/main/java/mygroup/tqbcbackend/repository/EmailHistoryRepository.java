package mygroup.tqbcbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mygroup.tqbcbackend.model.EmailHistory;

public interface EmailHistoryRepository extends JpaRepository<EmailHistory,String> {
    
}
