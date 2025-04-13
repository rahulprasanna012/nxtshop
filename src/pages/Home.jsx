import React from 'react'
import Filteration from '../components/Filteration'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      <div className="mx-10 md:mx-32 ">
          <Filteration/>
          <Hero/>
      </div>
    </div>
  )
}

export default Home