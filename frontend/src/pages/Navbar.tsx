import { Link } from "react-router-dom";
import img1 from "../assets/ez-logo.jpg";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdAddBusiness } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { RiLogoutBoxRFill } from "react-icons/ri";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-[#1f4470] p-2 flex justify-between items-center text-white">
        <Link to='profile'>
          <img src={img1} className="w-12 h-12" />
        </Link>

        <div className="lg:text-4xl text-2xl font-bold">DashBoard</div>

        <div className="hidden md:flex space-x-6 text-lg">
          <div className="flex items-center gap-1">
          <Link to="/" className="hover:text-gray-300">
            Dashboard
          </Link>
          </div>
          <Link to="/additem" className="hover:text-gray-300">
            Add Item
          </Link>
          <Link to="/logout" className="hover:text-gray-300">
            Logout
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl transition-transform transform hover:scale-110"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-3/4 h-screen bg-[#1f4470] shadow-lg flex flex-col p-6 space-y-6 z-50"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-3xl self-end hover:rotate-90 transition-transform"
            >
              <FiX />
            </button>

            {/* Logo (Remains Visible) */}
            <motion.img
              src={img1}
              className="w-16 h-16 mx-auto rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            />
            <div className="h-[0.5px] w-full bg-black"></div>

            {/* Navigation Links with Slight Delay */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex flex-col  space-y-4"
            >
              <div className="flex items-center gap-1">
              <IoHome />
              <Link
                to="/"
                className="text-xl hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              </div>
              <div className="h-[0.5px] w-full bg-black"></div>
              <div className="flex items-center gap-1">
              <MdAddBusiness />
              <Link
                to="/additem"
                className="text-xl hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Add Item
              </Link>
              </div>
              <div className="h-[0.5px] w-full bg-black"></div>
              <div className="flex items-center gap-1">
              <RiLogoutBoxRFill />
              <Link
                to="/logout"
                className="text-xl hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Logout
              </Link>
              </div>
              <div className="h-[0.5px] w-full bg-black"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
