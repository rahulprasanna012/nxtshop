import React, { useState } from 'react'
import logo from '../../assets/Logo.png'
import Navbar from './Navbar'
import HeaderItems from './HeaderItems'
import { FaBars, FaTimes } from 'react-icons/fa'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className='w-full sticky top-0 bg-white z-50 mb-14'>
      <div className='container mx-auto px-4 py-3'>
        <div className='flex items-center justify-between'>
          {/* Logo and Brand */}
          <div className='flex items-center justify-between '>
            <img src={logo} alt="logo" className='h-7 w-7'/>
           
          </div>
          <h1 className='text-md md:text-3xl font-bold md:ml-20'>NXTSHOP</h1>
          
          {/* Header Items - hidden on mobile when menu is open */}
          <div className={`${isMobileMenuOpen ? 'hidden' : 'flex'} md:flex items-center`}>
            <HeaderItems/>
          </div>

          {/* Mobile menu button */}
          <button 
            className='md:hidden z-50 p-2'
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navbar - show differently on mobile */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block mt-10 `}>
          <Navbar isMobile={isMobileMenuOpen} />
        </div>
      </div>
    </header>
  )
}

export default Header