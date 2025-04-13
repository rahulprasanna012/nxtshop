import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateCartItemQuantity } from '../redux/productSlice';

const Cart = () => {
    const { cart } = useSelector((store) => store.product);
    const dispatch = useDispatch();

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateCartItemQuantity({ id, quantity: newQuantity }));
        }
    };

  
    

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            
            {cart.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">Your cart is empty</p>
                    <Link 
                        to="/" 
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-2/3">
                        {cart.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row border-b border-gray-200 py-6">
                                <div className="sm:w-1/3 flex justify-center">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="h-32 object-contain"
                                    />
                                </div>
                                <div className="sm:w-2/3 mt-4 sm:mt-0">
                                    <Link to={`/product/${item.id}`} className="hover:text-blue-600">
                                        <h3 className="font-semibold text-lg">{item.title}</h3>
                                    </Link>
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="flex items-center border border-gray-300 rounded">
                                            <button 
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                className="px-3 py-1 text-lg cursor-pointer"
                                            >
                                                -
                                            </button>
                                            <span className="px-3">{item.quantity}</span>
                                            <button 
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                className="px-3 py-1 text-lg cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div>
                                            <span className="text-lg font-bold">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                        className="text-red-600 hover:text-red-800 mt-2 text-sm cursor-pointer"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="md:w-1/3">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>${calculateTotal()}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="border-t border-gray-200 my-4"></div>
                            <div className="flex justify-between font-bold text-lg mb-6">
                                <span>Total</span>
                                <span>${calculateTotal()}</span>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;