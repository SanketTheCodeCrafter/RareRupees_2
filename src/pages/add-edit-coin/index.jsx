import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ImageCaptureSection from './components/ImageCaptureSection';
import CoinDetailsForm from './components/CoinDetailsForm';
import FormActions from './components/FormActions';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import SuccessModal from './components/SuccessModal';

const AddEditCoin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Determine if this is edit mode
  const isEdit = location.state?.isEdit || false;
  const existingCoinData = location.state?.coinData || null;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    denomination: '',
    customDenomination: '',
    year: '',
    condition: '',
    rarity: '',
    grade: '',
    mintLocation: '',
    mintMark: '',
    weight: '',
    diameter: '',
    composition: '',
    catalogNumber: '',
    acquisitionDate: '',
    acquisitionPrice: '',
    estimatedValue: '',
    tags: '',
    notes: '',
    frontImage: null,
    rearImage: null
  });

  // Initialize form data for edit mode
  useEffect(() => {
    if (isEdit && existingCoinData) {
      setFormData({
        name: existingCoinData.name || '',
        denomination: existingCoinData.denomination || '',
        customDenomination: existingCoinData.customDenomination || '',
        year: existingCoinData.year?.toString() || '',
        condition: existingCoinData.condition || '',
        rarity: existingCoinData.rarity || '',
        grade: existingCoinData.grade || '',
        mintLocation: existingCoinData.mintLocation || '',
        mintMark: existingCoinData.mintMark || '',
        weight: existingCoinData.weight || '',
        diameter: existingCoinData.diameter || '',
        composition: existingCoinData.composition || '',
        catalogNumber: existingCoinData.catalogNumber || '',
        acquisitionDate: existingCoinData.acquisitionDate || '',
        acquisitionPrice: existingCoinData.acquisitionPrice || '',
        estimatedValue: existingCoinData.estimatedValue || '',
        tags: existingCoinData.tags?.join(', ') || '',
        notes: existingCoinData.notes || '',
        frontImage: existingCoinData.images?.[0] || null,
        rearImage: existingCoinData.images?.[1] || null
      });
    }
  }, [isEdit, existingCoinData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Coin name is required';
    }

    if (!formData.denomination) {
      newErrors.denomination = 'Denomination is required';
    }

    if (formData.denomination === 'custom' && !formData.customDenomination.trim()) {
      newErrors.customDenomination = 'Custom denomination is required';
    }

    if (!formData.year) {
      newErrors.year = 'Mint year is required';
    } else {
      const year = parseInt(formData.year);
      const currentYear = new Date().getFullYear();
      if (year < 1800 || year > currentYear) {
        newErrors.year = `Year must be between 1800 and ${currentYear}`;
      }
    }

    if (!formData.condition) {
      newErrors.condition = 'Condition is required';
    }

    if (formData.weight && (isNaN(parseFloat(formData.weight)) || parseFloat(formData.weight) <= 0)) {
      newErrors.weight = 'Weight must be a positive number';
    }

    if (formData.diameter && (isNaN(parseFloat(formData.diameter)) || parseFloat(formData.diameter) <= 0)) {
      newErrors.diameter = 'Diameter must be a positive number';
    }

    if (formData.acquisitionPrice && (isNaN(parseFloat(formData.acquisitionPrice)) || parseFloat(formData.acquisitionPrice) < 0)) {
      newErrors.acquisitionPrice = 'Price must be a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
    // Clear errors for changed fields
    const changedFields = Object.keys(newFormData).filter(
      key => newFormData[key] !== formData[key]
    );
    if (changedFields.length > 0) {
      const newErrors = { ...errors };
      changedFields.forEach(field => {
        delete newErrors[field];
      });
      setErrors(newErrors);
    }
  };

  const handleImageChange = (imageType, imageData) => {
    setFormData(prev => ({
      ...prev,
      [imageType]: imageData
    }));
  };

  const handleImageRemove = (imageType) => {
    setFormData(prev => ({
      ...prev,
      [imageType]: null
    }));
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Process form data
      const coinData = {
        ...formData,
        id: isEdit ? existingCoinData.id : Date.now().toString(),
        year: parseInt(formData.year),
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
        images: [formData.frontImage, formData.rearImage].filter(Boolean),
        dateAdded: isEdit ? existingCoinData.dateAdded : new Date().toISOString(),
        dateModified: new Date().toISOString()
      };

      console.log(isEdit ? 'Updating coin:' : 'Adding new coin:', coinData);

      // Show success modal
      setShowSuccess(true);
    } catch (error) {
      console.error('Error saving coin:', error);
      setErrors({ submit: 'Failed to save coin. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/collection-dashboard');
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Deleting coin:', existingCoinData.id);
      
      // Navigate back to collection
      navigate('/collection-dashboard');
    } catch (error) {
      console.error('Error deleting coin:', error);
      setErrors({ submit: 'Failed to delete coin. Please try again.' });
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/collection-dashboard');
  };

  const isSaveDisabled = !formData.name.trim() || !formData.denomination || !formData.year || !formData.condition;

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="lg:ml-60">
        <div className="max-w-4xl mx-auto p-4 pb-24 lg:pb-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {isEdit ? 'Edit Coin' : 'Add New Coin'}
            </h1>
            <p className="text-muted-foreground">
              {isEdit 
                ? 'Update the details and images for your coin'
                : 'Capture images and enter details for your new coin'
              }
            </p>
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
              <p className="text-sm text-error">{errors.submit}</p>
            </div>
          )}

          {/* Form Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div className="space-y-6">
              <div className="space-y-6">
                <ImageCaptureSection
                  title="Front Image"
                  image={formData.frontImage}
                  onImageChange={(imageData) => handleImageChange('frontImage', imageData)}
                  onImageRemove={() => handleImageRemove('frontImage')}
                  disabled={isLoading}
                />

                <ImageCaptureSection
                  title="Rear Image"
                  image={formData.rearImage}
                  onImageChange={(imageData) => handleImageChange('rearImage', imageData)}
                  onImageRemove={() => handleImageRemove('rearImage')}
                  disabled={isLoading}
                />
              </div>

              {/* Mobile Actions - Always visible */}
              <div className="lg:hidden sticky bottom-4 bg-background p-4 border-t border-border">
                <FormActions
                  isEdit={isEdit}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  onDelete={handleDelete}
                  isLoading={isLoading}
                  isSaveDisabled={isSaveDisabled}
                />
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="space-y-6">
              <CoinDetailsForm
                formData={formData}
                onFormChange={handleFormChange}
                errors={errors}
                disabled={isLoading}
              />

              {/* Desktop Actions - Sticky positioned */}
              <div className="hidden lg:block sticky top-4">
                <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
                  <h4 className="text-sm font-medium text-foreground mb-3">
                    {isEdit ? 'Update Coin' : 'Save Coin'}
                  </h4>
                  <FormActions
                    isEdit={isEdit}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onDelete={handleDelete}
                    isLoading={isLoading}
                    isSaveDisabled={isSaveDisabled}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        coinName={formData.name || 'this coin'}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        isLoading={isLoading}
      />

      <SuccessModal
        isOpen={showSuccess}
        isEdit={isEdit}
        coinName={formData.name}
        onClose={handleSuccessClose}
        autoCloseDelay={3000}
      />
    </div>
  );
};

export default AddEditCoin;