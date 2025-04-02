import { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { ProfileList } from './components/ProfileList';
import { Map } from './components/Map';
import { mockProfiles } from './data/mockProfiles';
import { Profile } from './types/Profile';
import React from 'react';

function App() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | undefined>();

  const handleShowMap = (profile: Profile) => {
    setSelectedProfile(profile);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Profile Map Application
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Map 
            profiles={mockProfiles}
            selectedProfile={selectedProfile}
            onProfileSelect={setSelectedProfile}
          />
        </Box>

        <ProfileList 
          profiles={mockProfiles}
          onShowMap={handleShowMap}
        />
      </Box>
    </Container>
  );
}

export default App; 