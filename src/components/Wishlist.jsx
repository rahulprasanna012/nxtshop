import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoIosHeart, IoIosClose } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import { toggleWishlist } from '../redux/productSlice';

const Wishlist = () => {
    const { wishlist, product } = useSelector((store) => store.product);
    const dispatch = useDispatch();
    
    const wishlistProducts = product.filter(p => wishlist.includes(p.id));

    const handleRemoveFromWishlist = (productId) => {
        dispatch(toggleWishlist(productId));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
            
            <AnimatePresence>
                {wishlist.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-12"
                    >
                        <IoIosHeart className="mx-auto text-gray-300 text-5xl mb-4" />
                        <p className="text-gray-600 mb-4">Your wishlist is empty</p>
                        <Link 
                            to="/" 
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Continue Shopping
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div 
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        {wishlistProducts.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
                            >
                                <button
                                    onClick={() => handleRemoveFromWishlist(item.id)}
                                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors"
                                    aria-label="Remove from wishlist"
                                >
                                    <IoIosClose className="text-gray-600 text-xl" />
                                </button>
                                
                                <Link to={`/product/${item.id}`} className="block">
                                    <div className="relative h-48 bg-gray-50">
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="w-full h-full object-contain p-4"
                                        />
                                        <div className="absolute top-2 left-2">
                                            <IoIosHeart className="text-red-500 text-2xl" />
                                        </div>
                                    </div>
                                    
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600">
                                            {item.title}
                                        </h3>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold">${item.price}</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Wishlist;