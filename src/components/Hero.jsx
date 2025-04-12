import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';


const Hero = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }

    const toggleWishlist = (productId) => {
        if (wishlist.includes(productId)) {
            setWishlist(wishlist.filter(id => id !== productId));
        } else {
            setWishlist([...wishlist, productId]);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">

            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white  overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="relative">
                            <img 
                                src={product.image} 
                                alt={product.title} 
                                className="w-full h-48 object-contain p-4 "
                            />
                            <button
                                onClick={() => toggleWishlist(product.id)}
                                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                            >
                                {wishlist.includes(product.id) ? (
                                    <IoIosHeart className="text-red-500 text-xl" />
                                ) : (
                                    <IoIosHeartEmpty className="text-gray-400 text-xl hover:text-red-500" />
                                )}
                            </button>
                        </div>

                        <div className="p-4">
                            <h3 className="text-gray-900 font-semibold text-lg mb-1 truncate">
                                {product.title}
                            </h3>
                         
                            <div className="flex justify-between items-center">
                                <span className="text-gray-900  text-lg">
                                    ${product.price.toFixed(2)}
                                </span>
                              
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hero;