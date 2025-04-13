import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './components/ProductDetails'
import Header from './components/header/Header'
import Wishlist from './components/Wishlist'
import Cart from './components/Cart'

const App = () => {
  return (
    <>
      <Header/>

      <Routes>

      

        <Route path="/" element={<Home/>}/>
        <Route  path='/product/:id' element={<ProductDetails/>} />
        <Route  path='/product/wishlist' element={<Wishlist/>}/>
        <Route path='/product/cart' element={<Cart/>}/>

    </Routes>
    
    </>
    
  )
}

export default App