import React, { useState } from 'react';
import Modal from './ui/Modal';
import Button from './ui/Button';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (name: string) => void;
}

const AddCardModal: React.FC<AddCardModalProps> = ({ isOpen, onClose, onAddCard }) => {
  const [cardName, setCardName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardName.trim()) {
      setError('Card name is required');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      onAddCard(cardName);
      setCardName('');
      onClose();
    } catch (error) {
      setError('Failed to add card. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Card">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
            Card Name
          </label>
          <input
            type="text"
            id="cardName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter card name"
            value={cardName}
            onChange={e => setCardName(e.target.value)}
            disabled={isSubmitting}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          <p>A new virtual card will be generated with:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Random card number</li>
            <li>Future expiry date</li>
            <li>Secure CVV</li>
            <li>Initial limit of S$2,500</li>
          </ul>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
          >
            Add Card
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCardModal;