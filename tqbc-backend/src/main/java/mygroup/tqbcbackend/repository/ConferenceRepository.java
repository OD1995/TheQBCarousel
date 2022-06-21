package mygroup.tqbcbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mygroup.tqbcbackend.model.Conference;

@Repository
public interface ConferenceRepository extends JpaRepository<Conference, String>{

	public List<Conference> findByIsActiveTrueOrderByNameAsc();
}
