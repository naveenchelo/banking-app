import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BankingState } from '../../model/banking.model';

export const selectBankingState =
  createFeatureSelector<BankingState>('banking');

// Basic selectors
export const selectAccounts = createSelector(
  selectBankingState,
  (state: BankingState) => state.accounts
);

export const selectTransactions = createSelector(
  selectBankingState,
  (state: BankingState) => state.transactions
);

export const selectUser = createSelector(
  selectBankingState,
  (state: BankingState) => state.user
);

export const selectBankingSummary = createSelector(
  selectBankingState,
  (state: BankingState) => state.summary
);

export const selectLoading = createSelector(
  selectBankingState,
  (state: BankingState) => state.loading
);

export const selectError = createSelector(
  selectBankingState,
  (state: BankingState) => state.error
);

// Computed selectors
export const selectAccountsByType = createSelector(
  selectAccounts,
  (accounts) => {
    return {
      savings: accounts.filter((acc) => acc.accountType === 'Savings'),
      checking: accounts.filter((acc) => acc.accountType === 'Checking'),
      credit: accounts.filter((acc) => acc.accountType === 'Credit'),
    };
  }
);

export const selectRecentTransactions = createSelector(
  selectTransactions,
  (transactions) => {
    return transactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);
  }
);

export const selectTotalBalance = createSelector(selectAccounts, (accounts) => {
  return accounts.reduce((total, account) => total + account.balance, 0);
});

export const selectAccountById = (id: number) =>
  createSelector(selectAccounts, (accounts) =>
    accounts.find((account) => account.id === id)
  );

export const selectTransactionsByAccountId = (accountId: number) =>
  createSelector(selectTransactions, (transactions) =>
    transactions.filter((transaction) => transaction.accountId === accountId)
  );
