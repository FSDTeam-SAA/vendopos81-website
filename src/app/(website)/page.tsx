import CountryList from "@/components/home/country/CountryCategory";
import FreshProducts from "@/components/home/FreshCleanProducts/FreshProducts";
import MostCatagory from "@/components/home/MostCatagory/MostCatagory";
import FeatureProduct from "@/components/home/product/FeatureProduct";
import NewArrival from "@/components/home/product/newarrival/NewArrival";
import Subscription from "@/components/home/Subscription";

import BannerSlider from "@/components/shared/BannerSlider";

export default function Home() {
  return (
    <div className="">
      <BannerSlider />
      <CountryList />
      <FeatureProduct />
      <NewArrival />
      <FreshProducts />
      <MostCatagory />
      <Subscription />
      {/* <Footer /> */}
    </div>
  );
}
