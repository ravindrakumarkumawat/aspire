import React from 'react';
import { ChevronDown, ShoppingBag, Plane } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionHistoryProps {
  transactions: Transaction[];
  currency: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions, currency }) => {
  // Function to get icon based on category
  const getTransactionIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'shopping':
        return <ShoppingBag size={16} className="text-blue-500" />;
      case 'travel':
        return <Plane size={16} className="text-blue-500" />;
      default:
        return <ShoppingBag size={16} className="text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden p-4">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">Recent transactions</h2>
        <button className="text-blue-500">
          <ChevronDown size={18} />
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-3 sm:py-4 text-gray-500 text-sm">
          No transactions available.
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {transactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  {getTransactionIcon(transaction.category)}
                </div>
                <div>
                  <div className="text-sm sm:text-base font-medium">{transaction.merchant}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">
                    {new Date(transaction.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <div className={`text-[10px] sm:text-xs mt-0.5 sm:mt-1 ${
                    transaction.status === 'completed' ? 'text-blue-600' : 
                    transaction.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {transaction.status === 'completed' ? 'Refund on debit card' : 'Charged to debit card'}
                  </div>
                </div>
              </div>
              <div className={`text-sm sm:text-base font-semibold ${transaction.amount > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {transaction.amount > 0 ? '-' : '+'} {currency} {Math.abs(transaction.amount).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-3 sm:mt-4 text-center">
        <button className="text-green-500 text-xs sm:text-sm font-medium py-1.5 sm:py-2 px-3 sm:px-4 bg-green-50 rounded-md">
          View all card transactions
        </button>
      </div>
    </div>
  );
};

export default TransactionHistory;
