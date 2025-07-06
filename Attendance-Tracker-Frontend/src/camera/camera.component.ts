import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera',
  standalone: false,
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent {
  // Reference to the video element in the template
  @ViewChild('videoElement') videoElement!: ElementRef;

  // Holds the captured image as a Blob
  capturedImage: Blob | null = null;

  // Emits the captured image to the parent component
  @Output() imageCaptured = new EventEmitter<Blob>();

  // Emits an event to close the camera modal
  @Output() closeCameraModal = new EventEmitter<void>();

  // Holds the media stream from the webcam
  private mediaStream: MediaStream | null = null;

  // Lifecycle hook: called after the view has been initialized
  ngAfterViewInit(): void {
    this.startCamera(); // Start the webcam
  }

  // Start the webcam and stream it to the video element
  startCamera(): void {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.mediaStream = stream;
        this.videoElement.nativeElement.srcObject = stream;
      })
      .catch((err) => {
        console.error('Error accessing webcam: ', err);
      });
  }

  // Capture the current frame from the video and convert it to a Blob
  captureImage(): void {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set canvas size to match video dimensions
    canvas.width = this.videoElement.nativeElement.videoWidth;
    canvas.height = this.videoElement.nativeElement.videoHeight;

    // Draw the current video frame onto the canvas
    context?.drawImage(this.videoElement.nativeElement, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to a Blob
    canvas.toBlob((blob) => {
      if (blob) {
        this.capturedImage = blob;
        this.imageCaptured.emit(blob); // Emit the image to parent
        this.closeCamera(); // Close the camera after capture
      } else {
        console.error("Failed to create Blob");
        this.closeCamera(); // Still close the camera on failure
      }
    }, 'image/png');
  }

  // Stop the webcam stream
  stopCamera(): void {
    if (this.mediaStream) {
      const tracks = this.mediaStream.getTracks();
      tracks.forEach(track => track.stop()); // Stop all tracks
      this.mediaStream = null;
    }
  }

  // Close the camera modal and stop the stream
  closeCamera(): void {
    this.stopCamera(); // Stop the webcam
    this.closeCameraModal.emit(); // Notify parent to close modal
  }
}
