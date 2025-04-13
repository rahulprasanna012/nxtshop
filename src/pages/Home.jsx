import React from 'react'
import Header from '../components/header/Header'
import Banner from '../components/Banner'
import Filteration from '../components/Filteration'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      <Header/>
      <Banner/> 
      <div className="mx-10">
          <Filteration/>
          <Hero/>
      </div>
    </div>
  )
}

export default Home