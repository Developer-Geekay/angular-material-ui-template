import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import 'iconify-icon';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottombar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatBottomSheetModule,CommonModule],
  templateUrl: './bottombar.component.html',
  styleUrl: './bottombar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BottombarComponent {
  private _bottomSheet = inject(MatBottomSheet);

  openMenu(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }

  checkMoreUrl(){
    const currentUrl = window.location.pathname;
    const validUrls = ['/profile', '/settings','/privacy','terms'];
    let menuActive = false;
    validUrls.forEach(url => {
      if (currentUrl.includes(url)) {
        menuActive = true;
      }
    });
    return menuActive;
  }
}


@Component({
  selector: 'more-menu',
  templateUrl: 'more-menu.html',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatDividerModule, CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BottomSheetOverviewExampleSheet {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<BottomSheetOverviewExampleSheet>>(MatBottomSheetRef);

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  closeMenu(): void {
    this._bottomSheetRef.dismiss();
  }
}
