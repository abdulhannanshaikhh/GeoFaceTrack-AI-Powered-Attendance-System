import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Bootstrap the Angular application using the root module
platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true, // Optimize change detection by coalescing events
  })
  .catch((err) => console.error(err)); // Log any errors that occur during bootstrap
