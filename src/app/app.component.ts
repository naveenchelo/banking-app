import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BankingSandbox } from './sandbox/banking.sandbox';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Banking App';
  sidenavOpened = true;
  showNavigation = true;
  private destroy$ = new Subject<void>();

  // Routes where navigation should be hidden
  private hiddenRoutes = ['/login', '/register', '/forgot-password'];

  constructor(
    private readonly bankingSandbox: BankingSandbox,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeApp();
    this.setupRouteListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeApp(): void {
    // Load initial data only if not on auth routes
    this.updateNavigationVisibility();
    if (this.showNavigation) {
      this.bankingSandbox.loadUser();
      this.bankingSandbox.loadBankingSummary();
    }
  }

  private setupRouteListener(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.updateNavigationVisibility();
      });
  }

  private updateNavigationVisibility(): void {
    const currentRoute = this.router.url;
    this.showNavigation = !this.hiddenRoutes.some(route => 
      currentRoute.startsWith(route)
    );
  }

  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }
}