package com.example.TaskManagement.service;

import com.example.TaskManagement.Security.ResourceNotFoundException;
import com.example.TaskManagement.model.handleTask;
import com.example.TaskManagement.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

public handleTask save(handleTask HandleTask){
        return taskRepository.save(HandleTask);
}
    public handleTask updateTaskCompletionDate(Long taskId, Date completionDate) {
        handleTask task = taskRepository.findById(taskId).orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));
        task.setCompleted(completionDate);
        return taskRepository.save(task);
    }
}
