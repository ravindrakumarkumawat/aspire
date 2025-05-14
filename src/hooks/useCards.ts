import { useState, useEffect } from 'react';
import { Card, Transaction } from '../types';
import { generateMockCards, generateMockTransactions } from '../utils/mockData';
import { generateCardNumber, generateExpiryDate, generateCVV, getCardType } from '../utils/cardUtils';

const STORAGE_KEY = 'aspire-app-cards';
const TRANSACTIONS_KEY = 'aspire-app-transactions';

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const storedCards = localStorage.getItem(STORAGE_KEY);
        const storedTransactions = localStorage.getItem(TRANSACTIONS_KEY);
        
        if (storedCards && storedTransactions) {
          setCards(JSON.parse(storedCards));
          setTransactions(JSON.parse(storedTransactions));
        } else {
          const mockCards = generateMockCards(Math.floor(Math.random() * (10 - 3 + 1)) + 3);
          const mockTransactions = generateMockTransactions(mockCards.map(card => card.id));
          
          setCards(mockCards);
          setTransactions(mockTransactions);
          
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCards));
          localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(mockTransactions));
        }
      } catch (error) {
        console.error('Error loading cards:', error);
        const mockCards = generateMockCards();
        const mockTransactions = generateMockTransactions(mockCards.map(card => card.id));
        setCards(mockCards);
        setTransactions(mockTransactions);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCards();
  }, []);

  useEffect(() => {
    if (!isLoading && cards.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    }
  }, [cards, isLoading]);

  useEffect(() => {
    if (!isLoading && transactions.length > 0) {
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    }
  }, [transactions, isLoading]);

  const addCard = (name: string) => {
    const cardNumber = generateCardNumber();
    const expiryDate = generateExpiryDate();
    const cvv = generateCVV();
    const cardType = getCardType(cardNumber);
    
    const newCard: Card = {
      id: `card-${Date.now()}`,
      name,
      cardNumber,
      expiryDate,
      cvv,
      frozen: false,
      cardType,
      limit: 2500,
      spent: 0,
      currency: 'S$'
    };
    
    const newCards = [...cards, newCard];
    setCards(newCards);
    
    const newTransactions = generateMockTransactions([newCard.id]);
    setTransactions([...transactions, ...newTransactions]);
    
    setActiveCardIndex(newCards.length - 1);
    
    return newCard;
  };

  const toggleFreezeCard = (cardId: string) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === cardId 
          ? { ...card, frozen: !card.frozen } 
          : card
      )
    );
  };

  const setSpendLimit = (cardId: string, limit: number) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === cardId 
          ? { ...card, limit } 
          : card
      )
    );
  };

  const addToGPay = (cardId: string) => {
    console.log(`Card ${cardId} added to Google Pay`);
    return true;
  };

  const replaceCard = (cardId: string, newName?: string, newCardNumber?: string, newExpiryDate?: string, newCVV?: string) => {
    const cardToReplace = cards.find(card => card.id === cardId);
    if (!cardToReplace) return null;

    const cardNumber = newCardNumber || generateCardNumber();
    const expiryDate = newExpiryDate || generateExpiryDate();
    const cvv = newCVV || generateCVV();
    
    const newCard: Card = {
      ...cardToReplace,
      name: newName || cardToReplace.name,
      cardNumber,
      expiryDate,
      cvv,
      frozen: false,
    };
    
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === cardId ? newCard : card
      )
    );
    
    return newCard;
  };

  const cancelCard = (cardId: string) => {
    setCards(prevCards => prevCards.filter(card => card.id !== cardId));
    
    if (cards[activeCardIndex]?.id === cardId) {
      setActiveCardIndex(Math.max(0, activeCardIndex - 1));
    }
    
    return true;
  };

  const getCardTransactions = (cardId: string) => {
    return transactions.filter(t => t.cardId === cardId);
  };

  return {
    cards,
    transactions,
    activeCardIndex,
    setActiveCardIndex,
    isLoading,
    addCard,
    toggleFreezeCard,
    setSpendLimit,
    addToGPay,
    replaceCard,
    cancelCard,
    getCardTransactions
  };
};
