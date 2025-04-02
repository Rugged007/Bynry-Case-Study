import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Profile } from '../types/Profile';
import { Box } from '@mui/material';
import { defaultMapConfig } from '../config';

interface MapProps {
  profiles: Profile[];
  selectedProfile?: Profile;
  onProfileSelect?: (profile: Profile) => void;
}

const containerStyle = {
  width: '100%',
  height: '400px',
  position: 'relative' as const
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  scrollwheel: true,
  streetViewControl: true,
  mapTypeControl: true
};

export const Map = ({ profiles, selectedProfile, onProfileSelect }: MapProps) => {
  return (
    <Box sx={{ position: 'relative', height: '400px' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selectedProfile?.address.coordinates || defaultMapConfig.defaultCenter}
        zoom={selectedProfile ? 15 : defaultMapConfig.defaultZoom}
        options={mapOptions}
      >
        {profiles.map((profile) => (
          <Marker
            key={profile.id}
            position={profile.address.coordinates}
            onClick={() => onProfileSelect?.(profile)}
            animation={selectedProfile?.id === profile.id ? google.maps.Animation.BOUNCE : undefined}
          />
        ))}
      </GoogleMap>
    </Box>
  );
}; 