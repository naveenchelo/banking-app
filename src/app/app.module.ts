import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BankingService } from './services/banking.services';
import { BankingEffects } from './store/effect/banking.effects';
import { BankingSandbox } from './sandbox/banking.sandbox';
import { bankingReducer } from './store/reducer/banking.reducers';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, 
    NavigationComponent, 
    DashboardComponent,
    TransferMoneyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Added this - required for Angular Material
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('banking', bankingReducer), 
    EffectsModule.forRoot([]), 
    EffectsModule.forFeature([BankingEffects]), 
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
    })
  ],
  providers: [BankingSandbox, BankingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
