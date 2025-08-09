import { Injectable, signal, computed, effect } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type MaterialPalette = 'green' | 'blue' | 'purple' | 'orange' | 'teal' | 'indigo' | 'red' | 'pink' | 'yellow' | 'brown' | 'grey' | 'blue-grey';

export interface ThemeConfig {
  mode: ThemeMode;
  primaryPalette: MaterialPalette;
  density: 'comfortable' | 'compact' | 'spacious';
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Theme state signals
  private _themeMode = signal<ThemeMode>('light');
  private _primaryPalette = signal<MaterialPalette>('green');
  private _density = signal<'comfortable' | 'compact' | 'spacious'>('comfortable');
  private _hasCustomTheme = signal<boolean>(false);

  // Computed values
  public readonly themeMode = this._themeMode.asReadonly();
  public readonly primaryPalette = this._primaryPalette.asReadonly();
  public readonly density = this._density.asReadonly();
  public readonly hasCustomTheme = this._hasCustomTheme.asReadonly();

  // Computed theme configuration
  public readonly themeConfig = computed(() => ({
    mode: this._themeMode(),
    primaryPalette: this._primaryPalette(),
    density: this._density()
  }));

  // Computed CSS class for theme
  public readonly themeClass = computed(() => {
    const mode = this._themeMode();
    if (mode === 'auto') {
      return this.isDarkMode() ? 'dark-theme' : '';
    }
    return mode === 'dark' ? 'dark-theme' : '';
  });

  // Available palettes with their display names and colors
  public readonly availablePalettes: { value: MaterialPalette; name: string; primary: string; accent: string }[] = [
    { value: 'green', name: 'Green', primary: '#4CAF50', accent: '#8BC34A' },
    { value: 'blue', name: 'Blue', primary: '#2196F3', accent: '#03A9F4' },
    { value: 'purple', name: 'Purple', primary: '#9C27B0', accent: '#E91E63' },
    { value: 'orange', name: 'Orange', primary: '#FF9800', accent: '#FF5722' },
    { value: 'teal', name: 'Teal', primary: '#009688', accent: '#00BCD4' },
    { value: 'indigo', name: 'Indigo', primary: '#3F51B5', accent: '#2196F3' },
    { value: 'red', name: 'Red', primary: '#F44336', accent: '#FF5722' },
    { value: 'pink', name: 'Pink', primary: '#E91E63', accent: '#FF4081' },
    { value: 'yellow', name: 'Yellow', primary: '#FFEB3B', accent: '#FFC107' },
    { value: 'brown', name: 'Brown', primary: '#795548', accent: '#8D6E63' },
    { value: 'grey', name: 'Grey', primary: '#9E9E9E', accent: '#607D8B' },
    { value: 'blue-grey', name: 'Blue Grey', primary: '#607D8B', accent: '#78909C' }
  ];

  constructor(private router: Router) {
    // Load saved theme from localStorage
    this.loadThemeFromStorage();

    // Apply theme immediately after loading
    this.applyTheme();

    // Apply theme changes to document for future changes
    effect(() => {
      this.applyTheme();
    });

    // Listen for system theme changes if auto mode is enabled
    this.setupSystemThemeListener();
  }

  /**
   * Set the theme mode
   */
  setThemeMode(mode: ThemeMode): void {
    this._themeMode.set(mode);
    this._hasCustomTheme.set(true);
    this.saveThemeToStorage();
  }

  /**
   * Set the primary palette
   */
  setPrimaryPalette(palette: MaterialPalette): void {
    this._primaryPalette.set(palette);
    this._hasCustomTheme.set(true);
    this.saveThemeToStorage();
  }

  /**
   * Set the density
   */
  setDensity(density: 'comfortable' | 'compact' | 'spacious'): void {
    this._density.set(density);
    this._hasCustomTheme.set(true);
    this.saveThemeToStorage();
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const currentMode = this._themeMode();
    if (currentMode === 'auto') {
      this.setThemeMode('light');
    } else if (currentMode === 'light') {
      this.setThemeMode('dark');
    } else {
      this.setThemeMode('light');
    }
  }

  /**
   * Check if dark mode is currently active
   */
  isDarkMode(): boolean {
    const mode = this._themeMode();
    if (mode === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return mode === 'dark';
  }

  /**
   * Apply the current theme to the document
   */
  private applyTheme(): void {
    const config = this.themeConfig();
    const themeClass = this.themeClass();
    const root = document.documentElement;

    // Remove all palette classes
    const paletteClasses = [
      'green-palette', 'blue-palette', 'purple-palette', 'orange-palette',
      'teal-palette', 'indigo-palette', 'red-palette', 'pink-palette',
      'yellow-palette', 'brown-palette', 'grey-palette', 'blue-grey-palette'
    ];
    root.classList.remove(...paletteClasses);

    // Remove dark theme class
    root.classList.remove('dark-theme');

    // Apply palette class
    root.classList.add(`${config.primaryPalette}-palette`);

    // Apply dark theme class if needed
    if (themeClass) {
      root.classList.add(themeClass);
    }
    let color = getComputedStyle(document.body).getPropertyValue('--mat-sys-background');
    if(this._themeMode() == "light") color = getComputedStyle(document.body).getPropertyValue('--mat-sys-inverse-primary');
    document.querySelector('meta[name=theme-color]')?.setAttribute('content', color);
    // Apply density class
    root.classList.remove('density-comfortable', 'density-compact', 'density-spacious');
    root.classList.add(`density-${config.density}`);
  }

  /**
   * Get current palette info
   */
  getCurrentPalette() {
    const currentPalette = this._primaryPalette();
    return this.availablePalettes.find(p => p.value === currentPalette) || this.availablePalettes[0];
  }

  /**
   * Get theme presets for backward compatibility
   */
  getThemePresets() {
    return this.availablePalettes;
  }

  /**
   * Apply a palette preset
   */
  applyPreset(paletteName: MaterialPalette): void {
    this.setPrimaryPalette(paletteName);
  }

  /**
   * Setup system theme change listener
   */
  private setupSystemThemeListener(): void {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (event) => {
        this._themeMode.set((event.matches) ? "dark" : "light")
      });
    }
  }

  /**
   * Load theme from localStorage
   */
  private loadThemeFromStorage(): void {
    try {
      const savedTheme = localStorage.getItem('expense-app-theme');

      if (savedTheme) {
        const theme = JSON.parse(savedTheme);

        if (theme.mode) this._themeMode.set(theme.mode);
        if (theme.primaryPalette) this._primaryPalette.set(theme.primaryPalette);
        if (theme.density) this._density.set(theme.density);

        // Check if user has ever customized the theme
        if (theme.hasCustomTheme) {
          this._hasCustomTheme.set(true);
        }
      } else {
        // No saved theme found, using defaults
      }
    } catch (error) {
      // Failed to load theme from localStorage
    }
  }

  /**
   * Save theme to localStorage
   */
  private saveThemeToStorage(): void {
    try {
      const theme = {
        mode: this._themeMode(),
        primaryPalette: this._primaryPalette(),
        density: this._density(),
        hasCustomTheme: this._hasCustomTheme()
      };
      localStorage.setItem('expense-app-theme', JSON.stringify(theme));
    } catch (error) {
      // Failed to save theme to localStorage
    }
  }
}
