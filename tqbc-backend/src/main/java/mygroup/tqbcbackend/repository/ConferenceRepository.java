package mygroup.tqbcbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import mygroup.tqbcbackend.model.Conference;

public interface ConferenceRepository extends JpaRepository<Conference, String>{

	public List<Conference> findByIsActiveTrueOrderByNameAsc();
	public List<Conference> findBySeasonOrderByNameAsc(long season);
}
