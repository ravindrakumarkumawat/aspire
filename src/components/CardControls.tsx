import React from 'react';
import { Lock, Sliders, CreditCard, RefreshCcw, Trash2 } from 'lucide-react';
import { Card } from '../types';

interface CardControlsProps {
  card: Card | null;
  onFreezeCard: (cardId: string) => void;
  onAddCard?: () => void; // Made optional since we're not using it
}

const CardControls: React.FC<CardControlsProps> = ({ card, onFreezeCard }) => {
  if (!card) return null;
  
  const controls = [
    {
      icon: <Lock size={20} color="#325BAF" />,
      label: card.frozen ? 'Unfreeze card' : 'Freeze card',
      onClick: () => onFreezeCard(card.id),
      color: '#325BAF'
    },
    {
      icon: <Sliders size={20} color="#325BAF" />,
      label: 'Set spend limit',
      onClick: () => {},
      color: '#325BAF'
    },
    {
      icon: <CreditCard size={20} color="#325BAF" />,
      label: 'Add to GPay',
      onClick: () => {},
      color: '#325BAF'
    },
    {
      icon: <RefreshCcw size={20} color="#325BAF" />,
      label: 'Replace card',
      onClick: () => {},
      color: '#325BAF'
    },
    {
      icon: <Trash2 size={20} color="#325BAF" />,
      label: 'Cancel card',
      onClick: () => {},
      color: '#325BAF'
    }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
      <div className="grid grid-cols-5 gap-2 lg:gap-4">
        {controls.map((control, index) => (
          <button 
            key={index} 
            className="flex flex-col items-center justify-center p-1 sm:p-2 rounded-lg cursor-pointer transition-all"
            onClick={control.onClick}
          >
            <div className="mb-1 sm:mb-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-50 flex items-center justify-center">
              {control.icon}
            </div>
            <div className="text-[10px] sm:text-xs font-medium text-center text-gray-600">
              {control.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardControls;
