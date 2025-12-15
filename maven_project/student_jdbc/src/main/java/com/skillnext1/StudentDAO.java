package com.skillnext1;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class StudentDAO {

    private final String URL = "jdbc:mysql://localhost:3306/skillnext_db";
    private final String USER = "root";
    private final String PASSWORD = "root";

    // Insert student
    public void addStudent(Student s) throws Exception {
        Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);

        String sql = "INSERT INTO student(name, email, course) VALUES (?, ?, ?)";
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setString(1, s.getName());
        stmt.setString(2, s.getEmail());
        stmt.setString(3, s.getCourse());
        stmt.executeUpdate();

        conn.close();
    }

    // Get all students
    public List<Student> getStudents() throws Exception {
        List<Student> list = new ArrayList<>();

        Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
        String sql = "SELECT * FROM student";
        PreparedStatement stmt = conn.prepareStatement(sql);
        ResultSet rs = stmt.executeQuery();

        while (rs.next()) {
            Student s = new Student(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("email"),
                    rs.getString("course")
            );
            list.add(s);
        }
        conn.close();

        return list;
    }

    // Delete student by ID
    public void deleteStudent(int id) throws Exception {
        Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
        String sql = "DELETE FROM student WHERE id=?";
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setInt(1, id);
        stmt.executeUpdate();
        conn.close();
    }

    // Update student
    public void updateStudent(Student s) throws Exception {
        Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
        String sql = "UPDATE student SET name=?, email=?, course=? WHERE id=?";
        PreparedStatement stmt = conn.prepareStatement(sql);

        stmt.setString(1, s.getName());
        stmt.setString(2, s.getEmail());
        stmt.setString(3, s.getCourse());
        stmt.setInt(4, s.getId());

        stmt.executeUpdate();
        conn.close();
    }
}