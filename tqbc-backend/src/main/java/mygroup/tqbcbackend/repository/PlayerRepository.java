package mygroup.tqbcbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mygroup.tqbcbackend.model.Player;

@Repository
public interface PlayerRepository extends JpaRepository<Player, String>{
	
	public List<Player> findByIsActiveTrueOrderByNameAsc();
	public Player findByPlayerID(long playerID);
	public List<Player> findByPlayerIDIn(List<Long> playerIDs);
}
