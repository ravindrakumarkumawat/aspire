# Aspire Card Management App

An interactive card management application inspired by the Aspire app, built with React, TypeScript, and Tailwind CSS.

## Live Demo

Check out the live demo: [https://aspire-alpha.vercel.app/](https://aspire-alpha.vercel.app/)

## Features

- Interactive card carousel with flip animation
- Add new card functionality with a modal form
- Freeze/unfreeze card functionality
- Card details with transaction history
- Responsive design for mobile and desktop

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- LocalStorage for data persistence

## Getting Started

### Prerequisites

- Node.js 14+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application should now be running on [http://localhost:5173](http://localhost:5173)

## Application Structure

- `/src/components`: UI components
- `/src/hooks`: Custom React hooks
- `/src/pages`: Application pages
- `/src/types`: TypeScript type definitions
- `/src/utils`: Utility functions

## Key Features

### Card Management

- View your virtual cards in a carousel
- Add new virtual cards with randomly generated details
- Freeze and unfreeze cards
- View card details and transaction history

### Local Storage

The application uses localStorage to persist card data between sessions, simulating a real backend API.

## Accessibility

The application is built with accessibility in mind:

- Semantic HTML
- Keyboard navigation support
- ARIA attributes
- Focus trapping in modals
- Sufficient color contrast ratios

## License

MIT
