package com.example.TaskManagement.Security;
import com.example.TaskManagement.model.handleTask;
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException() {
        super();
    }

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ResourceNotFoundException(Object handleTask , String id, Long taskId) {

    }
}
