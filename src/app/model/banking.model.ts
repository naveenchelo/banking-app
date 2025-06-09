export interface Account {
    id: number;
    accountNumber: string;
    accountType: 'Savings' | 'Checking' | 'Credit';
    balance: number;
    currency: string;
    accountHolderName: string;
  }
  
  export interface Transaction {
    id: number;
    accountId: number;
    type: 'credit' | 'debit';
    amount: number;
    description: string;
    date: string;
    category: string;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  }
  
  export interface BankingSummary {
    totalBalance: number;
    savingsBalance: number;
    checkingBalance: number;
    creditBalance: number;
    accountsCount: number;
    recentTransactions: Transaction[];
  }
  
  export interface BankingState {
    accounts: Account[];
    transactions: Transaction[];
    user: User | null;
    summary: BankingSummary | null;
    loading: boolean;
    error: string | null;
    transfers: TransferMoney[];
  }

  export interface TransferMoney {
    recipientName: string;
    accountNumber: string;
    ifscCode: string;
    amount: number;
    date: string;
    status: 'pending' | 'completed' | 'failed';
    type: 'transfer';
    category: 'Transfer';
  }