export interface Profile {
  id: string;
  name: string;
  photo: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contactInfo?: {
    email: string;
    phone: string;
  };
  interests?: string[];
} 