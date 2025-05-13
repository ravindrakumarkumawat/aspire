export interface Card {
  id: string;
  name: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  frozen: boolean;
  cardType: 'visa' | 'mastercard';
  limit: number;
  spent: number;
  currency: string;
}

export interface Transaction {
  id: string;
  cardId: string;
  amount: number;
  merchant: string;
  category: string;
  date: string;
  status: 'completed' | 'pending' | 'declined';
}