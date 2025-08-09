import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import 'iconify-icon';
import { LayoutService } from '../../services/layout.service';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';
import { MatDividerModule } from '@angular/material/divider';
import { AppService } from '../../services/app.service';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatMenuModule,
    MatDividerModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ToolbarComponent {
  // themeService: ThemeService = inject(ThemeService);
  layoutService: LayoutService = inject(LayoutService);
  authService: AuthService = inject(AuthService);
  appService: AppService = inject(AppService);

  userInfo: any;

  @Output() toggleSidebar = new EventEmitter<void>();

  ngOnInit(): void {
    this.userInfo = this.authService.getUserDetail();
  }

  logout(): void {
    this.authService.logout();
    // Navigate to login page
    window.location.href = '/login';
  }
}
