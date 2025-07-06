package com.gft.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gft.springboot.exception.InvalidEmployeeException;
import com.gft.springboot.model.Employee;
import com.gft.springboot.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Saves a new employee to the database
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Retrieves all employees; throws exception if the list is empty
    public List<Employee> viewAllEmployees() throws InvalidEmployeeException {
        List<Employee> employees = employeeRepository.findAll();
        if (employees.isEmpty()) {
            throw new InvalidEmployeeException();
        }
        return employees;
    }

    // Retrieves an employee by ID; throws exception if not found
    public Employee viewEmployeeById(int employeeId) throws InvalidEmployeeException {
        Employee employee = employeeRepository.findById(employeeId).orElse(null);
        if (employee != null) {
            return employee;
        } else {
            throw new InvalidEmployeeException();
        }
    }
}
