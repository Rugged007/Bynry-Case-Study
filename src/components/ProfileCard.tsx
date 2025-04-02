import React, { useState } from 'react';
import { Profile } from '../types/Profile';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Divider,
  Avatar,
  Chip,
  IconButton,
  Tab,
  Tabs
} from '@mui/material';
import {
  LocationOn as LocationOnIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Close as CloseIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Language as LanguageIcon
} from '@mui/icons-material';
import { Map } from './Map';

interface ProfileCardProps {
  profile: Profile;
  onShowMap: (profile: Profile) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export const ProfileCard = ({ profile, onShowMap }: ProfileCardProps) => {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [imageError, setImageError] = useState(false);

  const handleSummaryOpen = () => setSummaryOpen(true);
  const handleSummaryClose = () => setSummaryOpen(false);
  const handleProfileOpen = () => setProfileOpen(true);
  const handleProfileClose = () => setProfileOpen(false);
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setTabValue(newValue);
  const handleImageError = () => setImageError(true);

  const fallbackImage = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(profile.name) + '&background=random';

  return (
    <>
      <Card sx={{ maxWidth: 345, m: 2 }}>
        <CardMedia
          component="img"
          height="200"
          image={imageError ? fallbackImage : profile.photo}
          alt={profile.name}
          onError={handleImageError}
          sx={{
            objectFit: 'cover',
            bgcolor: 'grey.200'
          }}
        />
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              src={imageError ? fallbackImage : profile.photo}
              sx={{ width: 40, height: 40, mr: 2 }}
              onError={handleImageError}
            />
            <Box>
              <Typography gutterBottom variant="h6" component="div" sx={{ mb: 0 }}>
                {profile.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.description}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="body2" color="text.secondary">
              {profile.address.city}, {profile.address.state}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => onShowMap(profile)}
                fullWidth
              >
                Show on Map
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleSummaryOpen}
                fullWidth
              >
                Summary
              </Button>
            </Box>
            <Button
              variant="outlined"
              color="info"
              onClick={handleProfileOpen}
              fullWidth
            >
              View Profile
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Summary Dialog */}
      <Dialog
        open={summaryOpen}
        onClose={handleSummaryClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Profile Summary - {profile.name}
            <IconButton onClick={handleSummaryClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>Personal Information</Typography>
                <Typography><strong>Name:</strong> {profile.name}</Typography>
                <Typography><strong>Description:</strong> {profile.description}</Typography>
                {profile.contactInfo && (
                  <>
                    <Typography><strong>Email:</strong> {profile.contactInfo.email}</Typography>
                    <Typography><strong>Phone:</strong> {profile.contactInfo.phone}</Typography>
                  </>
                )}
                {profile.interests && (
                  <Typography>
                    <strong>Interests:</strong> {profile.interests.join(', ')}
                  </Typography>
                )}
              </Box>
              <Box>
                <Typography variant="h6" gutterBottom>Address</Typography>
                <Typography>{profile.address.street}</Typography>
                <Typography>{profile.address.city}, {profile.address.state}</Typography>
                <Typography>{profile.address.country}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: '300px', width: '100%' }}>
                <Map
                  profiles={[profile]}
                  selectedProfile={profile}
                  onProfileSelect={() => {}}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Detailed Profile Dialog */}
      <Dialog
        open={profileOpen}
        onClose={handleProfileClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                src={profile.photo}
                sx={{ width: 56, height: 56 }}
              />
              <Box>
                <Typography variant="h6">{profile.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {profile.description}
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleProfileClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Overview" />
              <Tab label="Contact" />
              <Tab label="Location" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Professional Summary</Typography>
                <Typography paragraph>{profile.description}</Typography>
                
                <Typography variant="h6" gutterBottom>Interests</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {profile.interests?.map((interest) => (
                    <Chip key={interest} label={interest} />
                  ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Add more sections as needed based on your Profile type */}
                <Typography variant="h6" gutterBottom>Skills & Expertise</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {profile.interests?.map((skill) => (
                    <Chip key={skill} label={skill} variant="outlined" />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Contact Information</Typography>
                {profile.contactInfo && (
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <EmailIcon color="primary" />
                      <Typography>{profile.contactInfo.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon color="primary" />
                      <Typography>{profile.contactInfo.phone}</Typography>
                    </Box>
                  </Box>
                )}

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>Social Media</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton color="primary">
                    <LanguageIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <WorkIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <SchoolIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Address Details</Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1">{profile.address.street}</Typography>
                  <Typography variant="body1">{profile.address.city}, {profile.address.state}</Typography>
                  <Typography variant="body1">{profile.address.country}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Coordinates: {profile.address.coordinates.lat}, {profile.address.coordinates.lng}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ height: '300px', width: '100%' }}>
                  <Map
                    profiles={[profile]}
                    selectedProfile={profile}
                    onProfileSelect={() => {}}
                  />
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
        </DialogContent>
      </Dialog>
    </>
  );
}; 