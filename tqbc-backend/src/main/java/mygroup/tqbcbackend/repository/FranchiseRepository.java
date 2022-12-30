package mygroup.tqbcbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mygroup.tqbcbackend.model.Franchise;

public interface FranchiseRepository extends JpaRepository<Franchise, String> {
    
    public Franchise findByFranchiseID(long franchiseID); 
}
