package com.example.TaskManagement.model;
import com.example.TaskManagement.config.JwtResponse;
import com.example.TaskManagement.model.User;
public class LoginResponse {
    private final JwtResponse jwtResponse;
    private final User user;
    public LoginResponse(JwtResponse jwtResponse, User user) {
        this.jwtResponse = jwtResponse;
        this.user = user;
    }

    public JwtResponse getJwtResponse() {
        return jwtResponse;
    }

    public User getUser() {
        return user;
    }
}
