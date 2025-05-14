import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Button, Card, Avatar } from '@mui/material';
import CardCarousel from '@components/CardCarousel';
import CardControls from '@components/CardControls';
import TransactionHistory from '@components/TransactionHistory';
import CardDetails from '@components/CardDetails';
import AddCardModal from '@components/AddCardModal';
import { useCards } from '@hooks/useCards';
import { getImageUrl } from '@utils/assetUtils';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`card-tabpanel-${index}`}
      aria-labelledby={`card-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `card-tab-${index}`,
    'aria-controls': `card-tabpanel-${index}`,
  };
}

const CardsDashboard: React.FC = () => {
  const { 
    cards, 
    activeCardIndex, 
    setActiveCardIndex, 
    addCard, 
    toggleFreezeCard,
    getCardTransactions,
    isLoading
  } = useCards();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
  const activeCard = !isLoading && cards.length > 0 ? cards[activeCardIndex] : null;
  const transactions = activeCard ? getCardTransactions(activeCard.id) : [];
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <Typography sx={{ color: { xs: 'white', md: 'text.primary' } }}>
            Loading your cards...
          </Typography>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-4 pt-8 md:p-8 md:pt-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <Typography 
            variant="body1" 
            sx={{ 
              color: { xs: 'white', md: '#222222' },
              fontSize: '14pt',
              fontWeight: 400
            }}
          >
            Available balance
          </Typography>
          <div className="md:hidden">
            <Avatar src={getImageUrl('aspire-icon-green.svg')} sx={{ height: 25, width: 25, borderRadius: 0 }}/>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <span className="bg-[#01D167] text-white px-2 py-1 rounded text-sm mr-2">S$</span>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '24px', md: '26px' },
                color: { xs: 'white', md: '#222222' }
              }}
            >
              3,000
            </Typography>
          </div>
          <Button 
            variant="contained" 
            onClick={() => setIsAddModalOpen(true)} 
            sx={{ 
              backgroundColor: { xs: 'transparent', md: '#325BAF' }, 
              color: { xs: '#23CEFD',  md: 'white' }, 
              height: 32,
              width: 'auto',
              minWidth: 'unset',
              borderRadius: '4px',
              textTransform: 'none',
              boxShadow: 'none',
              px: 2,
              '&:hover': {
                backgroundColor: '#2A4E9A'
              }
            }}
          >
            <Avatar src={getImageUrl('add.svg')} alt="Add" className="h-4 w-4 mr-1"  sx={{ borderRadius: 0, height: 16, width: 16 }}/>
            <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>New card</Typography>
          </Button>
        </div>

        <Box sx={{ 
          borderBottom: '2pt', 
          borderColor: { xs: '#23CEFD' }
        }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            aria-label="card tabs"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#23CEFD',
                height: '2px'
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: { xs: '0.75rem', md: '0.875rem' },
                fontWeight: 500,
                color: { xs: '#FFFFFF', md: '#222222' },
                opacity: 0.3,
                '&.Mui-selected': {
                  color: { xs: '#FFFFFF', md: '#222222'},
                  opacity: 1
                },
              }
            }}
          >
            <Tab label="My debit cards" {...a11yProps(0)} />
            <Tab label="All company cards" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </div>

      <Box>
        <Card sx={{ py: 4, px: 5 }}>
          <CustomTabPanel value={activeTab} index={0}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="space-y-4 md:space-y-6">
                <CardCarousel 
                  cards={cards}
                  activeIndex={activeCardIndex}
                  onChangeActive={setActiveCardIndex}
                />
                
                <CardControls 
                  card={activeCard}
                  onFreezeCard={toggleFreezeCard}
                />
              </div>

              <div className="space-y-4 md:space-y-6">
                <CardDetails card={activeCard} />
                <TransactionHistory 
                  transactions={transactions} 
                  currency={activeCard?.currency || 'S$'} 
                />
              </div>
            </div>
          </CustomTabPanel>
          
          <CustomTabPanel value={activeTab} index={1}>
            <div className="p-4 text-center">
              <Typography sx={{ color: { xs: '#0C365A', md: 'text.secondary' } }}>
                No company cards available
              </Typography>
            </div>
          </CustomTabPanel>
        </Card> 
      </Box>
      <AddCardModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCard={addCard}
      />
    </div>
  );
};

export default CardsDashboard;
