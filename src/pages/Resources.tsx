
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const Resources = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Learning Resources</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Expand your quantum computing knowledge with these curated resources
            </p>
          </div>

          <Tabs defaultValue="tutorials" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tutorials">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle>Getting Started</CardTitle>
                    <CardDescription>Essential tutorials for beginners</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li>
                        <a href="#" className="block p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                          <h3 className="font-medium mb-1">Introduction to Quantum Computing</h3>
                          <p className="text-sm text-gray-400">
                            A beginner-friendly overview of quantum computing principles
                          </p>
                          <div className="mt-2 flex items-center text-blue-400 text-sm">
                            <span>Watch video</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </a>
                      </li>
                      
                      <li>
                        <a href="#" className="block p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                          <h3 className="font-medium mb-1">Quantum Bits (Qubits) Explained</h3>
                          <p className="text-sm text-gray-400">
                            Understanding the fundamental unit of quantum information
                          </p>
                          <div className="mt-2 flex items-center text-blue-400 text-sm">
                            <span>Read article</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </a>
                      </li>
                      
                      <li>
                        <a href="#" className="block p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                          <h3 className="font-medium mb-1">Entanglion Game Tutorial</h3>
                          <p className="text-sm text-gray-400">
                            Learn how to play Entanglion step-by-step
                          </p>
                          <div className="mt-2 flex items-center text-blue-400 text-sm">
                            <span>Watch video</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle>Advanced Concepts</CardTitle>
                    <CardDescription>Deeper dives into quantum mechanics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li>
                        <a href="#" className="block p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                          <h3 className="font-medium mb-1">Quantum Gates and Circuits</h3>
                          <p className="text-sm text-gray-400">
                            How quantum operations manipulate qubits
                          </p>
                          <div className="mt-2 flex items-center text-blue-400 text-sm">
                            <span>Read article</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </a>
                      </li>
                      
                      <li>
                        <a href="#" className="block p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                          <h3 className="font-medium mb-1">Quantum Entanglement</h3>
                          <p className="text-sm text-gray-400">
                            Understanding the phenomenon that inspired the game's name
                          </p>
                          <div className="mt-2 flex items-center text-blue-400 text-sm">
                            <span>Watch video</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </a>
                      </li>
                      
                      <li>
                        <a href="#" className="block p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                          <h3 className="font-medium mb-1">Quantum Algorithms</h3>
                          <p className="text-sm text-gray-400">
                            Exploring Shor's, Grover's, and other key algorithms
                          </p>
                          <div className="mt-2 flex items-center text-blue-400 text-sm">
                            <span>Read article</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="guides">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle>Game Strategy Guides</CardTitle>
                  <CardDescription>Master Entanglion with these expert tips</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <a href="#" className="block p-6 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                      <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Beginner Strategies</h3>
                      <p className="text-sm text-gray-400 mb-4">
                        Essential tips for new players to get started with Entanglion
                      </p>
                      <div className="flex items-center text-blue-400 text-sm">
                        <span>Read guide</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </a>
                    
                    <a href="#" className="block p-6 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                      <div className="bg-purple-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Advanced Tactics</h3>
                      <p className="text-sm text-gray-400 mb-4">
                        Take your game to the next level with these advanced strategies
                      </p>
                      <div className="flex items-center text-blue-400 text-sm">
                        <span>Read guide</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </a>
                    
                    <a href="#" className="block p-6 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                      <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Team Coordination</h3>
                      <p className="text-sm text-gray-400 mb-4">
                        How to effectively communicate and coordinate with your team
                      </p>
                      <div className="flex items-center text-blue-400 text-sm">
                        <span>Read guide</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </a>
                    
                    <a href="#" className="block p-6 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                      <div className="bg-red-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Common Pitfalls</h3>
                      <p className="text-sm text-gray-400 mb-4">
                        Avoid these common mistakes that cost players the game
                      </p>
                      <div className="flex items-center text-blue-400 text-sm">
                        <span>Read guide</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </a>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <h3 className="text-lg font-semibold mb-4">Downloadable Resources</h3>
                    <ul className="space-y-3">
                      <li>
                        <a href="#" className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <span>Entanglion Reference Card (PDF)</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <span>Strategy Guide (PDF)</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <span>Quantum Computing Glossary (PDF)</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="community">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle>Community Resources</CardTitle>
                    <CardDescription>Connect with other Entanglion players</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Forums</h3>
                      <p className="text-gray-400 mb-3">
                        Join discussions about strategies, rules clarifications, and share your experiences.
                      </p>
                      <a 
                        href="#" 
                        className="inline-flex items-center px-4 py-2 bg-white/10 rounded-lg hover:bg-white/15 transition-colors"
                      >
                        <span>Visit Forums</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Discord Server</h3>
                      <p className="text-gray-400 mb-3">
                        Chat in real-time, find game partners, and join scheduled events.
                      </p>
                      <a 
                        href="#" 
                        className="inline-flex items-center px-4 py-2 bg-white/10 rounded-lg hover:bg-white/15 transition-colors"
                      >
                        <span>Join Discord</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Social Media</h3>
                      <p className="text-gray-400 mb-3">
                        Follow us for news, updates, and community highlights.
                      </p>
                      <div className="flex space-x-3">
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/15 transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/15 transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/15 transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/15 transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle>Events & Tournaments</CardTitle>
                    <CardDescription>Join official Entanglion events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-white/10 rounded-lg">
                        <div className="text-xs font-medium text-blue-400 mb-2">UPCOMING EVENT</div>
                        <h3 className="text-lg font-semibold mb-1">Entanglion World Championship</h3>
                        <p className="text-sm text-gray-400 mb-3">
                          Join the annual tournament to crown the world's best Entanglion team!
                        </p>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">July 15-16, 2023</span>
                          <Button variant="outline" size="sm">
                            Register
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-white/10 rounded-lg">
                        <div className="text-xs font-medium text-green-400 mb-2">WEEKLY EVENT</div>
                        <h3 className="text-lg font-semibold mb-1">Beginner's Night</h3>
                        <p className="text-sm text-gray-400 mb-3">
                          Join our community mentors for guided games and learning sessions.
                        </p>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">Every Wednesday, 7 PM EST</span>
                          <Button variant="outline" size="sm">
                            Join
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-white/10 rounded-lg">
                        <div className="text-xs font-medium text-purple-400 mb-2">MONTHLY EVENT</div>
                        <h3 className="text-lg font-semibold mb-1">Challenge Mode Tournament</h3>
                        <p className="text-sm text-gray-400 mb-3">
                          Test your skills with special rule modifications and unique challenges.
                        </p>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">First Saturday each month</span>
                          <Button variant="outline" size="sm">
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Find Local Groups</h3>
                        <Button variant="outline" size="sm">
                          Search
                        </Button>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Find Entanglion players and organized events in your area by using our community map.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;
