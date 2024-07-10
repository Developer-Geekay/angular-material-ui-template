import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import {
  PreloadAllModules,
  TitleStrategy,
  provideRouter,
  withDebugTracing,
  withPreloading,
} from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      // withPreloading(PreloadAllModules),
      // withDebugTracing()
    ),
    provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: true,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideHttpClient(withFetch()),
    // provideOAuthClient()
  ],
};


