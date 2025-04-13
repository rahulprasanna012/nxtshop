import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../../redux/productSlice'

const Search = () => {
    const [showSearch, setShowSearch] = useState(false)
    const { search } = useSelector((store) => store.product)
    const dispatch = useDispatch()

    const captureInput = (e) => {
        dispatch(setSearch(e.target.value))
    }

    return (
        <div className='relative flex items-center'>
            {showSearch && (
                <input 
                    type="text" 
                    className='absolute right-6 border rounded-full border-gray-300 outline-none py-1 px-3 w-48 md:w-64 text-sm bg-white shadow-sm'
                    value={search}
                    onChange={captureInput}
                    placeholder="Search products..."
                    autoFocus
                />
            )}
            <button 
                onClick={() => setShowSearch(!showSearch)}
                className='p-1 hover:text-gray-600 transition-colors'
                aria-label="Search"
            >
                <BsSearch className='text-lg' />
            </button>
        </div>
    )
}

export default Search