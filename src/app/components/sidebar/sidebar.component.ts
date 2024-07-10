import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  inject,
} from '@angular/core';
import { ThemeService } from '../../services/app/theme.service';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidebarService } from '../../services/app/sidebar.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MatListModule } from '@angular/material/list';
import 'iconify-icon';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from '../../services/app/layout.service';
import { SettingthemeComponent } from '../../pages/partials/settingtheme/settingtheme.component';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [
    AsyncPipe,
    MatSidenavModule,
    MatButtonModule,
    CommonModule,
    MatDividerModule,
    RouterLink,
    RouterOutlet,
    ToolbarComponent,
    MatListModule,
    MatIconModule,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  themeService: ThemeService = inject(ThemeService);
  sidebarService: SidebarService = inject(SidebarService);
  layoutService: LayoutService = inject(LayoutService);
  pageTitle: string | null = '';
  readonly themeDialog = inject(MatDialog);

  @ViewChild('sidebarDrawer') private sidenav: MatSidenav | any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.openDialog("0ms","0ms")
  }
  toggleTheme() {
    this.themeService.updateTheme(!this.themeService.darkMode());
  }

  updateSidebar() {
    if (this.layoutService.isHandset()) this.sidenav.toggle();
    this.sidebarService.updateSidebarState(
      !this.sidebarService.isSidebarExpanded()
    );
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    if (this.layoutService.isHandset()) this.sidenav.toggle();
    this.themeDialog.open(SettingthemeComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      // hasBackdrop: false,
      disableClose:true
    });
  }

  logout() {
    this.router.navigate(['login']);
  }
}
