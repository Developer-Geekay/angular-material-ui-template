import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';
import { LayoutService } from './services/layout.service';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  themeService: ThemeService = inject(ThemeService);
  layoutService: LayoutService = inject(LayoutService);


  title = 'angular-material-ui-template';
  constructor(private iconRegistry:MatIconRegistry) {
    this.iconRegistry.setDefaultFontSetClass("material-symbols-outlined")
  }

  ngOnInit(): void {

  }

}
