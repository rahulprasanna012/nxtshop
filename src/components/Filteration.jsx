import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortProducts, } from '../redux/productSlice';
import SidebarFilter from './header/SidebarFilter'; 

const Filteration = () => {
    const ListofItems = [
        { option: "RECOMMENDED", value: "recommended" },
        { option: "NEWEST FIRST", value: "newest" },
        { option: "POPULAR", value: "popular" },
        { option: "PRICE: HIGH TO LOW", value: "priceHighToLow" },
        { option: "PRICE: LOW TO HIGH", value: "priceLowToHigh" },
    ];

    const { product, activeFilters, sortBy } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const [showSidebar, setShowSidebar] = useState(false);

    const handleFilterChange = (e) => {
        dispatch(sortProducts(e.target.value));
    };

    return (
        <>
            <div className='w-full flex justify-between items-center border-t border-b border-gray-400 h-16 py-4'>
                <div>
                    <p className='font-bold text-sm sm:text-base'>{product.length} ITEMS</p>
                    {activeFilters.categories.length > 0 && (
                        <p className="text-xs text-gray-500">
                            Filtered: {activeFilters.categories.join(', ')}
                        </p>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    <button 
                        onClick={() => setShowSidebar(true)}
                        className="px-3 py-1 border rounded flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filters
                    </button>
                    <select 
                        className='outline-0 font-bold text-sm sm:text-base bg-transparent border rounded px-2 py-1'
                        onChange={handleFilterChange}
                        value={sortBy}
                    >
                        {ListofItems.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {showSidebar && (
                <div className="md:hidden">
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setShowSidebar(false)}
                    />
                    <SidebarFilter 
                        isOpen={showSidebar} 
                        onClose={() => setShowSidebar(false)} 
                    />
                </div>
            )}
        </>
    );
};

export default Filteration;