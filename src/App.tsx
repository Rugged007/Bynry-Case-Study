import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Tab, Tabs } from '@mui/material';
import { ProfileList } from './components/ProfileList';
import { Map } from './components/Map';
import { AdminPanel } from './components/AdminPanel';
import { mockProfiles } from './data/mockProfiles';
import { Profile } from './types/Profile';
import { LoadingOverlay } from './components/LoadingOverlay';
import { useLoading } from './hooks/useLoading';
import { LoadScript } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from './config';

const libraries = ['places'] as const;

function App() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | undefined>();
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles); // Initialize with mock data immediately
  const [currentTab, setCurrentTab] = useState(0);
  const { isLoading, loadingMessage, startLoading, stopLoading } = useLoading();

  const handleShowMap = (profile: Profile) => {
    setSelectedProfile(profile);
    setCurrentTab(0);
  };

  const handleAddProfile = async (profile: Profile) => {
    startLoading('Adding new profile...');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfiles([...profiles, profile]);
    } finally {
      stopLoading();
    }
  };

  const handleEditProfile = async (updatedProfile: Profile) => {
    startLoading('Updating profile...');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfiles(profiles.map(profile => 
        profile.id === updatedProfile.id ? updatedProfile : profile
      ));
    } finally {
      stopLoading();
    }
  };

  const handleDeleteProfile = async (profileId: string) => {
    startLoading('Deleting profile...');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfiles(profiles.filter(profile => profile.id !== profileId));
    } finally {
      stopLoading();
    }
  };

  return (
    <Container maxWidth="lg">
      <LoadingOverlay open={isLoading} message={loadingMessage} />
      
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Profile Map Application
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)}>
            <Tab label="Map View" />
            <Tab label="Admin Panel" />
          </Tabs>
        </Box>

        {currentTab === 0 ? (
          <>
            <Box sx={{ mb: 4 }}>
              <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <Map 
                  profiles={profiles}
                  selectedProfile={selectedProfile}
                  onProfileSelect={setSelectedProfile}
                />
              </LoadScript>
            </Box>

            <ProfileList 
              profiles={profiles}
              onShowMap={handleShowMap}
            />
          </>
        ) : (
          <AdminPanel
            profiles={profiles}
            onAddProfile={handleAddProfile}
            onEditProfile={handleEditProfile}
            onDeleteProfile={handleDeleteProfile}
          />
        )}
      </Box>
    </Container>
  );
}

export default App; 