
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const GameHero = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 text-center"
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-4">The Quantum Computing Board Game</h1>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
        Explore the principles of quantum computing through strategic and collaborative gameplay.
      </p>
      <div className="mt-6 flex justify-center space-x-4">
        <Link to="/games">
          <Button size="lg">
            Play Online Now
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="outline" size="lg">
            Sign Up
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default GameHero;
