import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilters, resetFilters } from '../../redux/productSlice';

const SidebarFilter = ({ isOpen, onClose }) => {
  const { activeFilters, product } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  
  // Initialize local state from Redux
  const [localFilters, setLocalFilters] = useState({
    categories: [...activeFilters.categories],
    priceRange: [...activeFilters.priceRange],
    ratings: [...activeFilters.ratings]
  });

  // Sync local state when Redux changes
  useEffect(() => {
    setLocalFilters({
      categories: [...activeFilters.categories],
      priceRange: [...activeFilters.priceRange],
      ratings: [...activeFilters.ratings]
    });
  }, [activeFilters]);

  // Get unique categories from products
  const categories = [
    ...new Set(product.map(item => item.category))
  ];

  const handleCategoryChange = (category) => {
    setLocalFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handlePriceChange = (value, index) => {
    const newPriceRange = [...localFilters.priceRange];
    newPriceRange[index] = parseInt(value) || 0;
    setLocalFilters(prev => ({
      ...prev,
      priceRange: newPriceRange
    }));
  };

  const handleRatingChange = (rating) => {
    setLocalFilters(prev => ({
      ...prev,
      ratings: prev.ratings.includes(rating)
        ? prev.ratings.filter(r => r !== rating)
        : [...prev.ratings, rating]
    }));
  };

  const applyFilters = () => {
    dispatch(updateFilters(localFilters));
    onClose();
  };

  const handleReset = () => {
    dispatch(resetFilters());
    onClose();
  };

  return (
    <div className={`
      ${isOpen ? 'fixed inset-y-0 left-0' : 'hidden md:block'} 
      w-64 bg-white shadow-lg z-50 p-4 overflow-y-auto
      md:relative md:shadow-none md:z-auto
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Filters</h2>
        {/* Close button - only on mobile */}
        {isOpen && (
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 md:hidden"
          >
            ✕
          </button>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="flex items-center justify-between mb-2">
          <input
            type="number"
            min="0"
            value={localFilters.priceRange[0]}
            onChange={(e) => handlePriceChange(e.target.value, 0)}
            className="w-20 p-1 border rounded"
          />
          <span>to</span>
          <input
            type="number"
            min="0"
            value={localFilters.priceRange[1]}
            onChange={(e) => handlePriceChange(e.target.value, 1)}
            className="w-20 p-1 border rounded"
          />
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          value={localFilters.priceRange[1]}
          onChange={(e) => handlePriceChange(e.target.value, 1)}
          className="w-full"
        />
      </div>

      {/* Categories Filter */}
      <div className="mb-8">
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={localFilters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="rounded text-blue-600"
              />
              <span className="capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Ratings Filter */}
      <div className="mb-8">
        <h3 className="font-medium mb-3">Ratings</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => (
            <label key={rating} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={localFilters.ratings.includes(rating)}
                onChange={() => handleRatingChange(rating)}
                className="rounded text-blue-600"
              />
              <span>{rating} Stars & Up</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={handleReset}
          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
        >
          Reset
        </button>
        <button
          onClick={applyFilters}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default SidebarFilter;