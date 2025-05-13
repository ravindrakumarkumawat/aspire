export const generateCardNumber = (): string => {
  // Generate a 16-digit card number (4 groups of 4 digits)
  let cardNumber = '';
  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) {
      cardNumber += ' ';
    }
    cardNumber += Math.floor(Math.random() * 10).toString();
  }
  return cardNumber;
};

export const generateExpiryDate = (): string => {
  // Generate a future expiry date (1-5 years from now)
  const now = new Date();
  const futureYear = now.getFullYear() + Math.floor(Math.random() * 5) + 1;
  const month = Math.floor(Math.random() * 12) + 1;
  return `${month.toString().padStart(2, '0')}/${futureYear.toString().substring(2)}`;
};

export const generateCVV = (): string => {
  // Generate a 3-digit CVV
  return Math.floor(Math.random() * 900 + 100).toString();
};

export const formatCardNumber = (cardNumber: string): string => {
  // Format the card number for display (last 4 digits visible)
  const parts = cardNumber.split(' ');
  return `•••• •••• •••• ${parts[3] || '0000'}`;
};

export const getCardType = (cardNumber: string): 'visa' | 'mastercard' => {
  // Simplified card type detection
  const firstDigit = cardNumber.trim()[0];
  return firstDigit === '4' ? 'visa' : 'mastercard';
};