package com.gft.springboot.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;


@Entity
@Table(name = "attendance_records")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AttendanceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "records_id")
    private int recordsId; // Unique identifier for each attendance record

    @Column(name = "employee_id")
    private int employeeId; // Stores the ID of the employee associated with the record

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "employee_id", insertable = false, updatable = false)
    private Employee employee; // Reference to the associated Employee entity

    @Column(name = "employee_name", nullable = true)
    private String employeeName; // Stores the name of the employee

    @Column(name = "employee_email", nullable = true)
    private String employeeEmail; // Stores the email of the employee

    @Column(name = "in_date", nullable = true)
    private LocalDate inDate; // Date when the employee checked in

    @Column(name = "in_time", nullable = true)
    private LocalTime inTime; // Time when the employee checked in

    @Column(name = "out_date", nullable = true)
    private LocalDate outDate; // Date when the employee checked out

    @Column(name = "out_time", nullable = true)
    private LocalTime outTime; // Time when the employee checked out

    @Lob
    @Column(name = "in_photo", nullable = true)
    private byte[] inPhoto; // Photo captured at check-in

    @Lob
    @Column(name = "out_photo", nullable = true)
    private byte[] outPhoto; // Photo captured at check-out

    @Column(name = "total_hours", nullable = true)
    private float totalHours; // Total hours worked for the day

    @Column(name = "in_zone", nullable = true)
    private String inZone; // inZone stores yes or no if the total hours is greater than 6 "yes" else "no"

	public LocalDate getInDate() {
		return inDate;
	}

	public void setInDate(LocalDate inDate) {
		this.inDate = inDate;
	}

	public LocalTime getInTime() {
		return inTime;
	}

	public void setInTime(LocalTime inTime) {
		this.inTime = inTime;
	}

	public LocalDate getOutDate() {
		return outDate;
	}

	public void setOutDate(LocalDate outDate) {
		this.outDate = outDate;
	}

	public LocalTime getOutTime() {
		return outTime;
	}

	public void setOutTime(LocalTime outTime) {
		this.outTime = outTime;
	}

	public byte[] getInPhoto() {
		return inPhoto;
	}

	public void setInPhoto(byte[] inPhoto) {
		this.inPhoto = inPhoto;
	}

	public byte[] getOutPhoto() {
		return outPhoto;
	}

	public void setOutPhoto(byte[] outPhoto) {
		this.outPhoto = outPhoto;
	}

	public String getInZone() {
		return inZone;
	}

	public void setInZone(String inZone) {
		this.inZone = inZone;
	}

	public float getTotalHours() {
		return totalHours;
	}

	public void setTotalHours(float totalHours) {
		this.totalHours = totalHours;
	}
    
    
    
    
}
