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
import { SidebarService } from '../../services/app/sidebar.service';
import { AvatarComponent } from '../avatar/avatar.component';
import { ThemeService } from '../../services/app/theme.service';
import { CommonModule } from '@angular/common';
import 'iconify-icon';
import { LayoutService } from '../../services/app/layout.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    AvatarComponent,
    CommonModule,
    MatMenuModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ToolbarComponent {
  sidebarService: SidebarService = inject(SidebarService);
  // themeService: ThemeService = inject(ThemeService);
  layoutService: LayoutService = inject(LayoutService);

  @Output() toggleSidebar = new EventEmitter<void>();
}
