import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { BankingService } from '../../services/banking.services';
import * as BankingActions from '../actions/banking.actions';

@Injectable()
export class BankingEffects {
  constructor(
    private actions$: Actions,
    private bankingService: BankingService
  ) {}

  loadBankingSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BankingActions.loadBankingSummary),
      mergeMap(() =>
        this.bankingService.getBankingSummary().pipe(
          map((summary) =>
            BankingActions.loadBankingSummarySuccess({ summary })
          ),
          catchError((error) =>
            of(
              BankingActions.loadBankingSummaryFailure({
                error: error.message || 'Failed to load banking summary',
              })
            )
          )
        )
      )
    )
  );

  loadAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BankingActions.loadAccounts),
      mergeMap(() =>
        this.bankingService.getAccounts().pipe(
          map((accounts) => BankingActions.loadAccountsSuccess({ accounts })),
          catchError((error) =>
            of(
              BankingActions.loadAccountsFailure({
                error: error.message || 'Failed to load accounts',
              })
            )
          )
        )
      )
    )
  );

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BankingActions.loadTransactions),
      mergeMap(() =>
        this.bankingService.getTransactions().pipe(
          map((transactions) =>
            BankingActions.loadTransactionsSuccess({ transactions })
          ),
          catchError((error) =>
            of(
              BankingActions.loadTransactionsFailure({
                error: error.message || 'Failed to load transactions',
              })
            )
          )
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BankingActions.loadUser),
      mergeMap(() =>
        this.bankingService.getUser().pipe(
          map((user) => BankingActions.loadUserSuccess({ user })),
          catchError((error) =>
            of(
              BankingActions.loadUserFailure({
                error: error.message || 'Failed to load user',
              })
            )
          )
        )
      )
    )
  );

  loadAccountById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BankingActions.loadAccountById),
      mergeMap((action) =>
        this.bankingService.getAccountById(action.id).pipe(
          map((account) => BankingActions.loadAccountByIdSuccess({ account })),
          catchError((error) =>
            of(
              BankingActions.loadAccountByIdFailure({
                error: error.message || 'Failed to load account',
              })
            )
          )
        )
      )
    )
  );
}
