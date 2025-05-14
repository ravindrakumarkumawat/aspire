import { Card, Transaction } from '../types';
import { generateCardNumber, generateExpiryDate, generateCVV, getCardType } from './cardUtils';

export const generateMockCards = (count = 3): Card[] => {
  const cards: Card[] = [];
  
  const names = [
    'Mark Henry',
    'John Smith',
    'Sarah Johnson',
    'David Williams',
    'Emma Brown'
  ];
  
  for (let i = 0; i < count; i++) {
    const cardNumber = generateCardNumber();
    cards.push({
      id: `card-${i + 1}`,
      name: names[i % names.length],
      cardNumber,
      expiryDate: generateExpiryDate(),
      cvv: generateCVV(),
      frozen: false,
      cardType: getCardType(cardNumber),
      limit: 2500,
      spent: Math.floor(Math.random() * 1000) + 500,
      currency: 'S$'
    });
  }
  
  return cards;
};

export const generateMockTransactions = (cardIds: string[]): Transaction[] => {
  const transactions: Transaction[] = [];
  
  const merchants = [
    'Apple',
    'Amazon',
    'Netflix',
    'Uber',
    'Starbucks',
  ];
  
  const categories = [
    'Technology',
    'Shopping',
    'Entertainment',
    'Transportation',
    'Groceries'
  ];
  
  cardIds.forEach(cardId => {
    // Generate 3-5 transactions per card
    const transactionCount = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 0; i < transactionCount; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      
      const randomIndex = Math.floor(Math.random() * merchants.length)
      transactions.push({
        id: `trans-${cardId}-${i + 1}`,
        cardId,
        amount: Math.floor(Math.random() * 200) + 10,
        merchant: merchants[randomIndex],
        category: categories[randomIndex],
        date: date.toISOString(),
        status: Math.random() > 0.1 ? 'completed' : (Math.random() > 0.5 ? 'pending' : 'declined')
      });
    }
  });
  
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};