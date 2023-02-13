package mygroup.tqbcbackend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

import mygroup.tqbcbackend.security.jwt.AuthEntryPointJwt;
import mygroup.tqbcbackend.security.jwt.AuthTokenFilter;
import mygroup.tqbcbackend.security.service.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	UserDetailsServiceImpl userDetailsService;
	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;
	@Bean
	public AuthTokenFilter authenticationJwtTokenFilter() {
		return new AuthTokenFilter();
	}
	@Override
	public void configure(
			AuthenticationManagerBuilder authenticationManagerBuilder
	) throws Exception {
		authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable()
			.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
			.authorizeRequests()
			.antMatchers("/api/v1/auth/**").permitAll()
			.antMatchers("/api/v1/admin/**").hasRole("ADMIN")
			.antMatchers("/api/v1/test/**").hasRole("USER")
			.antMatchers("/api/v1/teams/**").permitAll()
			.antMatchers("/api/v1/events/**").hasRole("USER")
			.antMatchers("/api/v1/prediction-periods/**").permitAll()
			.antMatchers("/api/v1/players/**").hasRole("USER")
			.antMatchers("/api/v1/answer-types/**").hasRole("USER")
			.antMatchers("/api/v1/answers/**").hasRole("USER")
			.antMatchers("/api/v1/conferences/**").permitAll()//.hasRole("USER")
			.antMatchers("/api/v1/period-predictions/**").permitAll()//.hasRole("USER")
			.antMatchers("/api/v1/user-scores/**").permitAll()//.hasRole("USER")
			.antMatchers("/api/v1/private-leaderboards/**").hasRole("USER")
			.antMatchers("/api/v1/analysis/**").permitAll()//.hasRole("ADMIN")
			.antMatchers("/api/v1/emails/**").permitAll()//hasRole("ADMIN")
			.antMatchers("/_ah/start").permitAll()
			.antMatchers("/api/v1/articles/**").permitAll()
			.anyRequest().authenticated();
		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
	}

	// @Bean
	// public CommonsRequestLoggingFilter requestLoggingFilter() {
	// 	CommonsRequestLoggingFilter loggingFilter = new CommonsRequestLoggingFilter();
	// 	loggingFilter.setIncludeClientInfo(true);
	// 	loggingFilter.setIncludeQueryString(true);
	// 	loggingFilter.setIncludePayload(true);
	// 	loggingFilter.setMaxPayloadLength(64000);
	// 	return loggingFilter;
	// }
	
}
