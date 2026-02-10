import Image from "next/image"

const AboutHero = () => {
  return (
    <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden bg-amber-100 shadow-lg">
              <Image
                src="/images/about/abouthero.png"
                alt="Professional chef preparing fresh ingredients"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex flex-col gap-6 md:gap-8">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
                About Us
              </h1>
              <div className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed">
                <p>
                  Vendo Food Distribution is a division of Vendo Group, created to simplify and modernize how food businesses source products. Our B2B online ordering platform allows store owners, restaurants, and specialty markets to purchase a wide range of food products from multiple suppliers all in one place.
                </p>
                <p>
                  We offer a carefully curated selection of African, Haitian, Caribbean, Latino, Canadian, and Mediterranean foods, designed to meet the growing demand for authentic and specialty products across Canada. Instead of dealing with multiple vendors, phone calls, and manual orders, buyers can access everything through a single, easy-to-use digital platform.
                </p>
                <p>
                  Our marketplace operates on a supplier-direct model, meaning products are listed directly by approved suppliers using a real-time inventory system. This ensures accurate availability, transparent pricing, and faster order fulfillment, giving buyers confidence and control when placing orders.
                </p>
                <p>
                  Our platform is built to scale, helping businesses grow efficiently without increasing operational complexity.
                </p>
                <p>
                  At Vendo Food Distribution, we help food businesses save time, reduce sourcing challenges, and access diverse products-by bringing technology, logistics, and multicultural food sourcing together into one powerful B2B marketplace.
                </p>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {[
                { alt: "Fresh salad with greens",url:'/images/about/abouthero1.png' },
                { alt: "Organic vegetables preparation" ,url:'/images/about/abouthero2.png' },
                { alt: "Cooking preparation with ingredients",url:'/images/about/abouthero3.png' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-lg overflow-hidden bg-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <Image
                    src={item.url}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero
