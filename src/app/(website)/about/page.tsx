import FAQ from '@/components/shared/FAQ'
import AboutHero from '@/components/website/about/AboutHero'
import OurPerformance from '@/components/website/about/OurPerformance'
import WhatWeProvide from '@/components/website/about/WhatWeProvide'
import React from 'react'

const page = () => {
  return (
    <section>
      <AboutHero />
      <WhatWeProvide />
      <OurPerformance />
      <FAQ />
    </section>
  )
}

export default page