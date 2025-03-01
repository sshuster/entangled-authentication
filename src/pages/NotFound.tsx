
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10 max-w-md"
      >
        <div className="mb-6 flex items-center justify-center">
          <div className="relative">
            <div className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              404
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500/20 rounded-full filter blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/20 rounded-full filter blur-xl"></div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Quantum Entanglement Error</h1>
        <p className="text-gray-400 mb-8">
          The quantum state you're looking for appears to have collapsed or never existed in our universe.
        </p>
        
        <Link to="/">
          <Button
            className="px-6 py-3 bg-white text-black hover:bg-gray-200 transition-colors rounded-lg"
          >
            Return to Base Station
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
