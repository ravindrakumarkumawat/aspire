/**
 * Utility functions for accessing assets
 */

/**
 * Get the URL for an image asset
 * @param imageName The name of the image file (with extension)
 * @returns The URL to the image
 */
export const getImageUrl = (imageName: string): string => {
  return new URL(`../assets/images/${imageName}`, import.meta.url).href;
};

/**
 * Get the URL for any asset
 * @param assetPath The path to the asset relative to the assets directory
 * @returns The URL to the asset
 */
export const getAssetUrl = (assetPath: string): string => {
  return new URL(`../assets/${assetPath}`, import.meta.url).href;
};

/**
 * Import an image asset
 * @param imageName The name of the image file (with extension)
 * @returns A promise that resolves to the imported image
 */
export const importImage = async (imageName: string) => {
  return import(`@images/${imageName}`);
};
