package com.gft.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gft.springboot.exception.InvalidEmployeeException;
import com.gft.springboot.model.Employee;
import com.gft.springboot.service.EmployeeService;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Adds a new employee to the system
    @PostMapping("/employees")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Employee savedEmployee = employeeService.addEmployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmployee);
    }

    // Retrieves a list of all employees
    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> viewAllEmployees() throws InvalidEmployeeException {
        List<Employee> employees = employeeService.viewAllEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    // Retrieves a specific employee by their ID
    @GetMapping("/employees/{employeeId}")
    public ResponseEntity<Employee> viewEmployeeById(@PathVariable int employeeId) throws InvalidEmployeeException {
        Employee employee = employeeService.viewEmployeeById(employeeId);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }
}