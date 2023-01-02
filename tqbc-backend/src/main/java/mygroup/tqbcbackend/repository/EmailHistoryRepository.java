package mygroup.tqbcbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import mygroup.tqbcbackend.model.EmailHistory;
import mygroup.tqbcbackend.model.User;

public interface EmailHistoryRepository extends JpaRepository<EmailHistory,String> {
    
    public int countByEmailSentDateTimeUTCIsNull();
    public List<EmailHistory> findByEmailSentDateTimeUTCIsNull();

    @Query(
        value = "SELECT         eh.user \n" +
                "FROM           EmailHistory eh \n" +
                "WHERE          eh.emailSentDateTimeUTC = NULL"
    )
    public List<User> findUsersByEmailsNotSent();
}
