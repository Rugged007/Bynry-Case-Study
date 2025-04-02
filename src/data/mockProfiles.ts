import { Profile } from '../types/Profile';

export const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Rugved Taru',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    description: 'Software Engineer',
    address: {
      street: 'Kothrud',
      city: 'Pune',
      state: 'MH',
      country: 'India',
      coordinates: {
        lat: 18.504293,
        lng: 73.821042
      }
    },
    contactInfo: {
      email: 'rugved@example.com',
      phone: '+91 234 567 8900'
    },
    interests: ['Technology', 'Travel', 'Photography']
  },
  {
    id: '2',
    name: 'Parth Joshi',
    photo: 'https://randomuser.me/api/portraits/men/2.jpg',
    description: 'UX Designer',
    address: {
      street: 'katraj',
      city: 'Pune',
      state: 'MH',
      country: 'India',
      coordinates: {
        lat: 18.448168,
        lng: 73.858549
      }
    },
    contactInfo: {
      email: 'parth@example.com',
      phone: '+91 234 567 8901'
    },
    interests: ['Design', 'Art', 'User Experience']
  },
  {
    id: '3',
    name: 'Tejas Bhat',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    description: 'Production Head',
    address: {
      street: 'POLYHUB FOODCOURT',
      city: 'Pune',
      state: 'MH',
      country: 'India',
      coordinates: {
        lat: 18.594016,
        lng: 73.927536
      }
    },
    contactInfo: {
      email: 'tejas@example.com',
      phone: '+91 234 567 8902'
    },
    interests: ['Design', 'Art', 'User Experience']
  },
  {
    id: '4',
    name: 'Rohit avhad',
    photo: 'https://randomuser.me/api/portraits/men/4.jpg',
    description: 'Graphic Designer',
    address: {
      street: 'Modern Engineering College Rd',
      city: 'Pune',
      state: 'MH',
      country: 'India',
      coordinates: {
        lat: 18.526761,
        lng: 73.842189
      }
    },
    contactInfo: {
      email: 'rohit@example.com',
      phone: '+91 234 567 8903'
    },
    interests: ['Design', 'Art', 'User Experience']
  },
  {
    id: '5',
    name: 'Hemant munot',
    photo: 'https://randomuser.me/api/portraits/men/5.jpg',
    description: 'UX Designer',
    address: {
      street: 'Laxmi Rd',
      city: 'Pune',
      state: 'MH',
      country: 'India',
      coordinates: {
        lat: 18.515686,
        lng: 73.856420
      }
    },
    contactInfo: {
      email: 'hemant@example.com',
      phone: '+91 234 567 8904'
    },
    interests: ['Design', 'Art', 'User Experience']
  }
]; 