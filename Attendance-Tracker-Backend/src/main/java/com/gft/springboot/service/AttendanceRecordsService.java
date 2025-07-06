package com.gft.springboot.service;

import java.time.LocalDate;
import java.util.List;

import com.gft.springboot.model.AttendanceRecord;

public interface AttendanceRecordsService {

    // Returns a list of all attendance records
    public List<AttendanceRecord> viewAllRecords();

    // Returns attendance records for a specific employee ID
    public List<AttendanceRecord> viewRecordsById(int employeeId);

    // Returns a specific attendance record by employee ID and check-in date
    public AttendanceRecord viewRecordsByIdAndInDate(int employeeId, LocalDate inDate);

    // Returns all attendance records ordered by check-in date and time in descending order
    public List<AttendanceRecord> viewRecordsOrderByInDateDescAndInTimeDesc();

    // Returns attendance records for a specific employee ID ordered by check-in date descending
    public List<AttendanceRecord> findRecordsByEmployeeIdOrderedByInDateDesc(int employeeId);

    // Adds a new attendance record
    public AttendanceRecord addRecords(AttendanceRecord attendanceRecord);

    // Updates an existing attendance record based on employee ID and check-in date
    public AttendanceRecord updateRecordByDate(int employeeId, LocalDate inDate, AttendanceRecord attendanceRecord);
}