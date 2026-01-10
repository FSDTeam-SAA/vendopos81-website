import Image from "next/image"

interface PerformanceCard {
  title: string
  description: string
}

const OurPerformance = () => {
  const performanceCards: PerformanceCard[] = [
    {
      title: "Who we are",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore in some form",
    },
    {
      title: "Our history",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore in some form",
    },
    {
      title: "Our mission",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore in some form",
    },
  ]

  return (
    <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 md:mb-16">
          {/* Images Section */}
          <div className=" gap-4 md:gap-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-200 shadow-lg col-span-1">
              <Image
                src="/images/about/performance.png"
                alt="Team working together in modern office"
                fill
                className="object-cover"
              />
            </div>
            {/* <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-200 shadow-lg col-span-1 flex flex-col justify-end">
              <Image
                src="/professional-woman-office.jpg"
                alt="Professional woman working at desk"
                fill
                className="object-cover"
              />
            </div> */}
          </div>

          {/* Content Section */}
          <div className="flex flex-col gap-6 md:gap-8">
            <div>
              <p className="text-sm md:text-base font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                Our performance
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-balance mb-4">
                Your Partner for e-commerce grocery solution
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Quisque a quam. Sed ut justo. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <p className="text-gray-600 text-base leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
              excepteur sint occaecat cupidatat non proident. Sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </p>
          </div>
        </div>

        {/* Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {performanceCards.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4 p-6 md:p-8 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">{card.title}</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurPerformance
