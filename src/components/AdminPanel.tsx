import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Profile } from '../types/Profile';

interface AdminPanelProps {
  profiles: Profile[];
  onAddProfile: (profile: Profile) => void;
  onEditProfile: (profile: Profile) => void;
  onDeleteProfile: (profileId: string) => void;
}

interface FormErrors {
  [key: string]: string;
}

export const AdminPanel = ({ profiles, onAddProfile, onEditProfile, onDeleteProfile }: AdminPanelProps) => {
  const [open, setOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<Partial<Profile>>({
    name: '',
    description: '',
    photo: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      coordinates: {
        lat: 0,
        lng: 0
      }
    }
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleOpen = (profile?: Profile) => {
    if (profile) {
      setEditingProfile(profile);
      setFormData(profile);
    } else {
      setEditingProfile(null);
      setFormData({
        name: '',
        description: '',
        photo: '',
        address: {
          street: '',
          city: '',
          state: '',
          country: '',
          coordinates: {
            lat: 0,
            lng: 0
          }
        }
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProfile(null);
  };

  const validateForm = useCallback(() => {
    const errors: FormErrors = {};
    
    // Required fields validation
    if (!formData.name?.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.description?.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!formData.photo?.trim()) {
      errors.photo = 'Photo URL is required';
    } else if (!formData.photo.match(/^https?:\/\/.+/)) {
      errors.photo = 'Invalid photo URL';
    }

    // Address validation
    if (!formData.address?.street?.trim()) {
      errors.street = 'Street is required';
    }
    
    if (!formData.address?.city?.trim()) {
      errors.city = 'City is required';
    }
    
    if (!formData.address?.state?.trim()) {
      errors.state = 'State is required';
    }
    
    if (!formData.address?.country?.trim()) {
      errors.country = 'Country is required';
    }

    // Coordinates validation
    const lat = formData.address?.coordinates?.lat;
    const lng = formData.address?.coordinates?.lng;

    if (typeof lat !== 'number' || isNaN(lat) || lat < -90 || lat > 90) {
      errors.latitude = 'Invalid latitude (must be between -90 and 90)';
    }

    if (typeof lng !== 'number' || isNaN(lng) || lng < -180 || lng > 180) {
      errors.longitude = 'Invalid longitude (must be between -180 and 180)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    try {
      if (editingProfile) {
        onEditProfile({ ...editingProfile, ...formData } as Profile);
      } else {
        onAddProfile({
          ...formData,
          id: Date.now().toString()
        } as Profile);
      }
      handleClose();
    } catch (error) {
      setFormErrors({
        submit: 'Failed to save profile. Please try again.'
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpen()}
        sx={{ mb: 3 }}
      >
        Add New Profile
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profiles.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell>{profile.name}</TableCell>
                <TableCell>{profile.description}</TableCell>
                <TableCell>{`${profile.address.city}, ${profile.address.state}`}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(profile)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDeleteProfile(profile.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingProfile ? 'Edit Profile' : 'Add New Profile'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={!!formErrors.name}
              helperText={formErrors.name}
              required
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
              error={!!formErrors.description}
              helperText={formErrors.description}
              required
            />
            <TextField
              label="Photo URL"
              value={formData.photo}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              error={!!formErrors.photo}
              helperText={formErrors.photo}
              required
            />
            <TextField
              label="Street"
              value={formData.address?.street}
              onChange={(e) => setFormData({
                ...formData,
                address: { ...formData.address!, street: e.target.value }
              })}
              error={!!formErrors.street}
              helperText={formErrors.street}
              required
            />
            <TextField
              label="City"
              value={formData.address?.city}
              onChange={(e) => setFormData({
                ...formData,
                address: { ...formData.address!, city: e.target.value }
              })}
              error={!!formErrors.city}
              helperText={formErrors.city}
              required
            />
            <TextField
              label="State"
              value={formData.address?.state}
              onChange={(e) => setFormData({
                ...formData,
                address: { ...formData.address!, state: e.target.value }
              })}
              error={!!formErrors.state}
              helperText={formErrors.state}
              required
            />
            <TextField
              label="Country"
              value={formData.address?.country}
              onChange={(e) => setFormData({
                ...formData,
                address: { ...formData.address!, country: e.target.value }
              })}
              error={!!formErrors.country}
              helperText={formErrors.country}
              required
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Latitude"
                type="number"
                value={formData.address?.coordinates.lat}
                onChange={(e) => setFormData({
                  ...formData,
                  address: {
                    ...formData.address!,
                    coordinates: {
                      ...formData.address!.coordinates,
                      lat: parseFloat(e.target.value)
                    }
                  }
                })}
                error={!!formErrors.latitude}
                helperText={formErrors.latitude}
                required
              />
              <TextField
                label="Longitude"
                type="number"
                value={formData.address?.coordinates.lng}
                onChange={(e) => setFormData({
                  ...formData,
                  address: {
                    ...formData.address!,
                    coordinates: {
                      ...formData.address!.coordinates,
                      lng: parseFloat(e.target.value)
                    }
                  }
                })}
                error={!!formErrors.longitude}
                helperText={formErrors.longitude}
                required
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingProfile ? 'Save Changes' : 'Add Profile'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 