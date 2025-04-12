import React, { useState } from 'react'
import { BsCart3, BsSearch } from 'react-icons/bs'
import { FaAngleDown, FaRegHeart, FaRegUser } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const HeaderItems = () => {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <div className='flex items-center'>
      <div className='flex items-center mx-2 w-[150px] md:w-[250px] justify-end'>
        {showSearch && (
          <input 
            type="text" 
            className='border mx-2 rounded-full border-gray-400 outline-0 p-1 px-2 transition ease-in-out w-full' 
          />
        )}
        <button onClick={() => setShowSearch(!showSearch)}>
          <BsSearch />
        </button>
      </div>

      <Link className='mx-2' to='/wishlist'>
        <FaRegHeart />
      </Link>

      <Link className='flex items-center mx-2' to='/cart'>
        <p className='mx-1'>0</p>
        <BsCart3 />
      </Link>

      <Link className='flex items-center mx-2' to="/auth">
        <FaRegUser />
      </Link>
      
      <div className='hidden md:flex items-center mx-2'>
        <p className='mx-1'>ENG</p>
        <FaAngleDown />
      </div>
    </div>
  )
}

export default HeaderItems