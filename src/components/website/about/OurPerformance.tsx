import Image from "next/image";

interface PerformanceCard {
  title: string;
  description: string;
}

const OurPerformance = () => {
  const performanceCards: PerformanceCard[] = [
    {
      title: "Who We Are",
      description:
        "Vendo Food Distribution is a technology-driven B2B marketplace bridging the gap between specialty food suppliers and businesses across Canada.",
    },
    {
      title: "Our Model",
      description:
        "We operate on a supplier-direct model, ensuring real-time inventory accuracy and transparent pricing for every order placed on our platform.",
    },
    {
      title: "Our Mission",
      description:
        "To empower food businesses by streamlining multicultural sourcing through innovative digital solutions and reliable logistics.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#f9fff9]">
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-balance mb-6">
                Your Partner for E-Commerce Grocery Solutions
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                More than a marketplace, we are your technology and distribution
                partner, helping you streamline sourcing, reduce operational
                friction, and scale your business.
              </p>
            </div>

            <p className="text-gray-600 text-base leading-relaxed">
              At Vendo Food Distribution, we recognize that sourcing is one of
              the most significant challenges for food businesses. That&apos;s
              why we&apos;ve built a system that integrates technology and
              logistics to provide a seamless experience from supplier to store.
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
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPerformance;
