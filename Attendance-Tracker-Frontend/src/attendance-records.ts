// Model class representing an employee's attendance record
export class AttendanceRecords {
  recordsId: number = 0;               // Unique ID for the attendance record
  employeeId: number = 0;              // ID of the employee
  employeeName: string | null = '';    // Name of the employee
  employeeEmail: string | null = '';   // Email of the employee
  inDate: string | null = '';          // Date when the employee marked in
  inTime: string = '';                 // Time when the employee marked in
  outDate: string | null = '';         // Date when the employee marked out
  outTime: string = '';                // Time when the employee marked out
  inPhoto: string | null = '';         // Base64 image string captured at check-in
  outPhoto: string | null = '';        // Base64 image string captured at check-out
  totalHours: number | null = 0;       // Total hours worked (calculated)
  inZone: string | null = '';          // Indicates if the employee was in the allowed zone (e.g., "YES" or "No")
}
