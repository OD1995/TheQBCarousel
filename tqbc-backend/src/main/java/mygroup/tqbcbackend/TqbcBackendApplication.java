package mygroup.tqbcbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("mygroup.tqbcbackend.repository")
public class TqbcBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TqbcBackendApplication.class, args);
	}

}
