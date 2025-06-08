import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BankingState, Account, Transaction, User, BankingSummary } from '../model/banking.model';
import * as BankingActions from '../store/actions/banking.actions';
import * as BankingSelectors from '../store/selector/banking.selectors';


@Injectable({
  providedIn: 'root'
})
export class BankingSandbox {

  // Observables
  public accounts$: Observable<Account[]>;
  public transactions$: Observable<Transaction[]>;
  public user$: Observable<User | null>;
  public bankingSummary$: Observable<BankingSummary | null>;
  public loading$: Observable<boolean>;
  public error$: Observable<string | null>;
  public accountsByType$: Observable<{ [key: string]: Account[] }>;
  public recentTransactions$: Observable<Transaction[]>;
  public totalBalance$: Observable<number>;

  constructor(private store: Store<BankingState>) {
    this.accounts$ = this.store.select(BankingSelectors.selectAccounts);
    this.transactions$ = this.store.select(BankingSelectors.selectTransactions);
    this.user$ = this.store.select(BankingSelectors.selectUser);
    this.bankingSummary$ = this.store.select(BankingSelectors.selectBankingSummary);
    this.loading$ = this.store.select(BankingSelectors.selectLoading);
    this.error$ = this.store.select(BankingSelectors.selectError);
    this.accountsByType$ = this.store.select(BankingSelectors.selectAccountsByType);
    this.recentTransactions$ = this.store.select(BankingSelectors.selectRecentTransactions);
    this.totalBalance$ = this.store.select(BankingSelectors.selectTotalBalance);
  }

  // Action dispatchers
  loadBankingSummary(): void {
    this.store.dispatch(BankingActions.loadBankingSummary());
  }

  loadAccounts(): void {
    this.store.dispatch(BankingActions.loadAccounts());
  }

  loadTransactions(): void {
    this.store.dispatch(BankingActions.loadTransactions());
  }

  loadUser(): void {
    this.store.dispatch(BankingActions.loadUser());
  }

  loadAccountById(id: number): void {
    this.store.dispatch(BankingActions.loadAccountById({ id }));
  }

  clearError(): void {
    this.store.dispatch(BankingActions.clearError());
  }

  // Selector methods
  getAccountById(id: number): Observable<Account | undefined> {
    return this.store.select(BankingSelectors.selectAccountById(id));
  }

  getTransactionsByAccountId(accountId: number): Observable<Transaction[]> {
    return this.store.select(BankingSelectors.selectTransactionsByAccountId(accountId));
  }
}