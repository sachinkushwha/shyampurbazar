import React from 'react'
import Navbar from '../components/Header';
import StatsCards from '../components/Stats';
import OrderCard from '../components/Orders';

function Home() {
  return (
    <div>
      <Navbar />
      <StatsCards/>
      <OrderCard/>
    </div>

  )
}

export default Home;