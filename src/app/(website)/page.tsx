import CountryList from "@/components/home/country/CountryCatagory";
import FreshProducts from "@/components/home/FreshCleanProducts/FreshProducts";
import MostCatagory from "@/components/home/MostCatagory/MostCatagory";
import FeatureProduct from "@/components/home/product/FeatureProduct";
import Subscription from "@/components/home/Subscription";

import BannerSlider from "@/components/shared/BannerSlider";


export default function Home() {
  return (
    <div className="">
      <BannerSlider />
      <CountryList />
      <FeatureProduct />
      <FreshProducts />
     <MostCatagory />
     <Subscription />
     {/* <Footer /> */}
    </div>
  );
}
