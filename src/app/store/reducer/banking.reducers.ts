import { createReducer, on } from '@ngrx/store';
import { BankingState } from '../../model/banking.model';
import * as BankingActions from '../actions/banking.actions';

export const initialState: BankingState = {
  accounts: [],
  transactions: [],
  user: null,
  summary: null,
  loading: false,
  error: null,
  transfers: [],
};

export const bankingReducer = createReducer(
  initialState,

  // Load Banking Summary
  on(BankingActions.loadBankingSummary, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BankingActions.loadBankingSummarySuccess, (state, { summary }) => ({
    ...state,
    summary,
    loading: false,
    error: null,
  })),
  on(BankingActions.loadBankingSummaryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Transfer Money
  on(BankingActions.initiateTransfer, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(BankingActions.transferSuccess, (state, { transfer }) => ({
    ...state,
    transfers: [transfer, ...state.transfers],
    loading: false,
    error: null,
  })),

  on(BankingActions.transferFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load Accounts
  on(BankingActions.loadAccounts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BankingActions.loadAccountsSuccess, (state, { accounts }) => ({
    ...state,
    accounts,
    loading: false,
    error: null,
  })),
  on(BankingActions.loadAccountsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load Transactions
  on(BankingActions.loadTransactions, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BankingActions.loadTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    transactions,
    loading: false,
    error: null,
  })),
  on(BankingActions.loadTransactionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load User
  on(BankingActions.loadUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BankingActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),
  on(BankingActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load Account by ID
  on(BankingActions.loadAccountById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BankingActions.loadAccountByIdSuccess, (state, { account }) => ({
    ...state,
    accounts: state.accounts.some((acc) => acc.id === account.id)
      ? state.accounts.map((acc) => (acc.id === account.id ? account : acc))
      : [...state.accounts, account],
    loading: false,
    error: null,
  })),
  on(BankingActions.loadAccountByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Clear Error
  on(BankingActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);
