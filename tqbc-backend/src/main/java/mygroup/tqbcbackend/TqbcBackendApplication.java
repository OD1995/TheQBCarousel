package mygroup.tqbcbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(proxyBeanMethods = false)
public class TqbcBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TqbcBackendApplication.class, args);
	}

}
