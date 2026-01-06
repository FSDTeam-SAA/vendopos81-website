import CountryList from "@/components/home/country/CountryCatagory";
import BannerSlider from "@/components/sheard/BannerSlider";
import CountryCard from "@/components/sheard/countryCard";
import ProductCard from "@/components/sheard/productCard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
     <BannerSlider />
   <CountryList />
   <ProductCard />
    </div>
  );
}
