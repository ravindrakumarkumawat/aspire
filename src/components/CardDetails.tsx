import React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Card } from '../types';

interface CardDetailsProps {
  card: Card | null;
}

const CardDetails: React.FC<CardDetailsProps> = ({ card }) => {
  if (!card) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">Card details</h2>
        <button className="text-blue-500">
          <ChevronDown size={18} />
        </button>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        <div>
          <div className="text-xs sm:text-sm text-gray-500 mb-1">Card Number</div>
          <div className="text-sm sm:text-base font-medium">{card.cardNumber}</div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <div className="text-xs sm:text-sm text-gray-500 mb-1">Expiry Date</div>
            <div className="text-sm sm:text-base font-medium">{card.expiryDate}</div>
          </div>
          <div>
            <div className="text-xs sm:text-sm text-gray-500 mb-1">CVV</div>
            <div className="text-sm sm:text-base font-medium">•••</div>
          </div>
        </div>
        <div>
          <div className="text-xs sm:text-sm text-gray-500 mb-1">Card Type</div>
          <div className="text-sm sm:text-base font-medium capitalize">{card.cardType}</div>
        </div>
      </div>
      
      <div className="mt-3 sm:mt-4 flex items-center text-blue-500">
        <Check size={14} className="mr-1.5" />
        <span className="text-xs sm:text-sm font-medium">Card details are secure</span>
      </div>
    </div>
  );
};

export default CardDetails;
