import React from 'react';
import { Check } from 'lucide-react';
import { Card } from '../types';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Typography } from '@mui/material';

interface CardDetailsProps {
  card: Card | null;
}

const CardDetails: React.FC<CardDetailsProps> = ({ card }) => {
  if (!card) return null;

  return (
    <Accordion className="overflow-hidden border" sx={{ borderRadius: '8pt', backgroundColor: '#F5F9FF', boxShadow: 'none' }}>
      <AccordionSummary className="flex justify-between items-center mb-4" 
        expandIcon={<Avatar src="/src/assets/images/down-arrow.svg" alt="Card Details" sx={{ height: 20, width: 20, borderRadius: 0 }} />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="flex items-center gap-3">
          <Avatar src="/src/assets/images/card-details.svg" alt="Card Details" sx={{ width: 24, height: 24, borderRadius: 0 }} />
          <Typography sx={{ color: '#0C365A', fontSize: '14pt' }}>Card details</Typography>
        </div>
      </AccordionSummary>
      
      <AccordionDetails className="py-3 sm:py-4 bg-white">
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
            <div className="text-sm sm:text-base font-medium">{card.cvv}</div>
          </div>
        </div>
        <div>
          <div className="text-xs sm:text-sm text-gray-500 mb-1">Card Type</div>
          <div className="text-sm sm:text-base font-medium capitalize">{card.cardType}</div>
        </div>
              
        <div className="mt-3 sm:mt-4 flex items-center text-[#325BAF]">
          <Check size={14} className="mr-1.5" />
          <span className="text-xs sm:text-sm font-medium">Card details are secure</span>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default CardDetails;
