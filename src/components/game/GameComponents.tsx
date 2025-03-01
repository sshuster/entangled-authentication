
import React from "react";
import { motion } from "framer-motion";
import GameComponentsList from "./GameComponentsList";
import GameOnlineVersion from "./GameOnlineVersion";

const GameComponents = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <GameComponentsList />
      
      <div className="space-y-6">
        <motion.img 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          src="https://via.placeholder.com/600x400?text=Game+Components" 
          alt="Entanglion Game Components" 
          className="rounded-lg w-full h-auto shadow-lg mb-6"
        />
        
        <GameOnlineVersion />
      </div>
    </div>
  );
};

export default GameComponents;
