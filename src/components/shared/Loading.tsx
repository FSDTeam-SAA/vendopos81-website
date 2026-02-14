"use client";
import { motion } from "framer-motion";
import ProductSkeleton from "../home/product/ProductSkeleton";

const LoadingPage = () => {
  return (
    <div className="container mx-auto py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: i * 0.08, // stagger effect
              ease: "easeOut",
            }}
          >
            <ProductSkeleton />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LoadingPage;
