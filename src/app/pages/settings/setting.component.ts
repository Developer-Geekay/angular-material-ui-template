import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BaselayoutComponent } from '../../layouts/baselayout/baselayout.component';
import { BottombarComponent } from '../../shared/bottombar/bottombar.component';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    BaselayoutComponent,
    BottombarComponent
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss',
})
export class SettingComponent implements OnInit {
  selectedTabIndex = 0;

  settingsTabs = [
    {
      label: 'Theme',
      route: '/settings/theme',
      icon: 'palette',
      description: 'Appearance customization',
      disabled: false
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Set initial tab based on current route
    this.updateSelectedTab();
  }

  onTabChange(index: number): void {
    this.selectedTabIndex = index;
    const selectedTab = this.settingsTabs[index];

    // Navigate to the selected tab's route
    this.router.navigate([selectedTab.route]);
  }

  private updateSelectedTab(): void {
    const currentUrl = this.router.url;
    const tabIndex = this.settingsTabs.findIndex(tab =>
      currentUrl.includes(tab.route.split('/').pop() || '')
    );

    if (tabIndex !== -1) {
      this.selectedTabIndex = tabIndex;
    }
  }
}
