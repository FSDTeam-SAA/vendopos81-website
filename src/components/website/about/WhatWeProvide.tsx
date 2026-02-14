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
        "We work directly with trusted suppliers to bring you competitive B2B pricing, volume discounts, and exclusive offers-helping you protect margins and stay profitable.",
    },
    {
      icon: "images/about/provide2.svg",
      title: "Wide Assortment",
      description:
        "Access a diverse catalog of African, Haitian, Caribbean, Latino, Canadian, and Mediterranean products from multiple suppliers, all in one place.",
    },
    {
      icon: "images/about/provide3.svg",
      title: "Reliable Delivery",
      description:
        "Get fast, dependable delivery options designed for business needs, with clear lead times and order tracking from supplier to store.",
    },
    {
      icon: "images/about/provide4.svg",
      title: "Easy Returns",
      description:
        "Our return process is simple and transparent. Approved returns are handled efficiently to minimize disruption to your operations.",
    },
    {
      icon: "images/about/provide5.svg",
      title: "100% Satisfaction",
      description:
        "We are committed to reliability, accuracy, and service quality so you can order with confidence every time.",
    },
    {
      icon: "images/about/provide6.svg",
      title: "Great Daily Deals",
      description:
        "Take advantage of daily promotions and special deals on selected products to maximize value and manage costs effectively.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#f9fff9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-balance">
            What We Provide?
          </h2>
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
                <Image
                  src={service.icon}
                  width={80}
                  height={80}
                  alt="icon"
                  className="w-12 h-12 md:w-16 md:h-16"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatWeProvide
