import { Component, OnInit } from '@angular/core';
import { BankingSandbox } from '../sandbox/banking.sandbox';
import { Observable } from 'rxjs';
import { Account, BankingSummary, Transaction } from '../model/banking.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  summary$: Observable<BankingSummary | null>;
  accounts$: Observable<Account[]>;
  recentTransactions$: Observable<Transaction[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private bankingSandbox: BankingSandbox) {
    this.summary$ = this.bankingSandbox.bankingSummary$;
    this.accounts$ = this.bankingSandbox.accounts$;
    this.recentTransactions$ = this.bankingSandbox.transactions$;
    this.loading$ = this.bankingSandbox.loading$;
    this.error$ = this.bankingSandbox.error$;
  }

  ngOnInit(): void {
    this.bankingSandbox.loadBankingSummary();
    this.bankingSandbox.loadAccounts();
    this.bankingSandbox.loadTransactions();
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  getTransactionIcon(type: 'credit' | 'debit'): string {
    return type === 'credit' ? 'arrow_downward' : 'arrow_upward';
  }

  getTransactionColor(type: 'credit' | 'debit'): string {
    return type === 'credit' ? 'green' : 'red';
  }
}
