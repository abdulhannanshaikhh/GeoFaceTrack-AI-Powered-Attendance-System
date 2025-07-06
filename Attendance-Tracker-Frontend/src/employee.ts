// Model class representing an employee's profile
export class Employee {
  employeeId: number = 0;               // Unique identifier for the employee
  employeeName: string = '';            // Full name of the employee
  employeeEmail: string = '';           // Email address
  jobCode: string = '';                 // Job code or designation code
  position: string = '';                // Job title or position
  team: string = '';                    // Team or department name
  officeLocation: string = '';          // Office location (e.g., Bangalore, Mumbai)
  joiningDate: string = '';             // Date of joining the company
  corpId: string = '';                  // Corporate ID or internal login ID
  status: string = '';                  // Employment status (e.g., Active, Inactive)
  address: string = '';                 // Residential address
  gender: string = '';                  // Gender of the employee
  qualification: string = '';           // Educational qualification
  referencePhoto: string | null = '';   // Base64-encoded reference photo for face recognition
}
