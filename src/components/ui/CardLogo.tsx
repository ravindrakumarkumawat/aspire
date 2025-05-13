import React from 'react';

interface CardLogoProps {
  cardType: 'visa' | 'mastercard';
  className?: string;
}

const CardLogo: React.FC<CardLogoProps> = ({ cardType, className = '' }) => {
  // Simple SVG logos for Visa and Mastercard
  if (cardType === 'visa') {
    return (
      <div className={`text-white font-bold text-xl italic ${className}`}>
        VISA
      </div>
    );
  }
  
  return (
    <div className={`flex ${className}`}>
      <div className="w-6 h-6 bg-red-500 rounded-full opacity-80 -mr-2"></div>
      <div className="w-6 h-6 bg-amber-500 rounded-full opacity-80"></div>
    </div>
  );
};

export default CardLogo;