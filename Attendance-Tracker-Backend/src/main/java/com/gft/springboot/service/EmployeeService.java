package com.gft.springboot.service;

import java.util.List;

import com.gft.springboot.exception.InvalidEmployeeException;
import com.gft.springboot.model.Employee;

public interface EmployeeService {

    // Adds a new employee to the system
    public Employee addEmployee(Employee employee);

    // Retrieves a list of all employees; throws exception if none found
    public List<Employee> viewAllEmployees() throws InvalidEmployeeException;

    // Retrieves a specific employee by ID; throws exception if not found
    public Employee viewEmployeeById(int employeeId) throws InvalidEmployeeException;
}