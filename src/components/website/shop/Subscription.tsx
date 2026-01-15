
import SubscriptionCard from '@/components/shared/SubscriptionCard';
import React from 'react'

const Subscription = () => {
      const data = {
    tittle: "Stay home & get your daily needs from our shop",
    dis: "Get the latest updates and offers straight to your inbox.",
    image: "/images/homesubscription1.jpg",
  };
  return (
    <section className="my-10 md:my-16 xl:my-20">
      <div className="container mx-auto px-4">
        <SubscriptionCard data={data} />
      </div>
    </section>
  )
}

export default Subscription