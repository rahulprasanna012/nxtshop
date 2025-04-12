
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import {setSearch} from '../../redux/productSlice'

const Search = () => {
    const [showSearch, setShowSearch] = useState(false)
    const {search}=useSelector((store) => (store.product))

    const dispatch=useDispatch()

    const captureInput=(e)=>{

        
        dispatch(setSearch(e.target.value));

    }


  return (
    <div className='flex items-center mx-2 w-[150px] md:w-[250px] justify-end'>
        {showSearch && (
          <input 
            type="text" 
            className='border mx-2 rounded-full border-gray-400 outline-0 p-1 px-2 transition ease-in-out w-full' 
            value={search}
            onChange={captureInput}
          />
        )}
        <button onClick={() => setShowSearch(!showSearch)}>
          <BsSearch />
        </button>
      </div>

  )
}

export default Search