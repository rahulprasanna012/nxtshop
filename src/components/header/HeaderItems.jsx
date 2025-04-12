
import { BsCart3 } from 'react-icons/bs'
import { FaAngleDown, FaRegHeart, FaRegUser } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Search from './Search'

const HeaderItems = () => {
  

  return (
    <div className='flex items-center'>
      
      <Search/>
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