package com.example.TaskManagement.model;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import com.example.TaskManagement.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="Task")
public class handleTask {
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Id
    @SequenceGenerator(name = "seq", initialValue = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
    @Column(name = "id")
    private Long id;
    private String name;
    private Date date;
    @ManyToOne()
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    private Date completed;
    @Column(name = "TaskCompleted", nullable = true)
    public Date getCompleted(){return completed;}

    public void setCompleted(Date completed){this.completed = completed;}

    @Column(name = "TaskDate", nullable = false)
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public handleTask(String name) {
        this.name = name;
    }

    public handleTask() {

    }

    public Long getId() {
        return id;
    }

    public void setId(long id){
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "TaskName", nullable = false)
    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "handleTask{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", date=" + date +
                ", completed=" + completed +
                '}';
    }


}
