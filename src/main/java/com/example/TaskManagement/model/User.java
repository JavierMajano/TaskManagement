package com.example.TaskManagement.model;

import com.sun.istack.NotNull;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="user_role")
public class User {

    @Id
    @SequenceGenerator(name = "seq", initialValue = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
    private int id;





    private String userName;
    private String email;
    private String firstName;
    private String lastName;

    private String password;

    public List<handleTask> getTask() {
        return task;
    }

    public void setTask(List<handleTask> task) {
        this.task = task;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)

private List<handleTask> task = new ArrayList<>();
    @Column(name = "email", unique = true)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    @Column(name = "FirstName")
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    @Column(name = "lastName")

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    @Column(name = "password")

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    @Column(name = "userName", unique = false)
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", password='" + password + '\'' +
                ", task=" + task +
                '}';
    }

}
