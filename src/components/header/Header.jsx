import React from 'react'

import logo from '../../assets/Logo.png'

import Navbar from './Navbar'

import HeaderItems from './HeaderItems'

const Header = () => {
  return (
    <header className=' mx-16 p-5 '>
        <div className='flex  items-center justify-between my-3'>

                    <img src={logo} alt="logo" className='size-7'/>

            <h1 className='text-3xl font-bold'>Nxtshop</h1>

            
            <HeaderItems/>


        </div>

        <Navbar/>
            


    </header>
  )
}

export default Header