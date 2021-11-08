INSERT INTO departments (name)
VALUES ("Engineering"),
       ("Sales"),
       ("Financial"),
       ("Legal");

INSERT INTO roles (department_id, title, salary)
VALUES  (2, "Salesperson", 40000),
        (1, "Software Engineer", 45000),
        (1, "Lead Engineer", 50000),
        (4, "Lawyer", 60000),
        (3, "Accountant", 35000);

INSERT INTO employees (role_id, manager_id, first_name, last_name)
VALUES  (1, null ,"Mike", "Chan"),
        (2, 1 ,"Kevin", "Tupik"),  
        (3, null ,"Ashley", "Rodriguez"),
        (4, null ,"Tom", "Allen"),
        (5, 2 ,"Malia", "Brown");






