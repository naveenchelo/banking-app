import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BankingSandbox } from '../sandbox/banking.sandbox';
import { filter, Observable } from 'rxjs';
import { User } from '../model/banking.model';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-navigation',
  standalone: false,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit{
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Accounts', icon: 'account_balance', route: '/accounts' },
    { label: 'Transfer Money', icon: 'payments', route: '/transfer-money' },
    { label: 'Transactions', icon: 'receipt_long', route: '/transactions' },
    { label: 'Profile', icon: 'person', route: '/profile' },
  ];

  user$!: Observable<User | null>;
  showNavigation = true;
  private hiddenRoutes = ['/login', '/register', '/forgot-password'];

  constructor(private router: Router, private bankingSandbox: BankingSandbox) {}

  ngOnInit(): void {
    this.updateActiveMenuItem();
    this.updateNavigationVisibility();
    this.user$ = this.bankingSandbox.user$;

    // Listen to route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveMenuItem();
        this.updateNavigationVisibility();
      });
  }

  navigateTo(route: string): void {
    if (this.router.url !== route) {
      this.router.navigate([route]);
    }
  }

  private updateActiveMenuItem(): void {
    const currentRoute = this.router.url;
    this.menuItems.forEach((item) => {
      item.active = currentRoute.startsWith(item.route);
    });
  }

  private updateNavigationVisibility(): void {
    const currentRoute = this.router.url;
    this.showNavigation = !this.hiddenRoutes.some(route => 
      currentRoute.startsWith(route)
    );
  }
}
