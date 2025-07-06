import { Pipe, PipeTransform } from '@angular/core';

// Define a custom pipe named 'timeFormat'
@Pipe({
  name: 'timeFormat',
  standalone: false // Indicates this pipe is part of a module, not standalone
})
export class TimeFormatPipe implements PipeTransform {

  // The transform method is called when the pipe is used in a template
  transform(value: string): string {
    // If the input value is falsy (e.g., null, undefined, empty), return it as-is
    if (!value) return value;

    // Split the input time string (e.g., "14:30") into hours and minutes
    const [hours, minutes] = value.split(':').map(num => parseInt(num, 10));

    // Determine whether the time is AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour format to 12-hour format
    const hour12 = hours % 12;
    const hour = hour12 === 0 ? 12 : hour12; // Convert 0 to 12 for 12 AM/PM

    // Format the time string with leading zero for minutes and append AM/PM
    const formattedTime = `${hour}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    // Return the formatted time string
    return formattedTime;
  }

}
