import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ImageCaptureSection = ({ 
  title, 
  image, 
  onImageChange, 
  onImageRemove,
  disabled = false 
}) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target.result);
        setIsCapturing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerCameraInput = () => {
    setIsCapturing(true);
    cameraInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      
      {/* Image Preview Area */}
      <div className="relative">
        <div className="aspect-square bg-muted rounded-lg border-2 border-dashed border-border overflow-hidden">
          {image ? (
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`${title} preview`}
                className="w-full h-full object-cover"
              />
              {!disabled && (
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 spring-smooth flex items-center justify-center">
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={triggerCameraInput}
                      iconName="Camera"
                      iconSize={16}
                    >
                      Retake
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={onImageRemove}
                      iconName="Trash2"
                      iconSize={16}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
              <Icon name="Camera" size={32} className="mb-2" />
              <p className="text-sm text-center px-4">
                {disabled ? 'No image available' : 'Tap to add photo'}
              </p>
            </div>
          )}
        </div>

        {/* Capture Options */}
        {!image && !disabled && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={triggerCameraInput}
                iconName="Camera"
                iconSize={16}
                disabled={isCapturing}
              >
                Camera
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={triggerFileInput}
                iconName="Upload"
                iconSize={16}
              >
                Gallery
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCameraCapture}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
};

export default ImageCaptureSection;