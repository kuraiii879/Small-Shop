import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the full image URL, handling both base64 data URLs and regular paths
 * @param imageUrl - The image URL (can be base64 data URL or path)
 * @returns The full URL to use in img src
 */
export function getImageUrl(imageUrl: string | null | undefined): string | null {
  if (!imageUrl) return null;
  
  // If it's already a base64 data URL, use it directly
  if (imageUrl.startsWith('data:image/')) {
    return imageUrl;
  }
  
  // If it's already a full URL (http/https), use it directly
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Otherwise, prepend the API base URL for local development
  // In production on Vercel, this will be handled by the relative URL
  const apiBaseUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');
  return `${apiBaseUrl}${imageUrl}`;
}

