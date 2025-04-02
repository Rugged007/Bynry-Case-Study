import React from 'react';
import { Profile } from '../types/Profile';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface ProfileCardProps {
  profile: Profile;
  onShowMap: (profile: Profile) => void;
}

export const ProfileCard = ({ profile, onShowMap }: ProfileCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={profile.photo}
        alt={profile.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {profile.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {profile.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="body2" color="text.secondary">
            {profile.address.city}, {profile.address.state}
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => onShowMap(profile)}
          fullWidth
        >
          Show on Map
        </Button>
      </CardContent>
    </Card>
  );
}; 