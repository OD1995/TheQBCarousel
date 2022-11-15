package mygroup.tqbcbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import mygroup.tqbcbackend.model.AnswerType;

public interface AnswerTypeRepository extends JpaRepository<AnswerType, String> {
    
    // public List<AnswerType> 
}
