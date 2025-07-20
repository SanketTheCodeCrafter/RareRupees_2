import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';

const FloatingActionButton = () => {
  const navigate = useNavigate();

  const handleAddCoin = () => {
    navigate('/add-edit-coin');
  };

  return (
    <div className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50">
      <Button
        onClick={handleAddCoin}
        size="lg"
        className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl spring-bounce"
        iconName="Plus"
        iconSize={24}
      />
    </div>
  );
};

export default FloatingActionButton;