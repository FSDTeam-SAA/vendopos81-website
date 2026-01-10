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
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">
                Welcome to Nest
              </h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempore incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
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
