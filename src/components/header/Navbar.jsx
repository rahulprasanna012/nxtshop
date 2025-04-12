import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const listNav=[{
        id:0,
        name:"Shop",
        link:"/"
        },
        {
            id:1,
            name:"SKILLS",
            link:"/skills"
        },
        {
            id:2,
            name:"STPRIES",
            link:"/stories"
        },
        {
            id:3,
            name:"ABOUT",
            link:"/about"
        },
        {
            id:4,
            name:"CONTACT US",
            link:"/contact "
        }

]


  return (
    <nav>

        <ul className='flex items-center justify-center'>

        
        {

            listNav.map((item)=>(
               
                <li key={item.id}>

                <Link to={item.link} className='mx-5'>
                    {
                        item.name
                    }
                </Link>


                </li>
            ))
        }
        </ul>


    </nav>
  )
}

export default Navbar