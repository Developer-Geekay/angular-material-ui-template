import { Injectable, signal } from '@angular/core';

export interface ThemeOptions {
  primary: string;
  primaryLight: string;
  ripple: string;
  primaryDark: string;
  background: string;
  error: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  darkMode = signal<boolean>(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  themeVariables: ThemeOptions = {
    primary: '#046e8f',
    primaryLight: '#dce3e9',
    ripple: '#046e8f1e',
    primaryDark: 'black',
    background: '#fbfcfe',
    error: '#ba1a1a',
  };
  definedThemes = [
    {
      name: 'Red',
      themeClass: 'red-theme',
      colorClass: 'red-theme-primary',
    },
    {
      name: 'Green',
      themeClass: 'green-theme',
      colorClass: 'green-theme-primary',
    },
    {
      name: 'Blue',
      themeClass: 'blue-theme',
      colorClass: 'blue-theme-primary',
    },
    {
      name: 'Yellow',
      themeClass: 'yellow-theme',
      colorClass: 'yellow-theme-primary',
    },
    {
      name: 'Cyan',
      themeClass: 'cyan-theme',
      colorClass: 'cyan-theme-primary',
    },
    {
      name: 'Rose',
      themeClass: 'rose-theme',
      colorClass: 'rose-theme-primary',
    },
    {
      name: 'Orange',
      themeClass: 'orange-theme',
      colorClass: 'orange-theme-primary',
    },
    {
      name: 'Spring Green',
      themeClass: 'spring-theme',
      colorClass: 'spring-theme-primary',
    },
    {
      name: 'Magenta',
      themeClass: 'magenta-theme',
      colorClass: 'magenta-theme-primary',
    },
    {
      name: 'Chartreuse',
      themeClass: 'chartreuse-theme',
      colorClass: 'chartreuse-theme-primary',
    },
    {
      name: 'Violet',
      themeClass: 'violet-theme',
      colorClass: 'violet-theme-primary',
    },
  ];

  constructor() {
    let currentAppTheme = localStorage.getItem('currentAppTheme');
    this.restoreTheme(currentAppTheme || '');
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode()
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark');
    mediaQueryList.addEventListener('change', (event) => {
      this.updateTheme(event.matches);
    });
  }

  updateTheme(isDarkMode: boolean) {
    this.darkMode.update((value) => (value = isDarkMode));
    isDarkMode
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark');
  }

  setPrimary(color: string) {
    this.themeVariables.primary = color;
  }
  setPrimaryLight(color: string) {
    this.themeVariables.primaryLight = color;
  }
  setPrimaryDark(color: string) {
    this.themeVariables.primaryDark = color;
  }
  setRipple(color: string) {
    this.themeVariables.ripple = color;
  }
  setBackground(color: string) {
    this.themeVariables.background = color;
  }
  setError(color: string) {
    this.themeVariables.error = color;
  }

  applyTheme(theme: any) {
    this.clearThemeClases();
    document.body.classList.add('custom-theme');
    localStorage.setItem('currentAppTheme', 'custom-theme');
    localStorage.setItem('currentAppThemeColors', JSON.stringify(theme));
    document.body.style.setProperty('--primary', theme.primary);
    document.body.style.setProperty('--primary-light', theme.primaryLight);
    document.body.style.setProperty('--ripple', theme.ripple);
    document.body.style.setProperty('--primary-dark', theme.primaryDark);
    document.body.style.setProperty('--background', theme.background);
    document.body.style.setProperty('--error', theme.error);
    this.updatePwaThemeColor();
  }

  switchTheme(themename: string) {
    this.clearThemeClases();
    document.body.classList.add(themename);
    localStorage.setItem('currentAppTheme', themename);
    this.updatePwaThemeColor();
  }

  updatePwaThemeColor() {
    const color = getComputedStyle(document.body).getPropertyValue(
      '--mdc-elevated-card-container-color'
    );
    document
      .querySelector('meta[name=theme-color]')
      ?.setAttribute('content', color);
  }

  restoreTheme(currentAppTheme: string) {
    if (currentAppTheme) {
      switch (currentAppTheme) {
        case 'custom-theme':
          let themeColors = localStorage.getItem('currentAppThemeColors');
          this.applyTheme(
            themeColors ? JSON.parse(themeColors) : this.themeVariables
          );
          break;

        default:
          this.switchTheme(localStorage.getItem('currentAppTheme') || '');
          break;
      }
    } else {
      // localStorage.setItem("currentAppTheme", "red-theme");
    }
    this.updatePwaThemeColor();
  }

  clearThemeClases() {
    const themesClassList = this.definedThemes.map((theme) => theme.themeClass);
    document.body.classList.remove('custom-theme');
    localStorage.removeItem('currentAppTheme');
    themesClassList.forEach((className) => {
      if (document.body.classList.contains(className))
        document.body.classList.remove(className);
    });
  }
}
