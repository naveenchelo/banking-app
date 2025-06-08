import { createAction, props } from '@ngrx/store';
import {
  Account,
  BankingSummary,
  Transaction,
  User,
} from '../../model/banking.model';

export const loadBankingSummary = createAction(
  '[Banking] Load Banking Summary'
);
export const loadBankingSummarySuccess = createAction(
  '[Banking] Load Banking Summary Success',
  props<{ summary: BankingSummary }>()
);
export const loadBankingSummaryFailure = createAction(
  '[Banking] Load Banking Summary Failure',
  props<{ error: string }>()
);

// Load Accounts
export const loadAccounts = createAction('[Banking] Load Accounts');
export const loadAccountsSuccess = createAction(
  '[Banking] Load Accounts Success',
  props<{ accounts: Account[] }>()
);
export const loadAccountsFailure = createAction(
  '[Banking] Load Accounts Failure',
  props<{ error: string }>()
);

// Load Transactions
export const loadTransactions = createAction('[Banking] Load Transactions');
export const loadTransactionsSuccess = createAction(
  '[Banking] Load Transactions Success',
  props<{ transactions: Transaction[] }>()
);
export const loadTransactionsFailure = createAction(
  '[Banking] Load Transactions Failure',
  props<{ error: string }>()
);

// Load User
export const loadUser = createAction('[Banking] Load User');
export const loadUserSuccess = createAction(
  '[Banking] Load User Success',
  props<{ user: User }>()
);
export const loadUserFailure = createAction(
  '[Banking] Load User Failure',
  props<{ error: string }>()
);

// Load Account by ID
export const loadAccountById = createAction(
  '[Banking] Load Account By ID',
  props<{ id: number }>()
);
export const loadAccountByIdSuccess = createAction(
  '[Banking] Load Account By ID Success',
  props<{ account: Account }>()
);
export const loadAccountByIdFailure = createAction(
  '[Banking] Load Account By ID Failure',
  props<{ error: string }>()
);

// Clear Error
export const clearError = createAction('[Banking] Clear Error');
