
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

// Mock user data (in a real app, this would come from the backend)
const mockUserData = {
  name: "Alex Johnson",
  email: "alex@example.com",
  joinDate: "2023-03-15",
  gamesPlayed: 12,
  achievements: [
    { id: 1, name: "First Login", description: "Logged into the system for the first time", date: "2023-03-15" },
    { id: 2, name: "Quantum Novice", description: "Completed your first game", date: "2023-03-20" },
    { id: 3, name: "Entanglement Master", description: "Won 5 games in a row", date: "2023-04-10" },
  ],
  savedGames: [
    { id: 101, date: "2023-05-12", players: ["Alex", "Jamie"], status: "In Progress" },
    { id: 102, date: "2023-06-03", players: ["Alex", "Sam", "Taylor"], status: "Completed" },
  ]
};

const Profile = () => {
  const [userData, setUserData] = useState(mockUserData);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Simulate fetching user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // In a real app, this would be a fetch to your backend
        // const response = await fetch("/api/user/profile");
        // const data = await response.json();
        // setUserData(data);
        
        // Simulate API delay
        setTimeout(() => {
          setUserData(mockUserData);
          setIsLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error",
          description: "Failed to load user data",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [toast]);

  const handleLogout = () => {
    // In a real app, this would call your logout API
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-2 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

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
              <li>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
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
          <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {userData.name}</h1>
              <p className="text-gray-400">Member since {new Date(userData.joinDate).toLocaleDateString()}</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="self-start md:self-auto">
              Logout
            </Button>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="saved-games">Saved Games</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm text-gray-400">Name</dt>
                        <dd>{userData.name}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-400">Email</dt>
                        <dd>{userData.email}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-400">Member Since</dt>
                        <dd>{new Date(userData.joinDate).toLocaleDateString()}</dd>
                      </div>
                      <div className="pt-4">
                        <Button variant="outline" size="sm">
                          Edit Profile
                        </Button>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle>Game Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm text-gray-400">Games Played</dt>
                        <dd className="text-4xl font-bold">{userData.gamesPlayed}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-400">Achievements Unlocked</dt>
                        <dd className="text-4xl font-bold">{userData.achievements.length}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-400">Saved Games</dt>
                        <dd className="text-4xl font-bold">{userData.savedGames.length}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="achievements">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                  <CardDescription>Track your progress in Entanglion</CardDescription>
                </CardHeader>
                <CardContent>
                  {userData.achievements.length > 0 ? (
                    <ul className="space-y-4">
                      {userData.achievements.map((achievement) => (
                        <motion.li 
                          key={achievement.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-start space-x-4 p-4 bg-white/10 rounded-lg"
                        >
                          <div className="bg-blue-500/20 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium">{achievement.name}</h3>
                            <p className="text-gray-400 text-sm mt-1">{achievement.description}</p>
                            <p className="text-xs text-gray-500 mt-2">Unlocked on {new Date(achievement.date).toLocaleDateString()}</p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <p>No achievements yet. Start playing to earn them!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="saved-games">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle>Your Saved Games</CardTitle>
                  <CardDescription>Resume your quantum adventures</CardDescription>
                </CardHeader>
                <CardContent>
                  {userData.savedGames.length > 0 ? (
                    <div className="space-y-4">
                      {userData.savedGames.map((game) => (
                        <motion.div 
                          key={game.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 bg-white/10 rounded-lg"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">Game #{game.id}</h3>
                              <p className="text-gray-400 text-sm mt-1">
                                Players: {game.players.join(", ")}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Started on {new Date(game.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                game.status === "In Progress" ? "bg-green-500" : "bg-blue-500"
                              }`}></span>
                              <span className="text-sm">{game.status}</span>
                            </div>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <Button variant="outline" size="sm">
                              {game.status === "In Progress" ? "Resume Game" : "View Game"}
                            </Button>
                            {game.status === "In Progress" && (
                              <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300">
                                Delete
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <p>No saved games. Start a new game to see it here!</p>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <Button>
                      Start New Game
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
