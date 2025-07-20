import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlobalHeader from '../../components/ui/GlobalHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ImageCarousel from './components/ImageCarousel';
import CoinHeader from './components/CoinHeader';
import SpecificationCard from './components/SpecificationCard';
import ConditionAssessment from './components/ConditionAssessment';
import AcquisitionInfo from './components/AcquisitionInfo';
import NotesSection from './components/NotesSection';
import TagsSection from './components/TagsSection';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import LoadingSkeleton from './components/LoadingSkeleton';
import Icon from '../../components/AppIcon';


const CoinDetailView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Mock coin data - in real app this would come from props, state, or API
  const coinData = {
    id: '1',
    name: '1947 Indian One Rupee',
    year: 1947,
    denomination: 'One Rupee',
    country: 'India',
    condition: 'Very Fine',
    grade: 'VF-30',
    mintage: '50,000,000',
    composition: 'Silver (.500)',
    weight: '11.66g',
    diameter: '30.6mm',
    edge: 'Reeded',
    mintMark: 'B (Bombay)',
    catalogNumber: 'KM# 557',
    estimatedValue: '₹2,500 - ₹3,500',
    acquisitionDate: '2024-03-15',
    acquisitionPrice: '₹2,800',
    notes: `Beautiful example with original luster remaining on protected areas. Minor contact marks visible on the reverse side, particularly around the rim area. This coin represents an important piece of Indian numismatic history, being minted during the year of independence.

The coin shows characteristic wear patterns consistent with VF-30 grading, with all major design elements clearly visible and well-defined. The obverse portrait retains good detail, while the reverse denomination and wreath show expected wear for the grade.

Part of my Independence era collection, acquired from a reputable dealer with proper documentation. The coin has been stored in protective housing since acquisition to prevent further deterioration.`,
    images: [
      'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&h=800&fit=crop&flip=h',
      'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&h=800&fit=crop&sat=-100'
    ],
    tags: ['Independence Era', 'Silver', 'British India', 'Rare']
  };

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleEdit = () => {
    navigate('/add-edit-coin', { 
      state: { 
        coinData, 
        isEdit: true 
      } 
    });
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    console.log('Deleting coin:', coinData.id);
    // Simulate delete operation
    setTimeout(() => {
      navigate('/collection-dashboard');
    }, 500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: coinData.name,
        text: `Check out this ${coinData.name} from my coin collection`,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(window.location.href).then(() => {
        console.log('Link copied to clipboard');
      }).catch(console.error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <LoadingSkeleton />
        <BottomTabNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="pb-20 lg:pb-4 lg:ml-60"
      >
        {/* Image Carousel */}
        <ImageCarousel
          images={coinData.images}
          coinName={coinData.name}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Coin Header */}
        <CoinHeader coinData={coinData} />

        {/* Content Sections */}
        <div className="space-y-0 mt-6">
          {/* Condition Assessment */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <ConditionAssessment coinData={coinData} />
          </motion.div>

          {/* Specifications */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <SpecificationCard coinData={coinData} />
          </motion.div>

          {/* Acquisition Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <AcquisitionInfo coinData={coinData} />
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <TagsSection tags={coinData.tags} />
          </motion.div>

          {/* Notes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <NotesSection coinData={coinData} />
          </motion.div>
        </div>

        {/* Share Button - Desktop */}
        <div className="hidden lg:block fixed bottom-8 right-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center spring-bounce"
          >
            <Icon name="Share" size={24} />
          </motion.button>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isVisible={showDeleteConfirm}
        coinName={coinData.name}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      <BottomTabNavigation />
    </div>
  );
};

export default CoinDetailView;