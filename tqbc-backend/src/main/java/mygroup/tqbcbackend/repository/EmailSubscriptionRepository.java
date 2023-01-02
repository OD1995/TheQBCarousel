package mygroup.tqbcbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import mygroup.tqbcbackend.model.EmailSubscription;

@Repository
public interface EmailSubscriptionRepository extends JpaRepository<EmailSubscription,String> {
    
    @Query(
        value = "SELECT         es \n" +
                "FROM           EmailSubscription es \n" +
                "WHERE          es.emailSubscriptionCompositeKey.emailSubscriptionTypeID = ?1\n" +
                "       AND     es.value = true"

    )
    public List<EmailSubscription> findByValueTrueAndEmailSubscriptionTypeID(long emailSubscriptionTypeID);

    @Query(
        value = "SELECT         es.emailSubscriptionCompositeKey.userID \n" +
                "FROM           EmailSubscription es \n" +
                "WHERE          es.emailSubscriptionCompositeKey.emailSubscriptionTypeID = ?1\n" +
                "       AND     es.value = true"

    )
    public List<Long> findUserIDsByValueTrueAndEmailSubscriptionTypeID(long emailSubscriptionTypeID);
}
