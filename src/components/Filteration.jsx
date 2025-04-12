import React from 'react'
import { useSelector } from 'react-redux'

const Filteration = () => {

    const ListofIltems=[{
        option:"RECOMMENDED",
        value:"all",
    },
    {
        option:"NEWEST FIRST",
        value:"new",
    },
    {
        option:"POPULAR",
        value:"popular",
    },
    {
        option:"PRICE: HIGH TO LOW",
        value:"asc",
    },
    {
        option:"PRICE: LOW TO HIGH",
        value:"dec",
    },

]

const {product} = useSelector((store)=>(store.productState))


  return (
    <div className='flex justify-between items-center border  border-r-0 border-l-0 h-16  border-gray-400 mt-14'>
            <div>
            
                <p className='font-bold'>{product.length} ITEMS</p>

            </div>
      
        <select className='outline-0 font-bold'>

            {
                ListofIltems.map((item)=>(
                <option value={item.value} >{item.option}</option>))
            }


        </select>



    </div>
  )
}

export default Filteration