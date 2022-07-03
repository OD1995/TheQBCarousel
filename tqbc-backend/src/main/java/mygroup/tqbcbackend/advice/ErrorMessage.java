package mygroup.tqbcbackend.advice;

import java.util.Date;

public class ErrorMessage {
    
    private int statusCode;
    private Date timestamp;
    private String message;
    private String description;

    public ErrorMessage(
        int statusCode,
        Date timestamp,
        String message,
        String description
    ) {
        this.statusCode = statusCode;
        this.timestamp = timestamp;
        this.message = message;
        this.description = description;
    }


    public int getStatusCode() {
        return this.statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public Date getTimestamp() {
        return this.timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
