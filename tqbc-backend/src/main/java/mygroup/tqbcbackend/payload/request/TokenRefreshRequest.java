package mygroup.tqbcbackend.payload.request;

import javax.validation.constraints.NotBlank;

public class TokenRefreshRequest {
    
    @NotBlank
    private String refreshToken;

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshoken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
