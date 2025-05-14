import React from 'react';
import { Lock, Sliders, CreditCard, RefreshCcw, Trash2 } from 'lucide-react';
import { Card as CardValue } from '../types';
import { Card } from '@mui/material';

interface CardControlsProps {
  card: CardValue | null;
  onFreezeCard: (cardId: string) => void;
  onAddCard?: () => void; // Made optional since we're not using it
}

const CardControls: React.FC<CardControlsProps> = ({ card, onFreezeCard }) => {
  if (!card) return null;
  
  const controls = [
    {
      icon: <Lock size={18} color="#325BAF" />,
      label: card.frozen ? 'Unfreeze card' : 'Freeze card',
      onClick: () => onFreezeCard(card.id),
      bgColor: '#EDF3FF'
    },
    {
      icon: <Sliders size={18} color="#325BAF" />,
      label: 'Set spend limit',
      onClick: () => {},
      bgColor: '#EDF3FF'
    },
    {
      icon: <CreditCard size={18} color="#325BAF" />,
      label: 'Add to GPay',
      onClick: () => {},
      bgColor: '#EDF3FF'
    },
    {
      icon: <RefreshCcw size={18} color="#325BAF" />,
      label: 'Replace card',
      onClick: () => {},
      bgColor: '#EDF3FF'
    },
    {
      icon: <Trash2 size={18} color="#325BAF" />,
      label: 'Cancel card',
      onClick: () => {},
      bgColor: '#EDF3FF'
    }
  ];
  
  return (
    <Card className="rounded-lg p-4 mt-6" sx={{backgroundColor: '#EDF3FF', boxShadow: 'none', borderRadius: '16pt'}}>
      <div className="grid grid-cols-5 gap-2 lg:gap-4">
        {controls.map((control, index) => (
          <button 
            key={index} 
            className="flex flex-col items-center justify-center p-1 sm:p-2 rounded-lg cursor-pointer transition-all"
            onClick={control.onClick}
          >
            <div className={`mb-1 sm:mb-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center`} style={{ backgroundColor: control.bgColor }}>
              {control.icon}
            </div>
            <div className="text-[10px] sm:text-xs font-medium text-center text-gray-600">
              {control.label}
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default CardControls;
