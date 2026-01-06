import React from 'react'
import WeeklyCatagory from './WeeklyCatagory'
import CaseDeals from './CaseDeals'
import RecentlyAdded from './RecentlyAdded'
import TopRated from './TopRated'

const MostCatagory = () => {
  return (
    <section className='my-10 md:my-16 lg:my-20'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-between'>
            <WeeklyCatagory />
            <CaseDeals />
            <RecentlyAdded />
            <TopRated />
        </div>
    </section>
  )
}

export default MostCatagory