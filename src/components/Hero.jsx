import { useEffect } from 'react';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductMiddleware } from '../redux/productMiddleware';
import { toggleWishlist } from '../redux/productSlice';
import { Link } from 'react-router-dom';

const Hero = () => {
    const { filteredProduct, loading, wishlist } = useSelector((store) => store.product);
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductMiddleware());
    }, [dispatch]);

    const handleWishlistToggle = (e, productId) => {
        e.preventDefault(); // Prevent default action
        e.stopPropagation(); // Stop event bubbling
        dispatch(toggleWishlist(productId));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="w-full px-0 sm:px-4 py-4 sm:py-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
                {filteredProduct.map((item) => (
                    <Link 
                        to={`/product/${item.id}`} 
                        key={item.id} 
                        className="w-full bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="relative">
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-40 sm:h-48 object-contain p-2 sm:p-4"
                            />
                    
                            <button
                                onClick={(e) => handleWishlistToggle(e, item.id)}
                                className="absolute top-1 right-1 sm:top-2 sm:right-2 p-1 sm:p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                            >
                                {wishlist.includes(item.id) ? (
                                    <IoIosHeart className="text-red-500 text-lg sm:text-xl" />
                                ) : (
                                    <IoIosHeartEmpty className="text-gray-400 text-lg sm:text-xl hover:text-red-500" />
                                )}
                            </button>
                        </div>
                        <div className="p-2 sm:p-4">
                            <h3 className="text-gray-900 font-semibold text-sm sm:text-lg mb-1 line-clamp-2">
                                {item.title}
                            </h3>
                            <div className="flex justify-between items-center">
                                

                                    {
                                        user==null?<p>Signin to see the price</p>:<p className='text-gray-900 text-sm sm:text-lg'>${item.price.toFixed(2)}</p>
                                    }

                                    
                              
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Hero;