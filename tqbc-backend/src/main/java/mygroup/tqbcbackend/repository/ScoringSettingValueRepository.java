package mygroup.tqbcbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mygroup.tqbcbackend.model.ScoringSettingValue;

public interface ScoringSettingValueRepository extends JpaRepository<ScoringSettingValue,String> {
    
}
