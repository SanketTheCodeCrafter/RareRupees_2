import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ImageCarousel = ({ images, coinName, onEdit, onDelete }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageNavigation = (direction) => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => 
        prev === 0 ? images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex(prev => 
        prev === images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="relative bg-muted/30">
      {/* Main Image Container */}
      <div className={`relative overflow-hidden ${isZoomed ? 'h-96' : 'h-80'} spring-smooth`}>
        <div 
          className="w-full h-full cursor-pointer"
          onClick={handleImageClick}
        >
          <Image
            src={images[currentImageIndex]}
            alt={`${coinName} - Image ${currentImageIndex + 1}`}
            className={`w-full h-full object-cover spring-smooth ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
          />
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => handleImageNavigation('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 touch-target w-10 h-10 shadow-md"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            
            <Button
              variant="secondary"
              size="icon"
              onClick={() => handleImageNavigation('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 touch-target w-10 h-10 shadow-md"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={onEdit}
            className="touch-target w-10 h-10 shadow-md"
          >
            <Icon name="Edit" size={18} />
          </Button>
          
          <Button
            variant="destructive"
            size="icon"
            onClick={onDelete}
            className="touch-target w-10 h-10 shadow-md"
          >
            <Icon name="Trash2" size={18} />
          </Button>
        </div>

        {/* Zoom Indicator */}
        {isZoomed && (
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
            Tap to zoom out
          </div>
        )}
      </div>

      {/* Image Indicators */}
      {images.length > 1 && (
        <div className="flex justify-center space-x-2 py-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full spring-smooth touch-target ${
                index === currentImageIndex 
                  ? 'bg-primary' :'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;