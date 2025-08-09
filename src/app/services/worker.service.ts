import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

function promptUser(event: VersionReadyEvent): boolean {
  return true;
}

@Injectable({
  providedIn: 'root',
})
export class WorkerService {

  constructor(
    private updates: SwUpdate,
    private appRef: ApplicationRef,
    private snackBar: MatSnackBar
  ) {
    this.checkForUpdates();
  }
  private checkForUpdates(): void {
    if (!this.updates.isEnabled) return;

    // Check for updates every 6 hours after app is stable
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    const every6Hours$ = interval(6 * 60 * 60 * 1000);

    appIsStable$.subscribe(() => {
      this.updates.checkForUpdate(); // trigger initial check
      every6Hours$.subscribe(() => this.updates.checkForUpdate());
    });

    this.updates.versionUpdates.subscribe(async (evt) => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          break;

        case 'VERSION_READY':
          const snack = this.snackBar.open('A new version is available!', 'Reload');
          snack.onAction().subscribe(async () => {
            await this.updates.activateUpdate();
            document.location.reload();
          });
          break;

        case 'VERSION_INSTALLATION_FAILED':
          console.error(`❌ Failed to install version '${evt.version.hash}':`, evt.error);
          break;
      }
    });
  }
}
