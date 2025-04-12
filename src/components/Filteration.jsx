import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortProducts } from '../redux/productSlice';

const Filteration = () => {
    const ListofItems = [
        { option: "RECOMMENDED", value: "recommended" },
        { option: "NEWEST FIRST", value: "newest" },
        { option: "POPULAR", value: "popular" },
        { option: "PRICE: HIGH TO LOW", value: "priceHighToLow" },
        { option: "PRICE: LOW TO HIGH", value: "priceLowToHigh" },
    ];

    const { product } = useSelector((store) => store.product);
    const dispatch = useDispatch();

    const handleFilterChange = (e) => {
        dispatch(sortProducts(e.target.value));
    };

    return (
        <div className='flex justify-between items-center border border-r-0 border-l-0 border-gray-400 h-16 mt-14'>
            <div>
                <p className='font-bold'>{product.length} ITEMS</p>
            </div>
            <select 
                className='outline-0 font-bold'
                onChange={handleFilterChange}
            >
                {ListofItems.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filteration;