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

  // Initialize cards from localStorage or generate mock data
  useEffect(() => {
    const fetchCards = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const storedCards = localStorage.getItem(STORAGE_KEY);
        const storedTransactions = localStorage.getItem(TRANSACTIONS_KEY);
        
        if (storedCards && storedTransactions) {
          setCards(JSON.parse(storedCards));
          setTransactions(JSON.parse(storedTransactions));
        } else {
          const mockCards = generateMockCards();
          const mockTransactions = generateMockTransactions(mockCards.map(card => card.id));
          
          setCards(mockCards);
          setTransactions(mockTransactions);
          
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCards));
          localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(mockTransactions));
        }
      } catch (error) {
        console.error('Error loading cards:', error);
        // Fallback to mock data if localStorage fails
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

  // Save cards to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && cards.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    }
  }, [cards, isLoading]);

  // Save transactions to localStorage whenever they change
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
    
    // Generate some mock transactions for the new card
    const newTransactions = generateMockTransactions([newCard.id]);
    setTransactions([...transactions, ...newTransactions]);
    
    // Set the new card as active
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
    getCardTransactions
  };
};