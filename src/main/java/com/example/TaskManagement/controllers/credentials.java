package com.example.TaskManagement.controllers;

import com.example.TaskManagement.Security.SecurityConfig;
import com.example.TaskManagement.config.JwtAuthenticationFilter;
import com.example.TaskManagement.config.JwtProvider;
import com.example.TaskManagement.config.JwtResponse;
import com.example.TaskManagement.model.LoginResponse;
import com.example.TaskManagement.model.User;
import com.example.TaskManagement.repository.UserRepository;
import com.example.TaskManagement.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RequestMapping("/api")
@RestController
@CrossOrigin("*")
public class credentials {
    @Autowired
    private AuthenticationManager authentication;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;



    @Autowired
    private UserRepository userRepository;
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestHeader("Authorization") String authorizationHeader, @RequestBody User LoginRequest) {

        String token = authorizationHeader.substring(7);
        String extractedUsername = (jwtProvider.extractUsername(token));
        UserDetails userDetails2 = userDetailsServiceImpl.loadUserByUsername(LoginRequest.getUserName());
        UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(extractedUsername);
        System.out.println("PRINTGING!!!: " +userDetails2);
        if (jwtProvider.isTokenExpired(token)) {
            String newToken = jwtProvider.generateToken(extractedUsername);
            JwtResponse jwtResponse = new JwtResponse(newToken);
            LoginResponse loginResponse = new LoginResponse(jwtResponse, userRepository.findByUserName(extractedUsername));
            return ResponseEntity.ok(loginResponse);
        }
        if (jwtProvider.validateToken(token, userDetails)) {
            System.out.println(userRepository.findByUserName(extractedUsername));
            return ResponseEntity.ok(userRepository.findByUserName((extractedUsername)));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    @RequestMapping(value = "/authenticate", method = RequestMethod.GET)
    public ResponseEntity<?> handleOptionsRequest(@RequestHeader("Authorization") String authorizationHeader) {
        String username = jwtProvider.extractUsername(authorizationHeader.substring(7));


        return ResponseEntity.ok(username);
    }


@PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody User signUpRequest) throws Exception{
    System.out.println(signUpRequest.toString());

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {

        return ResponseEntity.badRequest().body("Email is already taken");
    }

    User user = new User();
    user.setEmail(signUpRequest.getEmail());
    user.setFirstName(signUpRequest.getFirstName());
    user.setLastName(signUpRequest.getLastName());
    user.setUserName(signUpRequest.getUserName());
    user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
    userRepository.save(user);

    String token = jwtProvider.generateToken(user.getUserName());
    return ResponseEntity.ok(new JwtResponse(token));
}

}
