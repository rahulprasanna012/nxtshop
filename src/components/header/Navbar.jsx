import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ isMobile }) => {
  const listNav = [
    {
      id: 0,
      name: "Shop",
      link: "/"
    },
    
    {
      id: 2,
      name: "STORIES",
      link: "/"
    },
    {
      id: 3,
      name: "ABOUT",
      link: "/"
    },
    {
      id: 4,
      name: "CONTACT US",
      link: "/"
    }
  ]

  return (
    <nav>
      <ul className={`${isMobile ? 
        'flex flex-col items-center justify-center fixed inset-0 bg-white z-40' : 
        'flex items-center justify-center'}`}
      >
        {listNav.map((item) => (
          <li key={item.id} className={isMobile ? 'my-4 text-xl' : 'mx-5'}>
            <Link to={item.link}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar