import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Accounts', icon: 'account_balance', route: '/accounts' },
    { label: 'Transactions', icon: 'receipt_long', route: '/transactions' },
    { label: 'Profile', icon: 'person', route: '/profile' }
  ];


  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.updateActiveMenuItem();
    
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  private updateActiveMenuItem(): void {
    const currentRoute = this.router.url;
    this.menuItems.forEach(item => {
      item.active = currentRoute.startsWith(item.route);
    });
  }
}
