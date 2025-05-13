import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  isFront: boolean;
  onFlip: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ card, isFront, onFlip, className = '' }) => {
  const [showCardNumber, setShowCardNumber] = useState(false);
  
  const toggleCardNumber = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCardNumber(prev => !prev);
  };
  
  const cardClasses = `
    relative w-full max-w-sm h-48 sm:h-56 rounded-xl shadow-lg p-4 sm:p-6 
    transition-all duration-500 transform cursor-pointer
    ${card.frozen ? 'opacity-75 grayscale' : ''}
    ${className}
  `;

  const frontCardClasses = `
    ${cardClasses}
    bg-[#01D167] text-white
  `;
  
  if (isFront) {
    return (
      <div className={frontCardClasses} onClick={onFlip}>
        {card.frozen && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-60 text-white font-bold py-1 px-4 rounded-full transform -rotate-12 uppercase text-lg">
              Frozen
            </div>
          </div>
        )}
        
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
          <div className="flex">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#EB001B] rounded-full opacity-80 -mr-2 sm:-mr-3"></div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#F79E1B] rounded-full opacity-80"></div>
          </div>
        </div>
        
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
          <div className="flex items-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded flex items-center justify-center mr-2">
              <div className="w-0 h-0 border-t-[6px] sm:border-t-[8px] border-t-transparent border-l-[9px] sm:border-l-[12px] border-l-[#01D167] border-b-[6px] sm:border-b-[8px] border-b-transparent"></div>
            </div>
            <span className="text-white font-bold text-sm sm:text-base">aspire</span>
          </div>
        </div>
        
        <div className="mt-12 sm:mt-16">
          <div className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{card.name}</div>
          
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="text-lg sm:text-xl tracking-widest font-medium">
              {showCardNumber ? card.cardNumber : '•••• •••• •••• ' + card.cardNumber.slice(-4)}
            </div>
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs opacity-80 mb-1">Thru: {card.expiryDate}</div>
            </div>
            
            <div>
              <div className="text-xs opacity-80 mb-1">CVV: ***</div>
            </div>
            
            <div className="text-right">
              <div className="text-white font-bold text-lg sm:text-xl">VISA</div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={toggleCardNumber}
          className="absolute top-4 sm:top-6 right-16 sm:right-24 text-[#01D167] bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-medium flex items-center"
        >
          <Eye size={12} className="mr-1" /> Show card number
        </button>
      </div>
    );
  }
  
  return null; // We're not using the back side in this design
};

export default Card;
