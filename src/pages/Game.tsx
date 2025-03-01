import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const Game = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/70 border-b border-white/10">
        <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
          <Link to="/" className="text-2xl font-bold">Entanglion</Link>
          <nav>
            <ul className="flex space-x-6">
              <li className="hover:text-blue-300 transition-colors">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-blue-300 transition-colors">
                <Link to="/game">Game</Link>
              </li>
              <li className="hover:text-blue-300 transition-colors">
                <Link to="/resources">Resources</Link>
              </li>
              <li className="hover:text-blue-300 transition-colors">
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-12 text-center">
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
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
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
            </TabsContent>
            
            <TabsContent value="rules">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle>Game Rules</CardTitle>
                  <CardDescription>How to play Entanglion</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Objective</h3>
                    <p className="text-gray-300">
                      The goal is to work together to navigate your quantum spacecraft through the quantum realm,
                      collecting quantum particles and avoiding obstacles. Players must collaborate to build
                      quantum circuits that help solve computational challenges.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Setup</h3>
                    <ol className="space-y-3 text-gray-300 list-decimal list-inside">
                      <li>Place the game board in the center of the table</li>
                      <li>Shuffle the quantum event cards and place them face down</li>
                      <li>Each player chooses a quantum operator role</li>
                      <li>Place the spacecraft token on the starting position</li>
                      <li>Set challenge tokens based on the desired difficulty level</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Gameplay</h3>
                    <p className="text-gray-300">
                      Players take turns in clockwise order. On your turn:
                    </p>
                    <ol className="space-y-3 text-gray-300 list-decimal list-inside mt-2">
                      <li>Draw a quantum event card</li>
                      <li>Apply your quantum operator based on your role</li>
                      <li>Move the spacecraft token according to quantum rules</li>
                      <li>Resolve any effects of the space you land on</li>
                      <li>Collect quantum particles if available</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Winning</h3>
                    <p className="text-gray-300">
                      The team wins when they've collected all required quantum particles and returned
                      to the starting position before the quantum decoherence timer runs out.
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline">
                      Download Full Rulebook (PDF)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="components">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle>Game Components</CardTitle>
                    <CardDescription>What's in the box</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">1 Game Board</h3>
                          <p className="text-sm text-gray-400">Double-sided quantum realm map</p>
                        </div>
                      </li>
                      
                      <li className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">4 Player Tokens</h3>
                          <p className="text-sm text-gray-400">Representing different quantum operators</p>
                        </div>
                      </li>
                      
                      <li className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">60 Quantum Particle Tokens</h3>
                          <p className="text-sm text-gray-400">Representing qubits, gates, and other quantum resources</p>
                        </div>
                      </li>
                      
                      <li className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">1 Rulebook</h3>
                          <p className="text-sm text-gray-400">Complete instructions and quantum computing guide</p>
                        </div>
                      </li>
                      
                      <li className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">40 Quantum Event Cards</h3>
                          <p className="text-sm text-gray-400">Introducing challenges and quantum phenomena</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <div className="space-y-6">
                  <motion.img 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    src="https://via.placeholder.com/600x400?text=Game+Components" 
                    alt="Entanglion Game Components" 
                    className="rounded-lg w-full h-auto shadow-lg mb-6"
                  />
                  
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle>Online Version</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">
                        The digital version of Entanglion includes all physical components and additional features:
                      </p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Automated rules enforcement</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Interactive tutorials</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Online multiplayer with friends</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Save games in progress</span>
                        </li>
                      </ul>
                      
                      <div className="mt-6 flex space-x-4">
                        <Link to="/games">
                          <Button>
                            Play Online Now
                          </Button>
                        </Link>
                        <Link to="/login">
                          <Button variant="outline">
                            Sign Up
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Game;
