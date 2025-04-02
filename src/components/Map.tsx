import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Profile } from '../types/Profile';

interface MapProps {
  profiles: Profile[];
  selectedProfile?: Profile;
  onProfileSelect?: (profile: Profile) => void;
}

const containerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060
};

export const Map = ({ profiles, selectedProfile, onProfileSelect }: MapProps) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDX-9MDv_I-7gHVCWwfJFFl4U71gQgZz-8">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selectedProfile ? selectedProfile.address.coordinates : defaultCenter}
        zoom={selectedProfile ? 12 : 4}
      >
        {profiles.map((profile) => (
          <Marker
            key={profile.id}
            position={profile.address.coordinates}
            onClick={() => onProfileSelect?.(profile)}
            animation={selectedProfile?.id === profile.id ? 1 : undefined}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}; 