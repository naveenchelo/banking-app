import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BankingSandbox } from '../sandbox/banking.sandbox';
import { TransferMoney } from '../model/banking.model';

@Component({
  selector: 'app-transfer-money',
  standalone: false,
  templateUrl: './transfer-money.component.html',
  styleUrl: './transfer-money.component.scss',
})
export class TransferMoneyComponent {
  transferForm: FormGroup;

  constructor(private fb: FormBuilder, private bankingSandbox: BankingSandbox) {

    this.transferForm = this.fb.group({
      recipientName: ['', [Validators.required, Validators.minLength(3)]],
      accountNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10,16}$')],
      ],
      ifscCode: [
        '',
        [Validators.required, Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')],
      ],
      amount: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern('^[0-9]*(.[0-9]{0,2})?$'),
        ],
      ],
    });

  }

  onSubmit() {
   if (this.transferForm.valid) {
    const formValue = this.transferForm.value;

    const transfer: TransferMoney = {
      ...formValue,
      date: new Date().toISOString(),
      status: 'pending',
      type: 'transfer',
      category: 'Transfer'
    };

    this.bankingSandbox.initiateTransfer(transfer);
    alert('Transfer initiated successfully!');
    this.transferForm.reset();
  }
  }

  onCancel() {
    this.transferForm.reset();
  }
}
