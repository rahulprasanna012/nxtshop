import React from 'react'
import Header from '../components/header/Header'
import Banner from '../components/Banner'
import Filteration from '../components/Filteration'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <div>

        <Header/>
        <div className='flex justify-center'>
        <Banner/>
        </div>
        <div className='mx-14'>
        <Filteration/>
        <Hero/>

        </div>

        
        

    </div>
  )
}

export default Home