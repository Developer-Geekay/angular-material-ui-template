import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ThemeService, ThemeMode, MaterialPalette } from '../../../services/theme.service';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent {
  private themeService = inject(ThemeService);

  // Theme state
  themeMode = this.themeService.themeMode;
  primaryPalette = this.themeService.primaryPalette;
  density = this.themeService.density;
  isDarkMode = this.themeService.isDarkMode();

  // Available options
  themeModes: { value: ThemeMode; label: string; icon: string }[] = [
    { value: 'light', label: 'Light', icon: 'light_mode' },
    { value: 'dark', label: 'Dark', icon: 'dark_mode' },
    // { value: 'auto', label: 'Auto', icon: 'auto_mode' }
  ];

  densityOptions = [
    { value: 'comfortable', label: 'Comfortable' },
    { value: 'compact', label: 'Compact' },
    { value: 'spacious', label: 'Spacious' }
  ];

  // Color presets from Material Design palettes
  colorPresets = this.themeService.availablePalettes;

  /**
   * Set theme mode
   */
  setThemeMode(mode: ThemeMode): void {
    this.themeService.setThemeMode(mode);
  }

  /**
   * Set primary palette
   */
  setPrimaryPalette(palette: MaterialPalette): void {
    this.themeService.setPrimaryPalette(palette);
  }

  /**
   * Set density
   */
  setDensity(density: 'comfortable' | 'compact' | 'spacious'): void {
    this.themeService.setDensity(density);
  }

  /**
   * Apply color preset
   */
  applyColorPreset(preset: { value: MaterialPalette; primary: string; accent: string }): void {
    this.themeService.setPrimaryPalette(preset.value);
  }

  /**
   * Toggle dark mode
   */
  toggleDarkMode(): void {
    this.themeService.toggleTheme();
  }

  /**
   * Get current theme mode display name
   */
  getCurrentThemeModeName(): string {
    const mode = this.themeMode();
    const themeMode = this.themeModes.find(tm => tm.value === mode);
    return themeMode ? themeMode.label : 'Light';
  }

  /**
   * Get current density display name
   */
  getCurrentDensityName(): string {
    const currentDensity = this.density();
    const densityOption = this.densityOptions.find(d => d.value === currentDensity);
    return densityOption ? densityOption.label : 'Comfortable';
  }

  /**
   * Get current palette info
   */
  getCurrentPalette() {
    return this.themeService.getCurrentPalette();
  }
}
