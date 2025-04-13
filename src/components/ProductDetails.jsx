import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductDetailsMiddleware } from '../redux/productMiddleware'
import { addToCart, setLoading, toggleWishlist } from '../redux/productSlice'
import { IoIosStar, IoIosStarHalf, IoIosStarOutline, IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const ProductDetails = () => {
    const { productDetail, loading, wishlist } = useSelector((store) => store.product)
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isAddingToCart, setIsAddingToCart] = useState(false)
    const [showCartNotification, setShowCartNotification] = useState(false)

    useEffect(() => {
        dispatch(setLoading())
        dispatch(fetchProductDetailsMiddleware(id))
    }, [id, dispatch])

    const handleWishlistToggle = () => {
        dispatch(toggleWishlist(productDetail.id))
    }

    const handleAddToCart = () => {
        setIsAddingToCart(true)
        dispatch(addToCart({ id: productDetail.id, quantity: 1 }))
        
        // Show notification
        setShowCartNotification(true)
        setTimeout(() => setShowCartNotification(false), 2000)
        
        // Reset button animation
        setTimeout(() => setIsAddingToCart(false), 1000)
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (!productDetail) {
        return <div className="flex justify-center items-center h-64">Product not found</div>
    }

    const renderStars = (rating) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 >= 0.5
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<IoIosStar key={i} className="text-yellow-400" />)
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<IoIosStarHalf key={i} className="text-yellow-400" />)
            } else {
                stars.push(<IoIosStarOutline key={i} className="text-yellow-400" />)
            }
        }
        
        return stars
    }

    const isInWishlist = wishlist.includes(productDetail.id)

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Notification for added to cart */}
            <AnimatePresence>
                {showCartNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center"
                    >
                        <FaShoppingCart className="mr-2" />
                        Added to cart!
                    </motion.div>
                )}
            </AnimatePresence>

            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center text-blue-600 mb-6 hover:text-blue-800 transition-colors"
            >
                <FaArrowLeft className="mr-2" />
                Back to Products
            </button>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    {/* Product Image */}
                    <div className="md:w-1/2 p-6 flex justify-center bg-gray-50 relative">
                        <img 
                            src={productDetail.image} 
                            alt={productDetail.title} 
                            className="h-80 object-contain"
                        />
                        <button
                            onClick={handleWishlistToggle}
                            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            {isInWishlist ? (
                                <IoIosHeart className="text-red-500 text-xl" />
                            ) : (
                                <IoIosHeartEmpty className="text-gray-400 text-xl hover:text-red-500" />
                            )}
                        </button>
                    </div>
                    
                    {/* Product Details */}
                    <div className="md:w-1/2 p-6">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">
                            {productDetail.title}
                        </h1>
                        
                        <div className="flex items-center mb-4">
                            <div className="flex mr-2">
                                {renderStars(productDetail.rating?.rate || 0)}
                            </div>
                            <span className="text-gray-600 text-sm">
                                ({productDetail.rating?.count || 0} reviews)
                            </span>
                        </div>
                        
                        <div className="mb-4">
                            <span className="text-gray-500 text-sm uppercase">
                                {productDetail.category}
                            </span>
                        </div>
                        
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-gray-800">
                                ${productDetail.price}
                            </span>
                        </div>
                        
                        <p className="text-gray-600 mb-6">
                            {productDetail.description}
                        </p>
                        
                        <div className="flex space-x-4">
                            <motion.button 
                                onClick={handleAddToCart}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`bg-blue-600 text-white px-6 py-2 rounded-full relative overflow-hidden ${
                                    isAddingToCart ? 'bg-blue-700' : 'hover:bg-blue-700'
                                }`}
                            >
                                <AnimatePresence mode="wait">
                                    {isAddingToCart ? (
                                        <motion.span
                                            key="adding"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="inline-flex items-center"
                                        >
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                className="inline-block mr-2"
                                            >
                                                <FaShoppingCart />
                                            </motion.span>
                                            Adding...
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="add"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                        >
                                            Add to Cart
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                
                                {/* Animated background effect */}
                                {isAddingToCart && (
                                    <motion.span
                                        className="absolute inset-0 bg-blue-700 opacity-0"
                                        animate={{ opacity: [0, 0.3, 0] }}
                                        transition={{ duration: 1 }}
                                    />
                                )}
                            </motion.button>
                            
                            <motion.button 
                                onClick={handleWishlistToggle}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center justify-center border px-6 py-2 rounded-full ${
                                    isInWishlist 
                                        ? 'border-red-500 text-red-500 hover:bg-red-50'
                                        : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                                }`}
                            >
                                {isInWishlist ? (
                                    <>
                                        <IoIosHeart className="text-red-500 mr-2" />
                                        In Wishlist
                                    </>
                                ) : (
                                    <>
                                        <IoIosHeartEmpty className="mr-2" />
                                        Add to Wishlist
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>
                
                {/* Additional Information Section */}
                <div className="border-t border-gray-200 p-6">
                    <h2 className="text-xl font-semibold mb-4">Product Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-medium text-gray-700">Category</h3>
                            <p className="text-gray-600 capitalize">{productDetail.category}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-700">Product ID</h3>
                            <p className="text-gray-600">{productDetail.id}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails