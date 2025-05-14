import React from 'react';
import { Lock, Sliders, CreditCard, RefreshCcw, Trash2 } from 'lucide-react';
import { Card as CardValue } from '../types';
import { Avatar, Card } from '@mui/material';
import { getImageUrl } from '@utils/assetUtils';

interface CardControlsProps {
  card: CardValue | null;
  onFreezeCard: (cardId: string) => void;
  onAddCard?: () => void; // Made optional since we're not using it
}

const CardControls: React.FC<CardControlsProps> = ({ card, onFreezeCard }) => {
  if (!card) return null;
  
  const controls = [
    {
      icon: <Avatar src={getImageUrl('freeze-card.svg')} alt="Card Details" sx={{ width: 32, height: 32, borderRadius: 0 }} />,
      label: card.frozen ? 'Unfreeze card' : 'Freeze card',
      onClick: () => onFreezeCard(card.id),
      bgColor: '#EDF3FF'
    },
    {
      icon: <Avatar src={getImageUrl('set-spend-limit.svg')} alt="Card Details" sx={{ width: 32, height: 32, borderRadius: 0 }} />,
      label: 'Set spend limit',
      onClick: () => {},
      bgColor: '#EDF3FF'
    },
    {
      icon: <Avatar src={getImageUrl('gpay.svg')} alt="Card Details" sx={{ width: 32, height: 32, borderRadius: 0 }} />,
      label: 'Add to GPay',
      onClick: () => {},
      bgColor: '#EDF3FF'
    },
    {
      icon: <Avatar src={getImageUrl('replace-card.svg')} alt="Card Details" sx={{ width: 32, height: 32, borderRadius: 0 }} />,
      label: 'Replace card',
      onClick: () => {},
      bgColor: '#EDF3FF'
    },
    {
      icon: <Avatar src={getImageUrl('cancel-card.svg')} alt="Card Details" sx={{ width: 32, height: 32, borderRadius: 0 }} />,
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
