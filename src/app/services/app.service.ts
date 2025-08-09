import { Injectable, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DbServiceService } from './db-service.service';

interface AppSetting {
  id?: number;
  key: string;
  value: string | number | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  db: DbServiceService = inject(DbServiceService);
  _snackBar = inject(MatSnackBar);

  toast(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
