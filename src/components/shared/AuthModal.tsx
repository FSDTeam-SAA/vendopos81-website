"use client";
import { AnimatePresence, motion } from "framer-motion";
import { LogIn, LogOut, TriangleAlert, UserPlus, X } from "lucide-react"; // icons
import Link from "next/link";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  noNeed?: boolean; // when true → logout modal
  onLogout?: () => void;
}

const AuthModal = ({
  isOpen,
  onClose,
  noNeed = false,
  onLogout,
}: AuthModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 30, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
          >
            <X size={20} />
          </button>

          {/* CONTENT */}
          {!noNeed ? (
            <>
              {/* Not Logged In */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-center"
              >
                <h2 className="text-xl font-bold text-gray-800">
                  You’re not logged in
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Please create an account or log in to continue.
                </p>

                <div className="mt-6 flex justify-center gap-3">
                  <Link
                    href="/login"
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 rounded-md  bg-primary py-2.5 text-center text-sm font-semibold text-white hover:bg-primary/90 transition transform hover:scale-105"
                  >
                    <LogIn className="w-5 h-5" /> Login
                  </Link>

                  <Link
                    href="/signup"
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 rounded-md  border border-gray-300 py-2.5 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50 transition transform hover:scale-105"
                  >
                    <UserPlus className="w-5 h-5" /> Sign Up
                  </Link>
                </div>
              </motion.div>
            </>
          ) : (
            <>
              {/* Logout */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="my-3 flex items-start ml-2">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute h-16 w-16 rounded-full bg-red-100 opacity-50"></div>
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                      <TriangleAlert className="h-6 w-6 text-red-500" />
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Are You Sure?
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Are you sure you want to logout?
                </p>

                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition transform hover:scale-105"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 rounded-md bg-[#e5102e] py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition transform hover:scale-105"
                  >
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
