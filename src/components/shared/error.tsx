"use client";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface ErrorPageProps {
  noNeed?: boolean;
}

const ErrorPage = ({ noNeed = false }: ErrorPageProps) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center max-w-md"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50"
        >
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </motion.div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">
          Something went wrong
        </h2>

        {/* Message */}
        <p className="mt-3 text-gray-500 text-sm md:text-base">
          We couldn’t load at the moment. Please try again later.
        </p>

        {/* Action (conditionally rendered) */}
        {!noNeed && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Refresh Page
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default ErrorPage;
