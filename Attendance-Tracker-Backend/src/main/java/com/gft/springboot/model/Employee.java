package com.gft.springboot.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "employees")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id")
    private int employeeId; // Unique identifier for the employee

    @Column(name = "employee_name", nullable = false)
    private String employeeName; // Name of the employee

    @Column(name = "job_code", nullable = false)
    private String jobCode; // Job code assigned to the employee

    @Column(name = "position", nullable = false)
    private String position; // Job position

    @Column(name = "team")
    private String team; // Team to which the employee belongs

    @Column(name = "office_location")
    private String officeLocation; // Office location of the employee

    @Column(name = "employee_email", nullable = false)
    private String employeeEmail; // Email address of the employee

    @Column(name = "joining_date", nullable = false)
    private LocalDate joiningDate; // Date the employee joined the company

    @Column(name = "corp_id")
    private String corpId; // Corporate ID generated for the employee

    @Column(name = "status")
    private String status; // Employment status (e.g., Active, Bench)

    @Column(name = "address", nullable = false)
    private String address; // Residential address of the employee

    @Column(name = "gender", nullable = false, length = 1)
    private char gender; // Gender of the employee (e.g., M/F)

    @Column(name = "qualification", nullable = false)
    private String qualification; // Educational qualification of the employee

    // Helper method to generate a corporate ID
    @PrePersist
    private void generateCorpId() {
        // Generates a corporate ID before saving the employee record
        if (employeeName != null && officeLocation != null && status != null) {
            this.corpId = generateCorpIdFromFields(employeeName, officeLocation, status);
        } else {
            this.corpId = "DEFAULT";
        }
    }

    // Helper method to generate a corporate ID using parts of name, location, and status
    private String generateCorpIdFromFields(String employeeName, String officeLocation, String status) {
        return (employeeName.length() >= 4 ? employeeName.substring(0, 4) : employeeName)
                + (officeLocation.length() >= 4 ? officeLocation.substring(0, 4) : officeLocation)
                + (status.length() >= 4 ? status.substring(0, 4) : status);
    }
}