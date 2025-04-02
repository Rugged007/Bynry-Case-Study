import React from 'react';
import { Profile } from '../types/Profile';
import { Grid, TextField, Box } from '@mui/material';
import { ProfileCard } from './ProfileCard';
import { useState } from 'react';

interface ProfileListProps {
  profiles: Profile[];
  onShowMap: (profile: Profile) => void;
}

export const ProfileList = ({ profiles, onShowMap }: ProfileListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.address.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <TextField
        fullWidth
        label="Search profiles"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={2}>
        {filteredProfiles.map((profile) => (
          <Grid item xs={12} sm={6} md={4} key={profile.id}>
            <ProfileCard profile={profile} onShowMap={onShowMap} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 