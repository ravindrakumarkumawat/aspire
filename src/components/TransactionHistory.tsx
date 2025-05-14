import React, { useState, useMemo, useCallback } from 'react';
import { Transaction } from '@types';
import { Card, Accordion, AccordionDetails, AccordionSummary, Avatar, Typography } from '@mui/material';
import { getImageUrl } from '@utils/assetUtils';

interface TransactionHistoryProps {
  transactions: Transaction[];
  currency: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions, currency }) => {
  const getTransactionIcon = (category: string) => {
    
    switch (category.toLowerCase()) {
      case 'technology':
      case 'entertainment':
        return {
          icon_url: getImageUrl('megaphone.svg'),
          background_color: '#F251951A'
        };
      case 'transportation':
        return {
          icon_url: getImageUrl('flights.svg'),
          background_color: '#00D6B51A'
        }
      default:
        return {
          icon_url: getImageUrl('hamleys.svg'),
          background_color: '#009DFF1A'
        }
    }
  };

  const [showAllTransactions, setShowAllTransactions] = useState(false);
  
  const displayedTransactions = useMemo(() => {
    return showAllTransactions ? transactions : transactions.slice(0, 2);
  }, [transactions, showAllTransactions]);
    
  const handleViewAllClick = useCallback(() => {
    setShowAllTransactions(prev => !prev);
  }, []);

  return (
    <Accordion defaultExpanded className="overflow-hidden border" sx={{ borderRadius: '8pt', backgroundColor: '#F5F9FF', boxShadow: 'none', borderColor: '#F0F0F0' }}>
      <AccordionSummary className="flex justify-between items-center mb-4" 
        expandIcon={<Avatar src={getImageUrl('down-arrow.svg')} alt="Card Details" sx={{ height: 20, width: 20, borderRadius: 0 }} />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="flex items-center gap-3">
          <Avatar src={getImageUrl('recent-transactions.svg')} alt="Card Details" sx={{ width: 24, height: 24, borderRadius: 0 }} />
          <Typography sx={{ color: '#0C365A', fontSize: '14pt' }}>Recent transactions</Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className="bg-[#EDFFF5] !p-0">
      {transactions.length === 0 ? (
        <div className="text-center py-3 sm:py-4 text-gray-500 text-sm">
          No transactions available.
        </div>
      ) : (
        <div className="px-6 bg-white rounded-br-[8pt] rounded-bl-[8pt]">{
          displayedTransactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-start justify-between py-2 sm:py-3 md:py-4 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-start space-x-4 sm:space-x-3">
                <div className="rounded-full flex items-center justify-center">
                  <Card sx={{ backgroundColor: getTransactionIcon(transaction.category).background_color, borderRadius: '50%', boxShadow: 'none', }} className="p-4">
                    <Avatar src={getTransactionIcon(transaction.category).icon_url} className="text-[#00D6B51A]" sx={{ width: 16, height: 16, borderRadius: 0 }} />
                  </Card>
                </div>
                <div>
                  <Typography className="text-[#222222] text-[14pt]">{transaction.merchant}</Typography>
                  <Typography className="text-[#AAAAAA] text-[13pt]">
                    {new Date(transaction.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </Typography>
                  <div className="flex items-center mt-0.5 sm:mt-2">
                    <Card sx={{ width: 24, height: 20, boxShadow: 'none' }} className="mr-1 !bg-[#325BAF] flex items-center justify-center">
                      <Avatar src={getImageUrl('cards-white.svg')} alt="Aspire Icon" sx={{ width: 10, height: 7.86, borderRadius: 0 }} />
                    </Card>
                    <Typography className="text-[12pt] text-[#325BAF]">
                      {transaction.status === 'completed' ? 'Refund on debit card' : 'Charged to debit card'}
                    </Typography>
                  </div>
                </div>
              </div>
              <Typography className={`flex gap-1 items-center text-sm sm:text-base font-semibold ${transaction.amount > 0 ? 'text-[#222222]' : 'text-[#01D167]'}`}>
                {transaction.amount > 0 ? '-' : '+'} {currency} {Math.abs(transaction.amount).toFixed(0)} 
                <Avatar src={getImageUrl('right-icon.svg')} alt="Aspire Icon" sx={{ width: 10, height: 12, borderRadius: 0 }} />
              </Typography>
            </div>
          ))}
          </div>
        )}
        <Card 
            className="text-center cursor-pointer" 
            sx={{ boxShadow: 'none', borderRadius: '8pt' }}
            onClick={handleViewAllClick}
          >
            <Typography className="text-[#01D167] text-[13pt] sm:text-sm font-bold py-4 bg-[#EDFFF5] rounded-bl-[8pt] rounded-br-[8pt]">
              {showAllTransactions ? "Show less transactions" : "View all card transactions"}
            </Typography>
          </Card>
      </AccordionDetails>
    </Accordion>
  );
};

export default TransactionHistory;
