package com.gft.springboot.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gft.springboot.model.AttendanceRecord;
import com.gft.springboot.service.AttendanceRecordsService;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class AttendanceRecordsController {

    @Autowired
    private AttendanceRecordsService attendanceRecordsService;

    // Returns all attendance records sorted by date and time in descending order
    @GetMapping("/records")
    public ResponseEntity<List<AttendanceRecord>> viewAllRecords() {
        List<AttendanceRecord> records = attendanceRecordsService.viewRecordsOrderByInDateDescAndInTimeDesc();
        return new ResponseEntity<>(records, HttpStatus.OK);
    }

    // Returns all attendance records for a specific employee
    @GetMapping("/records/{employeeId}")
    public ResponseEntity<List<AttendanceRecord>> viewRecordsById(@PathVariable int employeeId) {
        List<AttendanceRecord> attendanceRecord = attendanceRecordsService.viewRecordsById(employeeId);
        return new ResponseEntity<>(attendanceRecord, HttpStatus.OK);
    }

    // Returns a specific attendance record for an employee on a given date
    @GetMapping("/records/{employeeId}/{inDate}")
    public ResponseEntity<AttendanceRecord> viewRecordsByIdAndInDate(@PathVariable int employeeId,
                                                                     @PathVariable LocalDate inDate) {
        AttendanceRecord attendanceRecord = attendanceRecordsService.viewRecordsByIdAndInDate(employeeId, inDate);
        return new ResponseEntity<>(attendanceRecord, HttpStatus.OK);
    }

    // Returns attendance records for an employee sorted by date in descending order
    @GetMapping("/records/sorted/{employeeId}")
    public ResponseEntity<List<AttendanceRecord>> getRecordsByEmployeeSortedByDate(@PathVariable int employeeId) {
        List<AttendanceRecord> records = attendanceRecordsService.findRecordsByEmployeeIdOrderedByInDateDesc(employeeId);
        return new ResponseEntity<>(records, HttpStatus.OK);
    }

    // Adds a new attendance record
    @PostMapping("/records")
    public ResponseEntity<AttendanceRecord> addAttendanceRecord(@RequestBody AttendanceRecord record) {
        AttendanceRecord attendanceRecord = attendanceRecordsService.addRecords(record);
        return new ResponseEntity<>(attendanceRecord, HttpStatus.OK);
    }

    // Updates an existing attendance record for a specific employee and date
    @PutMapping("records/{employeeId}/{inDate}")
    public ResponseEntity<AttendanceRecord> updateDetails(@PathVariable int employeeId,
                                                          @PathVariable LocalDate inDate,
                                                          @RequestBody AttendanceRecord attendanceRecord) {
        AttendanceRecord response = attendanceRecordsService.updateRecordByDate(employeeId, inDate, attendanceRecord);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Exports all attendance records to a CSV file and returns it as a downloadable response
    @GetMapping("/export-csv")
    public ResponseEntity<byte[]> exportAttendanceRecordsToCSV() throws IOException {
        List<AttendanceRecord> records = attendanceRecordsService.viewRecordsOrderByInDateDescAndInTimeDesc();

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        Writer writer = new OutputStreamWriter(byteArrayOutputStream, StandardCharsets.UTF_8);

        // Write CSV header
        writer.write("records_id,employee_id,employee_name,employee_email,in_date,in_time,out_date,out_time,total_hours,in_zone\n");

        // Write each record as a CSV row
        for (AttendanceRecord record : records) {
            writer.write(record.getRecordsId() + ",");
            writer.write(record.getEmployeeId() + ",");
            writer.write(record.getEmployeeName() + ",");
            writer.write(record.getEmployeeEmail() + ",");
            writer.write(record.getInDate() + ",");
            writer.write(record.getInTime() + ",");
            writer.write(record.getOutDate() + ",");
            writer.write(record.getOutTime() + ",");
            writer.write(record.getTotalHours() + ",");
            writer.write(record.getInZone() + "\n");
        }

        writer.flush();
        writer.close();

        byte[] fileContent = byteArrayOutputStream.toByteArray();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "attendance_report.csv");
        headers.setContentType(MediaType.parseMediaType("text/csv"));
        headers.setContentLength(fileContent.length);

        return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
    }
}
