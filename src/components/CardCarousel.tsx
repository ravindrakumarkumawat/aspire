import React, { useState, useEffect } from 'react';
import { Card as CardType } from '../types';
import Card from './Card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Box } from '@mui/material';

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
  const [flippedIndices, setFlippedIndices] = useState<Set<number>>(new Set());
  
  useEffect(() => {
    setFlippedIndices(new Set());
  }, [activeIndex]);
  
  const isFlipped = (index: number) => flippedIndices.has(index);
  
  const handleFlip = (index: number) => {
    const newFlipped = new Set(flippedIndices);
    if (newFlipped.has(index)) {
      newFlipped.delete(index);
    } else {
      newFlipped.add(index);
    }
    setFlippedIndices(newFlipped);
  };
  
  if (cards.length === 0) {
    return (
      <Box 
        sx={{ 
          width: '100%',
          maxWidth: 384,
          height: 192,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.100',
          borderRadius: 2,
          color: 'text.secondary'
        }}
      >
        No cards available
      </Box>
    );
  }
  
  return (
    <div className="relative">
      <div className="flex justify-center">
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 384,
            perspective: '1000px'
          }}
        >
          {cards.map((card, index) => (
            <Box
              key={card.id}
              sx={{
                position: 'absolute',
                top: 0,
                width: '100%',
                transition: 'all 0.5s',
                opacity: index === activeIndex ? 1 : 0,
                transform: `translateX(${(index - activeIndex) * 100}%) scale(${index === activeIndex ? 1 : 0.95})`,
                zIndex: index === activeIndex ? 10 : 0,
                pointerEvents: index === activeIndex ? 'auto' : 'none'
              }}
            >
              <Box
                sx={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.5s',
                  transform: isFlipped(index) ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                <div className="backface-hidden">
                  <Card 
                    card={card}
                    isFront={true}
                    onFlip={() => handleFlip(index)}
                  />
                </div>
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <Card 
                    card={card}
                    isFront={false}
                    onFlip={() => handleFlip(index)}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </div>
      
      {activeIndex > 0 && (
        <button 
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 bg-white rounded-full shadow-md p-1 z-20"
          onClick={() => onChangeActive(activeIndex - 1)}
          aria-label="Previous card"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
      )}
      
      {activeIndex < cards.length - 1 && (
        <button 
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 bg-white rounded-full shadow-md p-1 z-20"
          onClick={() => onChangeActive(activeIndex + 1)}
          aria-label="Next card"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      )}
      
      <div className="flex justify-center mt-4 space-x-2">
        {cards.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 ${
              index === activeIndex ? 'bg-green-500' : 'bg-gray-300'
            }`}
            onClick={() => onChangeActive(index)}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;