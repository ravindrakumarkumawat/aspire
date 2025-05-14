# Asset Access Guide

This guide explains how to access assets (images, etc.) in this project using the configured path aliases and utility functions.

## Available Methods

### 1. Using the Asset Utility Functions

We've created utility functions in `src/utils/assetUtils.ts` to make accessing assets easier:

```typescript
// Import the utility functions
import { getImageUrl, getAssetUrl } from '@utils/assetUtils';

// Use in your components
<img src={getImageUrl('aspire-logo-white.svg')} alt="Aspire Logo" />
<img src={getAssetUrl('images/visa.svg')} alt="Visa Logo" />
```

### 2. Using Path Aliases Directly

You can use the configured path aliases directly in your imports:

```typescript
// Static imports
import aspireLogoWhite from '@images/aspire-logo-white.svg';

// In your component
<img src={aspireLogoWhite} alt="Aspire Logo" />
```

### 3. Dynamic Imports

For dynamic imports, you can use the `importImage` utility function:

```typescript
import { importImage } from '@utils/assetUtils';

// In a React component with useState and useEffect
const [imageSrc, setImageSrc] = useState();

useEffect(() => {
  const loadImage = async () => {
    const module = await importImage('aspire-logo-green.svg');
    setImageSrc(module.default);
  };
  loadImage();
}, []);

// Then in your JSX
{imageSrc && <img src={imageSrc} alt="Aspire Logo" />}
```

### 4. Using Vite's URL Constructor

Vite provides a way to access assets using the URL constructor:

```typescript
<img src={new URL('@images/add.svg', import.meta.url).href} alt="Add Icon" />
```

## Configured Path Aliases

The following path aliases are available in the project:

- `@` → `src/`
- `@assets` → `src/assets/`
- `@images` → `src/assets/images/`
- `@components` → `src/components/`
- `@utils` → `src/utils/`
- `@hooks` → `src/hooks/`
- `@pages` → `src/pages/`
- `@types` → `src/types/`

## Example Usage

Here's an example of how to use these aliases in your imports:

```typescript
// Before
import { Card } from '../types';
import { formatDate } from '../utils/dateUtils';
import CardDetails from '../components/CardDetails';
import cardLogo from '../assets/images/visa.svg';

// After
import { Card } from '@types';
import { formatDate } from '@utils/dateUtils';
import CardDetails from '@components/CardDetails';
import cardLogo from '@images/visa.svg';
```

## Benefits

- **Cleaner imports**: No more relative paths with multiple `../`
- **Easier refactoring**: Moving files doesn't break imports
- **Better organization**: Clear indication of where imports come from
- **Consistent access**: Standardized way to access assets across the project
