
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const GameOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <motion.img 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src="https://via.placeholder.com/600x400?text=Entanglion+Game+Board" 
          alt="Entanglion Game Board" 
          className="rounded-lg w-full h-auto shadow-lg"
        />
      </div>
      
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">About Entanglion</h2>
        <p className="text-gray-300">
          Entanglion is a cooperative board game designed to introduce the principles of quantum computing. 
          Players work together as a team to control a quantum spacecraft exploring the quantum realm.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Key Features</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>2-4 players collaborative experience</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>45-60 minutes playtime</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>No prior quantum knowledge required</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>Learn real quantum computing concepts while having fun</span>
          </li>
        </ul>
        
        <div className="mt-6">
          <Link to="/games">
            <Button>
              Play Online Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameOverview;
