"use client";

import CountryCard from "@/components/shared/countryCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef } from "react";

const CountryCatagory = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const data =  [ { value: "africa-all", name: "All Africa", continent: "africa", img: "/images/country1.png" },
      { value: "pakistan", name: "Pakistan", continent: "asia", img: "/images/flag_pakistan.png" },
  { value: "bangladesh", name: "Bangladesh", continent: "asia", img: "/images/flag_bangladesh.png" },
  { value: "japan", name: "Japan", continent: "asia", img: "/images/country1.png" },
  { value: "philippines", name: "Philippines", continent: "asia", img: "/images/country1.png" },
  // ... rest of data
  { value: "nigeria", name: "Nigeria", continent: "africa", img: "/images/country1.png" },
  { value: "ethiopia", name: "Ethiopia", continent: "africa", img: "/images/country1.png" },
  { value: "egypt", name: "Egypt", continent: "africa", img: "/images/country1.png" },
  { value: "dr-congo", name: "DR Congo", continent: "africa", img: "/images/country1.png" },
  { value: "tanzania", name: "Tanzania", continent: "africa", img: "/images/country1.png" },
  { value: "south-africa", name: "South Africa", continent: "africa", img: "/images/country1.png" },
  { value: "kenya", name: "Kenya", continent: "africa", img: "/images/country1.png" },
  { value: "uganda", name: "Uganda", continent: "africa", img: "/images/country1.png" },
  { value: "algeria", name: "Algeria", continent: "africa", img: "/images/country1.png" },
  { value: "sudan", name: "Sudan", continent: "africa", img: "/images/country1.png" },
  { value: "morocco", name: "Morocco", continent: "africa", img: "/images/country1.png" },
  { value: "angola", name: "Angola", continent: "africa", img: "/images/country1.png" },
  { value: "mozambique", name: "Mozambique", continent: "africa", img: "/images/country1.png" },
  { value: "ghana", name: "Ghana", continent: "africa", img: "/images/country1.png" },
  { value: "madagascar", name: "Madagascar", continent: "africa", img: "/images/country1.png" },
  { value: "cameroon", name: "Cameroon", continent: "africa", img: "/images/country1.png" },
  { value: "cote-ivoire", name: "Côte d'Ivoire", continent: "africa", img: "/images/country1.png" },
  { value: "niger", name: "Niger", continent: "africa", img: "/images/country1.png" },
  { value: "burkina-faso", name: "Burkina Faso", continent: "africa", img: "/images/country1.png" },
  { value: "mali", name: "Mali", continent: "africa", img: "/images/country1.png" },
  { value: "malawi", name: "Malawi", continent: "africa", img: "/images/country1.png" },
  { value: "zambia", name: "Zambia", continent: "africa", img: "/images/country1.png" },
  { value: "senegal", name: "Senegal", continent: "africa", img: "/images/country1.png" },
  { value: "chad", name: "Chad", continent: "africa", img: "/images/country1.png" },
  { value: "somalia", name: "Somalia", continent: "africa", img: "/images/country1.png" },
  { value: "zimbabwe", name: "Zimbabwe", continent: "africa", img: "/images/country1.png" },
  { value: "guinea", name: "Guinea", continent: "africa", img: "/images/country1.png" },
  { value: "rwanda", name: "Rwanda", continent: "africa", img: "/images/country1.png" },
  { value: "benin", name: "Benin", continent: "africa", img: "/images/country1.png" },
  { value: "burundi", name: "Burundi", continent: "africa", img: "/images/country1.png" },
  { value: "tunisia", name: "Tunisia", continent: "africa", img: "/images/country1.png" },
  { value: "south-sudan", name: "South Sudan", continent: "africa", img: "/images/country1.png" },
  { value: "togo", name: "Togo", continent: "africa", img: "/images/country1.png" },
  { value: "sierra-leone", name: "Sierra Leone", continent: "africa", img: "/images/country1.png" },
  { value: "libya", name: "Libya", continent: "africa", img: "/images/country1.png" },
  { value: "congo", name: "Republic of the Congo", continent: "africa", img: "/images/country1.png" },
  { value: "liberia", name: "Liberia", continent: "africa", img: "/images/country1.png" },
  { value: "central-african-republic", name: "Central African Republic", continent: "africa", img: "/images/country1.png" },
  { value: "mauritania", name: "Mauritania", continent: "africa", img: "/images/country1.png" },
  { value: "eritrea", name: "Eritrea", continent: "africa", img: "/images/country1.png" },
  { value: "namibia", name: "Namibia", continent: "africa", img: "/images/country1.png" },
  { value: "gambia", name: "Gambia", continent: "africa", img: "/images/country1.png" },
  { value: "botswana", name: "Botswana", continent: "africa", img: "/images/country1.png" },
  { value: "gabon", name: "Gabon", continent: "africa", img: "/images/country1.png" },
  { value: "lesotho", name: "Lesotho", continent: "africa", img: "/images/country1.png" },
  { value: "guinea-bissau", name: "Guinea-Bissau", continent: "africa", img: "/images/country1.png" },
  { value: "equatorial-guinea", name: "Equatorial Guinea", continent: "africa", img: "/images/country1.png" },
  { value: "mauritius", name: "Mauritius", continent: "africa", img: "/images/country1.png" },
  { value: "eswatini", name: "Eswatini", continent: "africa", img: "/images/country1.png" },
  { value: "djibouti", name: "Djibouti", continent: "africa", img: "/images/country1.png" },
  { value: "comoros", name: "Comoros", continent: "africa", img: "/images/country1.png" },
  { value: "cape-verde", name: "Cabo Verde", continent: "africa", img: "/images/country1.png" },
  { value: "sao-tome-and-principe", name: "São Tomé & Príncipe", continent: "africa", img: "/images/country1.png" },
  { value: "seychelles", name: "Seychelles", continent: "africa", img: "/images/country1.png" },

  // ASIAN COUNTRIES
  { value: "asia-all", name: "All Asia", continent: "asia", img: "/images/country1.png" },
  { value: "china", name: "China", continent: "asia", img: "/images/country1.png" },
  { value: "india", name: "India", continent: "asia", img: "/images/flag_india.png" },
  { value: "indonesia", name: "Indonesia", continent: "asia", img: "/images/country1.png" },
  { value: "pakistan", name: "Pakistan", continent: "asia", img: "/images/flag_pakistan.png" },
  { value: "bangladesh", name: "Bangladesh", continent: "asia", img: "/images/flag_bangladesh.png" },
  { value: "japan", name: "Japan", continent: "asia", img: "/images/country1.png" },
  { value: "philippines", name: "Philippines", continent: "asia", img: "/images/country1.png" },
  { value: "vietnam", name: "Vietnam", continent: "asia", img: "/images/country1.png" },
  { value: "turkey", name: "Turkey", continent: "asia", img: "/images/country1.png" },
  { value: "iran", name: "Iran", continent: "asia", img: "/images/country1.png" },
  { value: "thailand", name: "Thailand", continent: "asia", img: "/images/country1.png" },
  { value: "myanmar", name: "Myanmar", continent: "asia", img: "/images/country1.png" },
  { value: "south-korea", name: "South Korea", continent: "asia", img: "/images/country1.png" },
  { value: "iraq", name: "Iraq", continent: "asia", img: "/images/country1.png" },
  { value: "afghanistan", name: "Afghanistan", continent: "asia", img: "/images/country1.png" },
  { value: "saudi-arabia", name: "Saudi Arabia", continent: "asia", img: "/images/country1.png" },
  { value: "uzbekistan", name: "Uzbekistan", continent: "asia", img: "/images/country1.png" },
  { value: "malaysia", name: "Malaysia", continent: "asia", img: "/images/country1.png" },
  { value: "yemen", name: "Yemen", continent: "asia", img: "/images/country1.png" },
  { value: "nepal", name: "Nepal", continent: "asia", img: "/images/country1.png" },
  { value: "north-korea", name: "North Korea", continent: "asia", img: "/images/country1.png" },
  { value: "sri-lanka", name: "Sri Lanka", continent: "asia", img: "/images/country1.png" },
  { value: "kazakhstan", name: "Kazakhstan", continent: "asia", img: "/images/country1.png" },
  { value: "syria", name: "Syria", continent: "asia", img: "/images/country1.png" },
  { value: "cambodia", name: "Cambodia", continent: "asia", img: "/images/country1.png" },
  { value: "jordan", name: "Jordan", continent: "asia", img: "/images/country1.png" },
  { value: "azerbaijan", name: "Azerbaijan", continent: "asia", img: "/images/country1.png" },
  { value: "uae", name: "United Arab Emirates", continent: "asia", img: "/images/country1.png" },
  { value: "tajikistan", name: "Tajikistan", continent: "asia", img: "/images/country1.png" },
  { value: "israel", name: "Israel", continent: "asia", img: "/images/country1.png" },
  { value: "laos", name: "Laos", continent: "asia", img: "/images/country1.png" },
  { value: "lebanon", name: "Lebanon", continent: "asia", img: "/images/country1.png" },
  { value: "kyrgyzstan", name: "Kyrgyzstan", continent: "asia", img: "/images/country1.png" },
  { value: "turkmenistan", name: "Turkmenistan", continent: "asia", img: "/images/country1.png" },
  { value: "singapore", name: "Singapore", continent: "asia", img: "/images/country1.png" },
  { value: "oman", name: "Oman", continent: "asia", img: "/images/country1.png" },
  { value: "qatar", name: "Qatar", continent: "asia", img: "/images/country1.png" },
  { value: "kuwait", name: "Kuwait", continent: "asia", img: "/images/country1.png" },
  { value: "georgia", name: "Georgia", continent: "asia", img: "/images/country1.png" },
  { value: "mongolia", name: "Mongolia", continent: "asia", img: "/images/country1.png" },
  { value: "armenia", name: "Armenia", continent: "asia", img: "/images/country1.png" },
  { value: "bhutan", name: "Bhutan", continent: "asia", img: "/images/country1.png" },
  { value: "maldives", name: "Maldives", continent: "asia", img: "/images/country1.png" },
  { value: "brunei", name: "Brunei", continent: "asia", img: "/images/country1.png" },
  { value: "timor-leste", name: "Timor-Leste", continent: "asia", img: "/images/country1.png" },
  { value: "bahrain", name: "Bahrain", continent: "asia", img: "/images/country1.png" },
  { value: "cyprus", name: "Cyprus", continent: "asia", img: "/images/country1.png" },

  // EUROPEAN COUNTRIES
  { value: "europe-all", name: "All Europe", continent: "europe", img: "/images/country1.png" },
  { value: "russia", name: "Russia", continent: "europe", img: "/images/country1.png" },
  { value: "germany", name: "Germany", continent: "europe", img: "/images/country1.png" },
  { value: "united-kingdom", name: "United Kingdom", continent: "europe", img: "/images/flag_uk.png" },
  { value: "france", name: "France", continent: "europe", img: "/images/country1.png" },
  { value: "italy", name: "Italy", continent: "europe", img: "/images/country1.png" },
  { value: "spain", name: "Spain", continent: "europe", img: "/images/country1.png" },
  { value: "ukraine", name: "Ukraine", continent: "europe", img: "/images/country1.png" },
  { value: "poland", name: "Poland", continent: "europe", img: "/images/country1.png" },
  { value: "romania", name: "Romania", continent: "europe", img: "/images/country1.png" },
  { value: "netherlands", name: "Netherlands", continent: "europe", img: "/images/country1.png" },
  { value: "belgium", name: "Belgium", continent: "europe", img: "/images/country1.png" },
  { value: "czech-republic", name: "Czech Republic", continent: "europe", img: "/images/country1.png" },
  { value: "greece", name: "Greece", continent: "europe", img: "/images/country1.png" },
  { value: "portugal", name: "Portugal", continent: "europe", img: "/images/country1.png" },
  { value: "sweden", name: "Sweden", continent: "europe", img: "/images/country1.png" },
  { value: "hungary", name: "Hungary", continent: "europe", img: "/images/country1.png" },
  { value: "belarus", name: "Belarus", continent: "europe", img: "/images/country1.png" },
  { value: "austria", name: "Austria", continent: "europe", img: "/images/country1.png" },
  { value: "serbia", name: "Serbia", continent: "europe", img: "/images/country1.png" },
  { value: "switzerland", name: "Switzerland", continent: "europe", img: "/images/country1.png" },
  { value: "bulgaria", name: "Bulgaria", continent: "europe", img: "/images/country1.png" },
  { value: "denmark", name: "Denmark", continent: "europe", img: "/images/country1.png" },
  { value: "finland", name: "Finland", continent: "europe", img: "/images/country1.png" },
  { value: "slovakia", name: "Slovakia", continent: "europe", img: "/images/country1.png" },
  { value: "norway", name: "Norway", continent: "europe", img: "/images/country1.png" },
  { value: "ireland", name: "Ireland", continent: "europe", img: "/images/country1.png" },
  { value: "croatia", name: "Croatia", continent: "europe", img: "/images/country1.png" },
  { value: "moldova", name: "Moldova", continent: "europe", img: "/images/country1.png" },
  { value: "bosnia-herzegovina", name: "Bosnia & Herzegovina", continent: "europe", img: "/images/country1.png" },
  { value: "albania", name: "Albania", continent: "europe", img: "/images/country1.png" },
  { value: "lithuania", name: "Lithuania", continent: "europe", img: "/images/country1.png" },
  { value: "north-macedonia", name: "North Macedonia", continent: "europe", img: "/images/country1.png" },
  { value: "slovenia", name: "Slovenia", continent: "europe", img: "/images/country1.png" },
  { value: "latvia", name: "Latvia", continent: "europe", img: "/images/country1.png" },
  { value: "estonia", name: "Estonia", continent: "europe", img: "/images/country1.png" },
  { value: "montenegro", name: "Montenegro", continent: "europe", img: "/images/country1.png" },
  { value: "luxembourg", name: "Luxembourg", continent: "europe", img: "/images/country1.png" },
  { value: "malta", name: "Malta", continent: "europe", img: "/images/country1.png" },
  { value: "iceland", name: "Iceland", continent: "europe", img: "/images/country1.png" },
  { value: "andorra", name: "Andorra", continent: "europe", img: "/images/country1.png" },
  { value: "monaco", name: "Monaco", continent: "europe", img: "/images/country1.png" },
  { value: "liechtenstein", name: "Liechtenstein", continent: "europe", img: "/images/country1.png" },
  { value: "san-marino", name: "San Marino", continent: "europe", img: "/images/country1.png" },
  { value: "vatican-city", name: "Vatican City", continent: "europe", img: "/images/country1.png" },
  { value: "usa", name: "USA", continent: "americas", img: "/images/flag_usa.png" },
];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="overflow-hidden py-10 container mx-auto  bg-white">
      <div className=" mx-auto px-4 mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 border-none">Shop by Country</h2>
        <p className="text-gray-500 mt-2 text-lg">Find authentic products from your favorite regions</p>
      </div>

      <div className="relative group  mx-auto">
        {/* Navigation Buttons */}
        <button 
          onClick={() => handleScroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 shadow-lg text-gray-800 hover:bg-primary hover:text-white transition-all duration-300 opacity-90 group-hover:opacity-100  md:block"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => handleScroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 shadow-lg text-gray-800 hover:bg-primary hover:text-white transition-all duration-300 opacity-90 group-hover:opacity-100  md:block"
        >
          <ChevronRight size={24} />
        </button>

        {/* Blur/Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="relative w-full overflow-x-auto scrollbar-hide no-scrollbar"
        >
          {/* Slider track - We keep the marquee div but allow manual scrolling */}
          <div className="flex w-max gap-8 animate-marquee hover:pause whitespace-nowrap py-4 px-32">
            {[...data, ...data].map((item, index) => (
              <div key={index} className="inline-block">
                <CountryCard data={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryCatagory;
