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
    <header className=' md:mx-16 p-5'>
      <div className='flex items-center justify-between my-3'>
        {/* Mobile menu button - only visible on small screens */}
        
        <img src={logo} alt="logo" className='size-7'/>

        <div className='ml-auto '>
          <h1 className='text-3xl font-bold mx-10'>Nxtshop</h1>
        </div>
        
        {/* Hide HeaderItems on mobile when menu is open */}
        <div className={`${isMobileMenuOpen ? 'hidden' : 'block'} md:block`}>
          <HeaderItems/>
        </div>

        <button 
          className='pr-2 md:hidden z-50 '
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      


      {/* Navbar - show differently on mobile */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
        <Navbar isMobile={isMobileMenuOpen} />
      </div>


    </header>
  )
}

export default Header