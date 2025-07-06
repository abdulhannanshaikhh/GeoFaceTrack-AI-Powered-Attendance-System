import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// Define a custom pipe named 'hourValidation'
@Pipe({
  name: 'hourValidation',
  standalone: false // Indicates this pipe is not standalone and is part of a module
})
export class HourValidationPipe implements PipeTransform {
  // Inject Angular's DomSanitizer to safely handle HTML content
  constructor(private sanitizer: DomSanitizer) {}

  // The transform method is called when the pipe is used in a template
  transform(value: number | null): SafeHtml {
    // If the input value is null, return an empty string
    if (value == null) return '';

    // If the value is less than 6, wrap it in a red-colored span tag; otherwise, return the value as-is
    const html = value < 6 ? `<span style="color: red;">${value}</span>` : `${value}`;

    // Sanitize the HTML to prevent security risks and return it as SafeHtml
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
