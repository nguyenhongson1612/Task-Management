package com.taskmanagement.dto.auth;

public record AuthResponse(
        String token,
        String type,
        UserResponse user
) {
    public static AuthResponse of(String token, UserResponse user) {
        return new AuthResponse(token, "Bearer", user);
    }
}
