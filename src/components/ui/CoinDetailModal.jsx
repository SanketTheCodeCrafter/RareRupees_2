import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';

const CoinDetailModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isVisible = location.pathname === '/coin-detail-view';

  // Mock coin data - in real app this would come from props or API
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
    notes: 'Beautiful example with original luster. Minor contact marks on reverse. Part of Independence era collection.',
    images: [
      '/assets/images/coin-front.jpg',
      '/assets/images/coin-back.jpg',
      '/assets/images/coin-edge.jpg'
    ],
    tags: ['Independence Era', 'Silver', 'British India', 'Rare']
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleClose = () => {
    navigate('/collection-dashboard');
  };

  const handleEdit = () => {
    navigate('/add-edit-coin', { state: { coinData, isEdit: true } });
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

  const handleImageNavigation = (direction) => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => 
        prev === 0 ? coinData.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex(prev => 
        prev === coinData.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: coinData.name,
        text: `Check out this ${coinData.name} from my collection`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(window.location.href);
      console.log('Link copied to clipboard');
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center lg:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full h-full lg:w-full lg:h-full lg:max-w-4xl lg:max-h-[90vh] bg-card lg:rounded-lg lg:shadow-lg animate-slide-up overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="touch-target"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-card-foreground truncate max-w-48">
                {coinData.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {coinData.year} • {coinData.condition}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="touch-target"
            >
              <Icon name="Share" size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              className="touch-target"
            >
              <Icon name="Edit" size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="touch-target text-destructive hover:text-destructive"
            >
              <Icon name="Trash2" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100%-73px)]">
          {/* Image Gallery */}
          <div className="lg:flex-1 lg:flex lg:items-center lg:justify-center bg-muted/30">
            <div className="relative w-full lg:max-w-lg">
              {/* Main Image */}
              <div className="aspect-square bg-background rounded-lg overflow-hidden mx-4 my-4 lg:mx-0">
                <Image
                  src={coinData.images[currentImageIndex]}
                  alt={`${coinData.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Navigation */}
              {coinData.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => handleImageNavigation('prev')}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 touch-target"
                  >
                    <Icon name="ChevronLeft" size={20} />
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => handleImageNavigation('next')}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 touch-target"
                  >
                    <Icon name="ChevronRight" size={20} />
                  </Button>
                </>
              )}
              
              {/* Image Indicators */}
              {coinData.images.length > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                  {coinData.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full spring-smooth ${
                        index === currentImageIndex 
                          ? 'bg-primary' :'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details Panel */}
          <div className="lg:w-96 lg:border-l lg:border-border overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground mb-2">
                    {coinData.name}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="font-mono">{coinData.year}</span>
                    <span>•</span>
                    <span>{coinData.country}</span>
                  </div>
                </div>

                {/* Value */}
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Estimated Value</div>
                  <div className="text-lg font-semibold text-success">
                    {coinData.estimatedValue}
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-3">
                <h3 className="font-medium text-card-foreground">Specifications</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-muted-foreground">Denomination</div>
                    <div className="font-medium">{coinData.denomination}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Condition</div>
                    <div className="font-medium">{coinData.condition}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Grade</div>
                    <div className="font-medium font-mono">{coinData.grade}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Composition</div>
                    <div className="font-medium">{coinData.composition}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Weight</div>
                    <div className="font-medium font-mono">{coinData.weight}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Diameter</div>
                    <div className="font-medium font-mono">{coinData.diameter}</div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-3">
                <h3 className="font-medium text-card-foreground">Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mintage:</span>
                    <span className="font-mono">{coinData.mintage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mint Mark:</span>
                    <span className="font-mono">{coinData.mintMark}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Catalog #:</span>
                    <span className="font-mono">{coinData.catalogNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Edge:</span>
                    <span>{coinData.edge}</span>
                  </div>
                </div>
              </div>

              {/* Acquisition Info */}
              <div className="space-y-3">
                <h3 className="font-medium text-card-foreground">Acquisition</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-mono">{coinData.acquisitionDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-mono">{coinData.acquisitionPrice}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {coinData.tags && coinData.tags.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-medium text-card-foreground">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {coinData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary/20 text-secondary-foreground text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {coinData.notes && (
                <div className="space-y-3">
                  <h3 className="font-medium text-card-foreground">Notes</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {coinData.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-lg max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">Delete Coin</h3>
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete "{coinData.name}" from your collection?
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                className="flex-1"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinDetailModal;