import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BankingSandbox } from './sandbox/banking.sandbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Banking App';
  sidenavOpened = true;
  private destroy$ = new Subject<void>();

  constructor(private readonly bankingSandbox: BankingSandbox ) {}

  ngOnInit(): void {
    this.initializeApp();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeApp(): void {
    // Load initial data
    this.bankingSandbox.loadUser();
    this.bankingSandbox.loadBankingSummary();
  }

  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
