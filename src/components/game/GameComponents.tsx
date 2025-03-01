
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const GameComponents = () => {
  return (
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
  );
};

export default GameComponents;
