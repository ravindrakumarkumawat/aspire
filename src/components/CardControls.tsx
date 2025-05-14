import React, { useState } from 'react';
import { Card as CardValue } from '../types';
import { Avatar, Card, Snackbar, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { getImageUrl } from '@utils/assetUtils';

interface CardControlsProps {
  card: CardValue | null;
  onFreezeCard: (cardId: string) => void;
  onSetSpendLimit: (cardId: string, limit: number) => void;
  onAddToGPay: (cardId: string) => boolean;
  onReplaceCard: (cardId: string, newName?: string, cardNumber?: string, expiryDate?: string, cvv?: string) => CardValue | null;
  onCancelCard: (cardId: string) => boolean;
  onAddCard?: () => void;
}

const CardControls: React.FC<CardControlsProps> = ({ 
  card, 
  onFreezeCard,
  onSetSpendLimit,
  onAddToGPay,
  onReplaceCard,
  onCancelCard
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const [spendLimitDialogOpen, setSpendLimitDialogOpen] = useState(false);
  const [spendLimit, setSpendLimit] = useState('');
  
  const [gPayDialogOpen, setGPayDialogOpen] = useState(false);
  const [upiId, setUpiId] = useState('');
  
  const [replaceCardDialogOpen, setReplaceCardDialogOpen] = useState(false);
  const [newCardName, setNewCardName] = useState('');
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newExpiryDate, setNewExpiryDate] = useState('');
  const [newCVV, setNewCVV] = useState('');
  
  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  const handleSpendLimitSubmit = () => {
    if (!card) return;
    
    const limit = parseFloat(spendLimit);
    if (isNaN(limit) || limit <= 0) {
      showSnackbar('Please enter a valid spend limit');
      return;
    }
    
    onSetSpendLimit(card.id, limit);
    showSnackbar(`Spend limit set to ${limit} ${card.currency}`);
    setSpendLimitDialogOpen(false);
    setSpendLimit('');
  };
  
  const handleGPaySubmit = () => {
    if (!card) return;
    
    if (!upiId || !upiId.includes('@')) {
      showSnackbar('Please enter a valid UPI ID');
      return;
    }
    
    const success = onAddToGPay(card.id);
    if (success) {
      showSnackbar(`Card successfully added to Google Pay with UPI ID: ${upiId}`);
    } else {
      showSnackbar('Failed to add card to Google Pay');
    }
    
    setGPayDialogOpen(false);
    setUpiId('');
  };
  
  const validateCardNumber = (cardNumber: string) => {
    const digitsOnly = cardNumber.replace(/\s/g, '');
    return /^\d{16}$/.test(digitsOnly);
  };
  
  const validateExpiryDate = (expiryDate: string) => {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate);
  };
  
  const validateCVV = (cvv: string) => {
    return /^\d{3,4}$/.test(cvv);
  };
  
  const handleReplaceCardSubmit = () => {
    if (!card) return;
    
    if (!newCardName.trim()) {
      showSnackbar('Please enter a name for the new card');
      return;
    }
    
    if (!validateCardNumber(newCardNumber)) {
      showSnackbar('Please enter a valid 16-digit card number');
      return;
    }
    
    if (!validateExpiryDate(newExpiryDate)) {
      showSnackbar('Please enter a valid expiry date (MM/YY)');
      return;
    }
    
    if (!validateCVV(newCVV)) {
      showSnackbar('Please enter a valid CVV (3 or 4 digits)');
      return;
    }
    
    const formattedCardNumber = newCardNumber.replace(/\s/g, '');
    
    const newCard = onReplaceCard(card.id, newCardName.trim(), formattedCardNumber, newExpiryDate, newCVV);
    if (newCard) {
      showSnackbar('Card has been replaced. Your new card details are now available.');
    } else {
      showSnackbar('Failed to replace card');
    }
    
    setReplaceCardDialogOpen(false);
    setNewCardName('');
    setNewCardNumber('');
    setNewExpiryDate('');
    setNewCVV('');
  };
  
  if (!card) return null;
  
  const controls = [
    {
      icon: <Avatar src={getImageUrl('freeze-card.svg')} alt="Card Details" sx={{ width: 32, height: 32, borderRadius: 0 }} />,
      label: card.frozen ? 'Unfreeze card' : 'Freeze card',
      onClick: () => onFreezeCard(card.id),
      bgColor: '#EDF3FF'
    },
    {
      icon: <Avatar src={getImageUrl('set-spend-limit.svg')} alt="Set Spend Limit" sx={{ width: 32, height: 32, borderRadius: 0 }} />,
      label: 'Set spend limit',
      onClick: () => setSpendLimitDialogOpen(true),
      bgColor: '#EDF3FF'
    },
    {
      icon: <Avatar src={getImageUrl('gpay.svg')} alt="Add to GPay" sx={{ width: 32, height: 32, borderRadius: 0 }} />,
      label: 'Add to GPay',
      onClick: () => setGPayDialogOpen(true),
      bgColor: '#EDF3FF'
    },
    {
      icon: <Avatar src={getImageUrl('replace-card.svg')} alt="Replace Card" sx={{ width: 32, height: 32, borderRadius: 0 }} />,
      label: 'Replace card',
      onClick: () => setReplaceCardDialogOpen(true),
      bgColor: '#EDF3FF'
    },
    {
      icon: <Avatar src={getImageUrl('cancel-card.svg')} alt="Cancel Card" sx={{ width: 32, height: 32, borderRadius: 0 }} />,
      label: 'Cancel card',
      onClick: () => {
        if (window.confirm('Are you sure you want to cancel this card? This action cannot be undone.')) {
          const success = onCancelCard(card.id);
          if (success) {
            showSnackbar('Card has been cancelled');
          } else {
            showSnackbar('Failed to cancel card');
          }
        }
      },
      bgColor: '#EDF3FF'
    }
  ];
  
  return (
    <>
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
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
      
      {card && (
        <Dialog open={spendLimitDialogOpen} onClose={() => setSpendLimitDialogOpen(false)}>
          <DialogTitle>Set Spend Limit</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label={`Spend Limit (${card.currency})`}
              type="number"
              fullWidth
              value={spendLimit}
              onChange={(e) => setSpendLimit(e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSpendLimitDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSpendLimitSubmit} variant="contained" color="primary">Set Limit</Button>
          </DialogActions>
        </Dialog>
      )}
      
      {card && (
        <Dialog open={gPayDialogOpen} onClose={() => setGPayDialogOpen(false)}>
          <DialogTitle>Add to Google Pay</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="UPI ID (e.g. name@upi)"
              type="text"
              fullWidth
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setGPayDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleGPaySubmit} variant="contained" color="primary">Add to GPay</Button>
          </DialogActions>
        </Dialog>
      )}
      
      {card && (
        <Dialog open={replaceCardDialogOpen} onClose={() => setReplaceCardDialogOpen(false)}>
          <DialogTitle>Replace Card</DialogTitle>
          <DialogContent>
            <p className="mb-4">Your current card ending in {card.cardNumber.slice(-4)} will be deactivated and replaced with a new card.</p>
            
            <TextField
              autoFocus
              margin="dense"
              label="Card Name"
              type="text"
              fullWidth
              value={newCardName}
              onChange={(e) => setNewCardName(e.target.value)}
              placeholder={card.name}
              helperText="Enter a name for your new card"
              className="mb-4"
            />
            
            <TextField
              margin="dense"
              label="Card Number"
              type="text"
              fullWidth
              value={newCardNumber}
              onChange={(e) => setNewCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              helperText="Enter the 16-digit card number"
              className="mb-4"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <TextField
                margin="dense"
                label="Expiry Date"
                type="text"
                fullWidth
                value={newExpiryDate}
                onChange={(e) => setNewExpiryDate(e.target.value)}
                placeholder="MM/YY"
                helperText="Enter the expiry date"
              />
              
              <TextField
                margin="dense"
                label="CVV"
                type="text"
                fullWidth
                value={newCVV}
                onChange={(e) => setNewCVV(e.target.value)}
                placeholder="123"
                helperText="Enter the 3 or 4 digit CVV"
              />
            </div>
            
            <div className="bg-gray-100 p-3 rounded-md mt-4">
              <p className="text-sm text-gray-600 mt-2">Your spending limit and other preferences will be transferred to the new card.</p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setReplaceCardDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleReplaceCardSubmit} variant="contained" color="primary">Replace Card</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CardControls;
