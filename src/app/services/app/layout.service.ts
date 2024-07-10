import { Injectable, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  isHandset = signal<boolean>(false);
  currentPageTitle = signal<string>('');

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private pagetitle: Title
  ) {
    this.breakpointObserver
      .observe(Breakpoints.HandsetPortrait)
      .subscribe((result) => {
        this.isHandset.update((value) => (value = result.matches));
      });

    this.router.events.subscribe((data) => {
      if (data instanceof NavigationEnd) {
        let route = this.router.routerState.root;
        while (route.firstChild) {
          route = route.firstChild;
        }
        let title = route.snapshot.data['title'] || null;
        this.pagetitle.setTitle(title);
        this.currentPageTitle.set(title);
      }
    });
  }
}
