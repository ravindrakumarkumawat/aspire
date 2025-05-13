import React, { useState } from 'react';
import { Plus, ChevronUp } from 'lucide-react';
import CardCarousel from '../components/CardCarousel';
import CardControls from '../components/CardControls';
import TransactionHistory from '../components/TransactionHistory';
import CardDetails from '../components/CardDetails';
import AddCardModal from '../components/AddCardModal';
import { useCards } from '../hooks/useCards';

const CardsDashboard: React.FC = () => {
  const { 
    cards, 
    activeCardIndex, 
    setActiveCardIndex, 
    addCard, 
    toggleFreezeCard,
    getCardTransactions,
    isLoading
  } = useCards();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
  const activeCard = !isLoading && cards.length > 0 ? cards[activeCardIndex] : null;
  const transactions = activeCard ? getCardTransactions(activeCard.id) : [];
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 lg:text-gray-600 text-white">Loading your cards...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-4 lg:p-8 pt-16 lg:pt-8">
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex justify-between items-center w-full">
            <div>
              <h1 className="text-base text-gray-600 lg:text-gray-600 text-white">Account balance</h1>
              <div className="flex items-center mt-1">
                <span className="bg-[#01D167] text-white px-2 py-1 rounded text-sm mr-2">S$</span>
                <span className="text-2xl lg:text-3xl font-bold lg:text-black text-white">3,000</span>
              </div>
            </div>
            <div className="lg:hidden">
              <button className="text-white bg-transparent rounded-full p-1">
                <ChevronUp size={24} />
              </button>
            </div>
          </div>
          <button
            className="bg-[#325BAF] text-white rounded-md py-2 px-4 flex items-center justify-center w-full lg:w-auto"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} className="mr-2" />
            New card
          </button>
        </div>

        <div className="border-b border-gray-200 lg:border-gray-200 border-gray-600 overflow-x-auto">
          <div className="flex whitespace-nowrap">
            <button
              className={`py-3 px-4 lg:py-4 lg:px-6 font-medium text-xs lg:text-sm ${
                activeTab === 0 
                  ? 'text-[#01D167] border-b-2 border-[#01D167]' 
                  : 'lg:text-gray-500 text-gray-300'
              }`}
              onClick={() => setActiveTab(0)}
            >
              My debit cards
            </button>
            <button
              className={`py-3 px-4 lg:py-4 lg:px-6 font-medium text-xs lg:text-sm ${
                activeTab === 1 
                  ? 'text-[#01D167] border-b-2 border-[#01D167]' 
                  : 'lg:text-gray-500 text-gray-300'
              }`}
              onClick={() => setActiveTab(1)}
            >
              All company cards
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <div className="space-y-4 lg:space-y-6">
          <CardCarousel 
            cards={cards}
            activeIndex={activeCardIndex}
            onChangeActive={setActiveCardIndex}
          />
          
          <CardControls 
            card={activeCard}
            onFreezeCard={toggleFreezeCard}
          />
        </div>

        <div className="space-y-4 lg:space-y-6">
          <CardDetails card={activeCard} />
          <TransactionHistory 
            transactions={transactions} 
            currency={activeCard?.currency || 'S$'} 
          />
        </div>
      </div>
      
      <AddCardModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCard={addCard}
      />
    </div>
  );
};

export default CardsDashboard;
