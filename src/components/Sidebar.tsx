import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: '/src/assets/images/aspire-icon-white.svg', label: 'Home', active: false },
    { icon: '/src/assets/images/cards-green.svg', label: 'Cards', active: true },
    { icon: '/src/assets/images/payments.svg', label: 'Payments', active: false },
    { icon: '/src/assets/images/credit.svg', label: 'Credit', active: false },
    { icon: '/src/assets/images/settings.svg', label: 'Settings', active: false }
  ];

  return (
    <Box 
      component="aside" 
      sx={{ 
        width: '21.25rem', 
        bgcolor: '#0C365A', 
        height: '100vh', 
        color: 'white',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ p: 6 }}>
        <Box sx={{ mb: 2 }}>
          <img 
            src="/src/assets/images/aspire-logo-white.svg" 
            alt="Aspire Logo" 
            className="h-8"
          />
        </Box>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', mt: 1, display: 'block' }}>
          Trusted way of banking for 3,000+ SMEs and startups in Singapore
        </Typography>
      </Box>
      
      <Box component="nav" sx={{ flexGrow: 1, p: 6, py: 4 }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem 
              key={index}
              button
              sx={{
                p: 0,
                mb: 7.5,
                '&:hover': { color: '#01D167' }
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 40, 
                color: item.active ? '#01D167' : 'white' 
              }}>
                <img 
                  src={item.icon} 
                  alt={item.label} 
                  className="w-6 h-6"
                  style={{ 
                    filter: item.active ? 'none' : 'brightness(0) invert(1)'
                  }}
                />
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                sx={{ 
                  '& .MuiTypography-root': { 
                    fontWeight: 500,
                    color: item.active ? '#01D167' : 'white'
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
