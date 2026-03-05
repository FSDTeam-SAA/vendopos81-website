import Subscription from "@/components/home/Subscription";
import WishlistPresenterComponent from "@/components/wishlist/components/WishlistPresenterComponent";

const page = () => {
  return (
    <div>
      <WishlistPresenterComponent />
      <Subscription />
    </div>
  );
};

export default page;
