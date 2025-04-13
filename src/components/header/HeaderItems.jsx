import { BsCart3 } from 'react-icons/bs'
import { FaAngleDown, FaRegHeart, FaRegUser } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Search from './Search'
import { useSelector } from 'react-redux'

const HeaderItems = () => {

  const {cart}=useSelector((store)=>(store.product))
  const {user}=useSelector((store)=>(store.auth))

 
 
  

  return (
    <div className='flex items-center space-x-4'>
      <Search/>
      <Link to='/product/wishlist' className='hover:text-gray-600 transition-colors'>
        <FaRegHeart className='text-lg' />
      </Link>

      <Link to='/product/cart' className='flex items-center hover:text-gray-600 transition-colors'>
        <span className='mx-1 text-sm'>{cart.length}</span>
        <BsCart3 className='text-lg' />
      </Link>

      <Link to="/auth" className='hover:text-gray-600 transition-colors flex items-center '>
        <FaRegUser className='text-lg' />

        {
          user===null?<p className='text-sm m-2'>Signin</p>:<p>{user.name.firstname}</p>
        }
      </Link>
      
      <div className='hidden md:flex items-center hover:text-gray-600 transition-colors'>
        <span className='mx-1 text-sm'>ENG</span>
        <FaAngleDown className='text-sm' />
      </div>
    </div>
  )
}

export default HeaderItems