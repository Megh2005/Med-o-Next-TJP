import { BACKEND_URL } from "@/utils/constants";
import { UserButton } from "@clerk/clerk-react";
import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await axios.post(`${BACKEND_URL}/api/v1/auth/check-admin`, {
          token: localStorage.getItem("med-o-shop-token"),
        });

        if (res.data.success) {
          setIsAdmin(res.data.data.isAdmin);
        }
      } catch (error) {
        console.error(error);
      }
    }

    checkAdmin();
  }, []);

  const navVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="bg-white shadow-sm sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <Link
          to="/u/home"
          className="text-xl lg:text-2xl font-bold text-primary"
        >
          Med-o-Shop
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {isAdmin && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/admin" className="text-gray-600 hover:text-primary transition-colors">
                Admin Panel
              </Link>
            </motion.div>
          )}
        </nav>
        <div className="flex items-center space-x-4">
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-9 h-9 rounded-full",
                userButtonTrigger: "rounded-full ring-2 ring-primary/10 hover:ring-primary/30 transition-all",
                userButtonPopoverCard: "shadow-lg rounded-xl border border-gray-200",
                userButtonPopoverActions: "p-2",
                userButtonPopoverActionButton: "w-full px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors duration-200",
                userButtonPopoverActionButtonText: "font-medium",
                userButtonPopoverFooter: "hidden",
                userPreviewMainIdentifier: "font-semibold text-foreground",
                userPreviewSecondaryIdentifier: "text-sm text-muted-foreground",
                userPreviewAvatarContainer: "ring-2 ring-primary/10",
              },
            }}
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/u/cart" 
              className="text-gray-600 hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/5"
            >
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;