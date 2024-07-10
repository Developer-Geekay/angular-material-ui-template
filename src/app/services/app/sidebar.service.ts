import { Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {

  isSidebarExpanded = signal<boolean>(true);

  constructor() {
    this.updateSidebarState(false);
  }

  updateSidebarState(isExpanded: boolean) {
    this.isSidebarExpanded.update((value) => (value = isExpanded));
  }
}
