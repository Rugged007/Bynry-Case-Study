// Get the API key from environment variables
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

if (!apiKey) {
  console.error('Google Maps API key is not set in environment variables');
}

export const GOOGLE_MAPS_API_KEY = apiKey || '';

export const defaultMapConfig = {
  defaultZoom: 12,
  defaultCenter: {
    lat: 18.5204,
    lng: 73.8567
  }
}; 

