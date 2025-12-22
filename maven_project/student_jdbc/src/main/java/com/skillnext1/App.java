package com.skillnext1;

public class App {

    public static void main(String[] args) {

        StudentDAO dao = new StudentDAO();

        try {
            // INSERT
            Student s1 = new Student(
                    "Meghana",
                    "meghana@gmail.com",
                    "Core Java"
            );
            dao.insert(s1);   // ✅ INSERT CALL ADDED
            System.out.println("Student added!");

            // GET ALL
            System.out.println("\nAll Students:");
            for (Student s : dao.getStudents()) {
                System.out.println(s);
            }

            // UPDATE
            Student s2 = new Student(
                    1,
                    "Meghana P",
                    "meghana123@gmail.com",
                    "AI & ML"
            );
            dao.updateStudent(s2);
            System.out.println("\nStudent updated!");

            // DELETE
            dao.deleteStudent(1);
            System.out.println("\nStudent deleted!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
