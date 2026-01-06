import CountryList from "@/components/home/country/CountryCatagory";
import FreshProducts from "@/components/home/FreshCleanProducts/FreshProducts";
import MostCatagory from "@/components/home/MostCatagory/MostCatagory";
import Subscription from "@/components/home/Subscription";

import BannerSlider from "@/components/sheard/BannerSlider";
import Footer from "@/components/sheard/Footer";

import ProductCard from "@/components/sheard/productCard";

export default function Home() {
  return (
    <div className="">
      <BannerSlider />
      <CountryList />
      <ProductCard />
      <FreshProducts />
     <MostCatagory />
     <Subscription />
     <Footer />
    </div>
  );
}
