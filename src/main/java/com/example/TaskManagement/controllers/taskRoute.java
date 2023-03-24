package com.example.TaskManagement.controllers;

import com.example.TaskManagement.Security.ResourceNotFoundException;
import com.example.TaskManagement.config.JwtProvider;
import com.example.TaskManagement.model.User;
import com.example.TaskManagement.model.handleTask;
import com.example.TaskManagement.repository.TaskRepository;
import com.example.TaskManagement.repository.UserRepository;
import com.example.TaskManagement.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RequestMapping("/api")
@CrossOrigin(origins = "*")
@RestController
public class taskRoute {
    private final TaskService taskService;

    private final TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtProvider jwtProvider;
    public taskRoute(TaskService taskService, TaskRepository taskRepository ) {
        this.taskService = taskService;
        this.taskRepository = taskRepository;

    }
    @RequestMapping(value = "/AllTask", method = RequestMethod.GET)

    public List<handleTask> getAllTask(@RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.substring(7);
        System.out.println(token);
        String extractedUsername = (jwtProvider.extractUsername(token));
        User user = userRepository.findByUserName(extractedUsername);
        System.out.println(user);
        int id = user.getId();
        System.out.println(taskRepository.findByUserId(id));
        return taskRepository.findByUserId(id);
    }
    @RequestMapping(value = "/ManageTask", method = RequestMethod.GET)
    public List<handleTask> getMangeTask(@RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.substring(7);
        System.out.println(token);
        String extractedUsername = (jwtProvider.extractUsername(token));
        User user = userRepository.findByUserName(extractedUsername);
        List<handleTask> allTasks = taskRepository.findByUserId(user.getId());
        System.out.println(allTasks);
        List<handleTask> tasksWithoutCompletion = new ArrayList<>();

        for (handleTask task : allTasks) {
            if (task.getCompleted() == null) {
                tasksWithoutCompletion.add(task);
            }
        }
        return tasksWithoutCompletion;
    }
    @RequestMapping(value = "/tasks", method = RequestMethod.POST )
    public ResponseEntity<handleTask> createTask(@RequestHeader("Authorization") String authorizationHeader,@RequestBody handleTask HandleTask) {
        String token = authorizationHeader.substring(7);
        System.out.println(token);
        String extractedUsername = (jwtProvider.extractUsername(token));
        User user = userRepository.findByUserName(extractedUsername);
        System.out.println(user);
        System.out.println(HandleTask.toString());
        if(user == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
       HandleTask.setUser(user);
        handleTask savedTask = taskService.save(HandleTask);
        System.out.println(ResponseEntity.status(HttpStatus.CREATED).body(savedTask));
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);

    }

    @RequestMapping(value = "/deleteTask/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteTask(@RequestHeader("Authorization") String authorizationHeader,@PathVariable Long id){
        String token = authorizationHeader.substring(7);
        System.out.println(token);
        String extractedUsername = (jwtProvider.extractUsername(token));
        User user = userRepository.findByUserName(extractedUsername);
        List<handleTask> deleteTask = taskRepository.findByUserId(user.getId());
        System.out.println(id);
        Optional<handleTask> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            taskRepository.delete(optionalTask.get());
            return ResponseEntity.ok().body("Task with name " + id + " deleted");
        } else {
            return ResponseEntity.notFound().build();
        }

    }
    @RequestMapping(value = "/updatetask/{id}", method = RequestMethod.PUT)
    public ResponseEntity<handleTask> updateTask(@RequestHeader("Authorization") String authorizationHeader,@PathVariable(value = "id") Long taskId, @RequestBody handleTask updatedTask){
        String username = jwtProvider.extractUsername(authorizationHeader.substring(7));
        System.out.println(username);
        Optional<handleTask> taskOptional = taskRepository.findById(taskId);

        if (!taskOptional.isPresent()) {
            throw new ResourceNotFoundException("Task not found with id " + taskId);
        }
        handleTask task = taskOptional.get();
        task.setCompleted(updatedTask.getCompleted());
        handleTask updated = taskRepository.save(task);
        return ResponseEntity.ok(updated);
    }
    @RequestMapping(value = "/resetCompleted", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteCompletedTasks(@RequestHeader("Authorization") String authorizationHeader) {
        String username = jwtProvider.extractUsername(authorizationHeader.substring(7));
        System.out.println(username);
        User user = userRepository.findByUserName(username);
        List<handleTask> allTasks = taskRepository.findByUserId(user.getId());
        List<handleTask> completedTasks = new ArrayList<>();
        for (handleTask task : allTasks) {
            if (task.getCompleted() != null) {
                completedTasks.add(task);
            }
        }
        taskRepository.deleteAll(completedTasks);
        return ResponseEntity.ok(completedTasks);
    }

}
