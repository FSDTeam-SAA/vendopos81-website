import Image from "next/image"

interface ServiceCard {
  icon: string
  title: string
  description: string
}

const WhatWeProvide = () => {
  const services: ServiceCard[] = [
    {
      icon: "images/about/provide1.svg",
      title: "Best Prices & Offers",
      description:
        "There are many variations of passages of lorem ipsum dolor sit amet, consectetur adipiscing in some form",
    },
    {
      icon: "images/about/provide2.svg",
      title: "Wide Assortment",
      description:
        "There are many variations of passages of lorem ipsum dolor sit amet, consectetur adipiscing in some form",
    },
    {
      icon: "images/about/provide3.svg",
      title: "Free Delivery",
      description:
        "There are many variations of passages of lorem ipsum dolor sit amet, consectetur adipiscing in some form",
    },
    {
      icon: "images/about/provide4.svg",
      title: "Easy Returns",
      description:
        "There are many variations of passages of lorem ipsum dolor sit amet, consectetur adipiscing in some form",
    },
    {
      icon: "images/about/provide5.svg",
      title: "100% Satisfaction",
      description:
        "There are many variations of passages of lorem ipsum dolor sit amet, consectetur adipiscing in some form",
    },
    {
      icon: "images/about/provide6.svg",
      title: "Great Daily Deal",
      description:
        "There are many variations of passages of lorem ipsum dolor sit amet, consectetur adipiscing in some form",
    },
  ]

  return (
    <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-balance">What We Provide?</h2>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center gap-4 p-6 md:p-8 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
            >
              {/* Icon Container */}
              <div className="text-5xl md:text-6xl p-4 bg-white rounded-full group-hover:scale-110 transition-transform duration-300">
                <Image src={service.icon}  width={100} height={100} alt="icon"/>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-gray-900">{service.title}</h3>

              {/* Description */}
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatWeProvide
