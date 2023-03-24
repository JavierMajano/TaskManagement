package com.example.TaskManagement.repository;

import com.example.TaskManagement.model.handleTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<handleTask, Long> {
    Optional<handleTask> findByName(String name);
    List<handleTask> findByUserId(int id);
}
