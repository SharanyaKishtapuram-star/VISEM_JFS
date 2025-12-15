package com.skillnext1;

import java.sql.*;
import java.util.*;

public class StudentDAO {

    private Connection getConnection() throws Exception {
        String url = "jdbc:mysql://localhost:3306/skillnext_db";
        String username = "root";
        String password = "root";
         return DriverManager.getConnection(url, username, password);
    }
    return DriverManager.getConnection(url, username, password);
    }
    public boolean exists(int id) throws Exception{
        Connection con = getConnection();
        String sql = "SELECT COUNT(*) FROM students WHERE id = ?";  
        PreparedStatement ps = con.prepareStatement(sql);
        ps.setInt(1, id);
        ResultSet rs = ps.executeQuery();
        boolean present=rs.next();
        con.close();
        return present;
    }
    public void insert(Student s) throws Exception {
        Connection con = getConnection();
        String sql = "INSERT INTO students (id, name, email) VALUES (?, ?, ?)";
        PreparedStatement ps = con.prepareStatement(sql);
        ps.setInt(1, s.getId());
        ps.setString(2, s.getName());
        ps.setString(3, s.getEmail());
        ps.executeUpdate();
        con.close();
    }
    public void update(Student s) throws Exception {
        Connection con = getConnection();
        String sql = "UPDATE students SET name = ?, email = ? WHERE id = ?";
        PreparedStatement ps = con.prepareStatement(sql);
        ps.setString(1, s.getName());
        ps.setString(2, s.getEmail());
        ps.setInt(3, s.getId());
        ps.executeUpdate();
        con.close();
    }
    public void delete(int id) throws Exception {
        Connection con = getConnection();
        String sql = "DELETE FROM students WHERE id = ?";
        PreparedStatement ps = con.prepareStatement(sql);
        ps.setInt(1, id);
        ps.executeUpdate();
        con.close();
    }
    public List<Student> selectAll() throws Exception {
        Connection con = getConnection();
        String sql = "SELECT * FROM students";
        PreparedStatement ps = con.prepareStatement(sql);
        ResultSet rs = ps.executeQuery();
        List<Student> students = new ArrayList<>();
        while (rs.next()) {
            Student s = new Student();
            s.setId(rs.getInt("id"));
            s.setName(rs.getString("name"));
            s.setEmail(rs.getString("email"));
            students.add(s);
        }
        con.close();
        return list;
    }