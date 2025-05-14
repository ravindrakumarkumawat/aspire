import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card as CardType } from '../types';
import Card from './Card';
import { Eye } from 'lucide-react';

interface CardCarouselProps {
  cards: CardType[];
  activeIndex: number;
  onChangeActive: (index: number) => void;
}

const CardCarousel: React.FC<CardCarouselProps> = ({ 
  cards, 
  activeIndex,
  onChangeActive
}) => {
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  
  // Reset card number visibility and flip state when changing cards
  useEffect(() => {
    setShowCardNumber(false);
    setIsFlipped(false);
  }, [activeIndex]);
  
  const toggleCardNumber = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCardNumber(prev => !prev);
  };
  
  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };
  
  // Handle card change with animation and infinite scrolling
  const changeCard = useCallback((newIndex: number) => {
    // Implement infinite scrolling
    if (newIndex < 0) {
      // If we go below 0, loop to the last card
      onChangeActive(cards.length - 1);
    } else if (newIndex >= cards.length) {
      // If we go beyond the last card, loop to the first card
      onChangeActive(0);
    } else {
      // Normal case
      onChangeActive(newIndex);
    }
  }, [cards.length, onChangeActive]);

  // Touch swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.targetTouches[0].clientX);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.targetTouches[0].clientX;
    setTouchEnd(currentX);
    
    // Calculate drag offset for visual feedback
    const offset = currentX - startX;
    setDragOffset(offset);
  };
  
  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setDragOffset(0);
    
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      changeCard(activeIndex + 1);
    }
    
    if (isRightSwipe) {
      changeCard(activeIndex - 1);
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  // Mouse drag functionality for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const offset = e.clientX - startX;
    setDragOffset(offset);
  };
  
  const handleMouseUp = () => {
    if (!isDragging) return;
    
    if (dragOffset > 100) {
      changeCard(activeIndex - 1);
    } else if (dragOffset < -100) {
      changeCard(activeIndex + 1);
    }
    
    setIsDragging(false);
    setDragOffset(0);
  };
  
  // Handle mouse leave to prevent stuck dragging state
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
    }
  };
  
  // Keyboard navigation with infinite scrolling
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      changeCard(activeIndex - 1);
    } else if (e.key === 'ArrowRight') {
      changeCard(activeIndex + 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      handleFlip();
    }
  };
  
  if (cards.length === 0) {
    return (
      <div className="w-full max-w-sm h-48 mx-auto flex items-center justify-center bg-gray-100 rounded-lg text-gray-500">
        No cards available
      </div>
    );
  }
  
  const activeCard = cards[activeIndex];
  
  return (
    <div className="flex flex-col items-center">
      {/* Show card number section */}
      <div className="flex justify-end w-full max-w-sm mb-2">
        <button 
          onClick={toggleCardNumber}
          className="bg-transparent flex items-center text-[#01D167] font-medium text-sm"
        >
          <Eye size={16} className="mr-1 text-[#01D167]" /> 
          <span>Show card number</span>
        </button>
      </div>
      
      {/* Card display section with swipe indicators */}
      <div className="w-full flex items-center justify-center mb-4 relative">
        {/* Always show left indicator for infinite scrolling */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-12 flex items-center justify-center opacity-50">
          <div className="w-1 h-8 bg-gray-300 rounded-full"></div>
        </div>
        
        <div 
          className="w-full flex justify-center overflow-hidden"
          ref={cardRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label="Card, press Enter to flip, swipe or drag left/right to navigate"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div 
            className="w-full max-w-sm transition-transform duration-300"
            style={{ 
              transform: isDragging ? `translateX(${dragOffset}px)` : 'translateX(0)'
            }}
          >
            <div 
              className={`transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}
              style={{ 
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              <div style={{ backfaceVisibility: 'hidden' }}>
                <Card 
                  card={activeCard}
                  isFront={true}
                  onFlip={handleFlip}
                  showCardNumber={showCardNumber}
                />
              </div>
              <div 
                style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden'
                }}
              >
                <Card 
                  card={activeCard}
                  isFront={false}
                  onFlip={handleFlip}
                  showCardNumber={showCardNumber}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Always show right indicator for infinite scrolling */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-12 flex items-center justify-center opacity-50">
          <div className="w-1 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
      
      {/* Card navigation controls */}
      <div className="flex justify-center mt-2">
        <div className="flex space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === activeIndex ? 'bg-[#01D167] w-4' : 'bg-[#01D167] opacity-30'
              }`}
              onClick={() => onChangeActive(index)}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;
