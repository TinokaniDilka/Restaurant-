package com.example.gusteasrestaurant.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.Customizer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers(
                                "/", "/index",
                                "/menu", "/about", "/contact",
                                "/images/**", "/css/**", "/js/**", "/static/**",
                                // Explicitly permit both base path AND sub-paths
                                "/cart", "/cart/**",
                                "/carts", "/carts/**",
                                "/reservation", "/reservation/**",
                                "/reservations", "/reservations/**",
                                "/checkout", "/checkout/**","/images/**", "/css/**", "/js/**",
                                "/error" // Allow the error page to show
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form.disable())
                .logout(logout -> logout.disable());

        return http.build();
    }
    }