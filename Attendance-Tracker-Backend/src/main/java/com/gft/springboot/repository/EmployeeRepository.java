package com.gft.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gft.springboot.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}