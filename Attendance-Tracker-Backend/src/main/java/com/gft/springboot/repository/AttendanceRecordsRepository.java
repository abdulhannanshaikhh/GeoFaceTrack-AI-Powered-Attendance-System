package com.gft.springboot.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gft.springboot.model.AttendanceRecord;

@Repository
public interface AttendanceRecordsRepository extends JpaRepository<AttendanceRecord, Integer> {

    // Retrieves all attendance records for a specific employee ID
    List<AttendanceRecord> findByEmployeeId(int employeeId);

    // Retrieves attendance records for a specific employee ID, ordered by check-in date descending
    @Query("SELECT ar FROM AttendanceRecord ar WHERE ar.employeeId = :employeeId ORDER BY ar.inDate DESC")
    List<AttendanceRecord> findRecordsByEmployeeIdOrderedByInDateDesc(int employeeId);

    // Retrieves a specific attendance record by employee ID and check-in date
    AttendanceRecord findByEmployeeIdAndInDate(int employeeId, LocalDate inDate);

    // Retrieves all attendance records ordered by check-in date and time descending
    @Query("SELECT ar FROM AttendanceRecord ar ORDER BY ar.inDate DESC, ar.inTime DESC")
    List<AttendanceRecord> findRecordsOrderedByInDateDescAndInTimeDesc();
}