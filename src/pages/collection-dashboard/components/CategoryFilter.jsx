import React from 'react';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="mb-6">
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium spring-smooth ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {category.label}
            {category.count > 0 && (
              <span className={`ml-2 text-xs ${
                activeCategory === category.id
                  ? 'text-primary-foreground/80'
                  : 'text-muted-foreground/60'
              }`}>
                {category.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;