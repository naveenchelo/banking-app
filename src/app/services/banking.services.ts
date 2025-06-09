import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, map, Observable } from "rxjs";
import { Account, BankingSummary, Transaction, TransferMoney, User } from "../model/banking.model";

@Injectable({
  providedIn: 'root',
})
export class BankingService {
  private readonly API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.API_URL}/accounts`);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.API_URL}/transactions`);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/user`);
  }

  getBankingSummary(): Observable<BankingSummary> {
    return forkJoin({
      accounts: this.getAccounts(),
      transactions: this.getTransactions(),
    }).pipe(
      map(({ accounts, transactions }) => {
        const totalBalance = accounts.reduce(
          (sum, acc) => sum + acc.balance,
          0
        );
        const savingsBalance = accounts
          .filter((acc) => acc.accountType === 'Savings')
          .reduce((sum, acc) => sum + acc.balance, 0);
        const checkingBalance = accounts
          .filter((acc) => acc.accountType === 'Checking')
          .reduce((sum, acc) => sum + acc.balance, 0);
        const creditBalance = accounts
          .filter((acc) => acc.accountType === 'Credit')
          .reduce((sum, acc) => sum + acc.balance, 0);

        // Get recent transactions (last 5)
        const recentTransactions = transactions
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 5);

        return {
          totalBalance,
          savingsBalance,
          checkingBalance,
          creditBalance,
          accountsCount: accounts.length,
          recentTransactions,
        };
      })
    );
  }

  makeTransfer(transfer: TransferMoney): Observable<TransferMoney> {
    return this.http.post<TransferMoney>(`${this.API_URL}/transactions`, {
      ...transfer,
      date: new Date().toISOString(),
      status: 'completed',
      type: 'transfer',
      category: 'Transfer',
    });
  }

  getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.API_URL}/accounts/${id}`);
  }

  getTransactionsByAccountId(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.API_URL}/transactions?accountId=${accountId}`
    );
  }
}