import React from 'react';
import { Card as CardType } from '@types';
import { Avatar, Typography } from '@mui/material';
import { getImageUrl } from '@utils/assetUtils';

interface CardProps {
  card: CardType;
  isFront: boolean;
  onFlip: () => void;
  className?: string;
  showCardNumber?: boolean;
}

const Card: React.FC<CardProps> = ({ card, isFront, onFlip, className = '', showCardNumber = false }) => {
  
  const cardClasses = `
    w-full max-w-sm h-48 sm:h-56 rounded-xl shadow-lg p-4 sm:p-6 
    transition-all duration-500 transform cursor-pointer
    ${card.frozen ? 'opacity-75 grayscale' : ''}
    ${className}
  `;

  const frontCardClasses = `
    ${cardClasses}
    bg-[#01D167] text-white
  `;
  
  const backCardClasses = `
    ${cardClasses}
    bg-[#01D167] text-white
  `;
  
  if (isFront) {
    return (
      <div className={frontCardClasses} onClick={onFlip}>
        <div className="flex flex-col h-full">
          <div className="flex-none">
            {card.frozen && (
              <div className="flex items-center justify-center mb-2">
                <div className="bg-black bg-opacity-60 text-white font-bold py-1 px-4 rounded-full transform -rotate-12 uppercase text-lg">
                  Frozen
                </div>
              </div>
            )}
            
            <div className="flex justify-end mb-4">
              <Avatar src={getImageUrl('aspire-logo-white.svg')} alt="aspire-logo"  sx={{ height: 23.7, width: 83.52, borderRadius: 0 }} />
            </div>
          </div>
          
          <div className="flex-grow">
            <Typography className="text-[24px] font-bold ">{card.name}</Typography>
            
            <div className="flex justify-between flex-col items-start mt-[27px]">
              <div className="flex flex space-x-4 sm:space-x-6">
                <div className="text-lg sm:text-xl tracking-widest font-medium">
                  {showCardNumber ? card.cardNumber : '•••• •••• •••• ' + card.cardNumber.slice(-4)}
                </div>
              </div>
              <div className="flex gap-8 mt-[18px]">
                <div>
                  <div className="text-sm sm:text-base opacity-90">Thru: {card.expiryDate}</div>
                </div>
                
                <div>
                  <div className="text-sm sm:text-base opacity-90">CVV: ***</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-none">
            <div className="flex justify-between items-end">
              <div></div>
              <div>
                <Avatar src={getImageUrl('visa.svg')} alt="Visa" sx={{ width: 66.59, height: 22.57, borderRadius: 0 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={backCardClasses} onClick={onFlip}>
      <div className="flex flex-col h-full">
        <div className="flex-none">
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded flex items-center justify-center mr-2">
                <img src={getImageUrl('aspire-logo-green.svg')} alt="Aspire" className="h-3 sm:h-4" />
              </div>
              <span className="text-white font-bold text-sm sm:text-base">aspire</span>
            </div>
          </div>
        </div>

        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="w-full h-8 bg-black bg-opacity-20 mb-4"></div>
          <div className="flex justify-end w-full pr-4">
            <div className="bg-white text-[#01D167] text-xs font-bold py-1 px-2 rounded">
              {card.cvv}
            </div>
          </div>
        </div>
        
        <div className="flex-none">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs opacity-80 mb-1">Card ID: {card.id.slice(-4)}</div>
            </div>
            
            <div>
              <img src={getImageUrl('visa.svg')} alt="Visa" className="h-6 sm:h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
