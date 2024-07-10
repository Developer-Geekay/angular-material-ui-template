import {
  ChangeDetectionStrategy,
  Component,
  inject,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  ThemeService,
  ThemeOptions,
} from '../../../services/app/theme.service';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxColorsModule } from 'ngx-colors';
import { MatTooltipModule } from '@angular/material/tooltip';
import 'iconify-icon';

@Component({
  selector: 'setting-theme',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatExpansionModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxColorsModule,
    MatTooltipModule,
  ],
  templateUrl: './settingtheme.component.html',
  styleUrl: './settingtheme.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SettingthemeComponent {
  themeService: ThemeService = inject(ThemeService);
  readonly dialogRef = inject(MatDialogRef<SettingthemeComponent>);
  customTheme = new FormGroup({
    primary: new FormControl(this.themeService.themeVariables.primary, [
      Validators.required,
    ]),
    primaryLight: new FormControl(
      this.themeService.themeVariables.primaryLight,
      [Validators.required]
    ),
    ripple: new FormControl(this.themeService.themeVariables.ripple, [
      Validators.required,
    ]),
    primaryDark: new FormControl(this.themeService.themeVariables.primaryDark, [
      Validators.required,
    ]),
    background: new FormControl(this.themeService.themeVariables.background, [
      Validators.required,
    ]),
    error: new FormControl(this.themeService.themeVariables.error, [
      Validators.required,
    ]),
  });

  selectTheme(themeName: string, element: any) {
    this.clearActiveItem();
    element.classList.add('active');
    this.themeService.switchTheme(themeName);
  }

  applyTheme() {
    this.themeService.applyTheme(this.customTheme.value);
  }

  clearActiveItem() {
    document.querySelectorAll('.theme-color-item').forEach((ele) => {
      ele.classList.remove('active');
    });
  }

  ngAfterViewInit() {
    let themeColors = localStorage.getItem('currentAppThemeColors');
    const currentAppTheme = localStorage.getItem('currentAppTheme');
    if (currentAppTheme && currentAppTheme !== 'custom-theme') {
      const themeName = this.themeService.definedThemes
        .filter((theme) => theme.themeClass === currentAppTheme)
        .map((theme) => theme.colorClass);
      document.querySelector(`.${themeName}`)?.classList.add('active');
    }
    this.customTheme.patchValue(
      themeColors ? JSON.parse(themeColors) : this.themeService.themeVariables
    );
  }

  resetTheme() {
    this.clearActiveItem();
    this.themeService.clearThemeClases();
  }
}
