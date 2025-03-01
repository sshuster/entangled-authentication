
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
    // Get token from localStorage
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      toast.error("You must be logged in to view your profile");
      navigate("/login");
      return;
    }
    setToken(storedToken);
  }, [navigate]);

  // Fetch user data
  const { data: userData, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!token) return null;
      
      const response = await fetch("http://localhost:5000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      
      return response.json();
    },
    enabled: !!token,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl text-red-500">Error: {error instanceof Error ? error.message : "Unknown error"}</div>
      </div>
    );
  }

  const user = userData?.user;

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
                <Link to="/profile">Profile</Link>
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
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Profile</h1>
            <p className="text-xl text-gray-400">Welcome to your Entanglion dashboard</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* User Info */}
            <div className="md:col-span-1">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle>Account Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm text-gray-400">Name</h3>
                    <p className="text-lg">{user?.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400">Email</h3>
                    <p className="text-lg">{user?.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400">Member Since</h3>
                    <p className="text-lg">{new Date(user?.created_at).toLocaleDateString()}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={handleLogout}>
                    Logout
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Game Info */}
            <div className="md:col-span-2">
              <Card className="bg-white/5 border-white/10 mb-6">
                <CardHeader>
                  <CardTitle>Play Entanglion</CardTitle>
                  <CardDescription>Join or create game sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Entanglion is a cooperative board game designed to teach quantum computing concepts through gameplay. 
                    Play with friends online and explore the quantum realm together!
                  </p>
                </CardContent>
                <CardFooter className="flex gap-4">
                  <Button className="flex-1" onClick={() => navigate("/games")}>
                    Game Lobby
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => navigate("/game")}>
                    Learn the Rules
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle>Quantum Knowledge</CardTitle>
                  <CardDescription>Expand your understanding of quantum computing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Learning Resources</h3>
                      <p className="text-sm text-gray-300">
                        Explore our curated collection of quantum computing resources
                      </p>
                      <Button variant="link" className="px-0 mt-2" asChild>
                        <Link to="/resources">Browse Resources</Link>
                      </Button>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Game Instructions</h3>
                      <p className="text-sm text-gray-300">
                        Learn how to play Entanglion with our comprehensive rules
                      </p>
                      <Button variant="link" className="px-0 mt-2" asChild>
                        <Link to="/game">View Rules</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
