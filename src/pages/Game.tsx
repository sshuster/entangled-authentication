
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

import Header from "@/components/layout/Header";
import GameHero from "@/components/game/GameHero";
import GameOverview from "@/components/game/GameOverview";
import GameRules from "@/components/game/GameRules";
import GameComponents from "@/components/game/GameComponents";

const Game = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Header />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <GameHero />

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <GameOverview />
            </TabsContent>
            
            <TabsContent value="rules">
              <GameRules />
            </TabsContent>
            
            <TabsContent value="components">
              <GameComponents />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Game;
