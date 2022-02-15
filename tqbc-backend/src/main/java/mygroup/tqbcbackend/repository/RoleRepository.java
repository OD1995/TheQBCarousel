package mygroup.tqbcbackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mygroup.tqbcbackend.model.ERole;
import mygroup.tqbcbackend.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, String>{

	Optional<Role> findByName(ERole name);
}
