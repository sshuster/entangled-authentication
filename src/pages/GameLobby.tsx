
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Game {
  id: number;
  name: string;
  status: string;
  creator_name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

const GameLobby = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [newGameName, setNewGameName] = useState("");
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
    // Get token from localStorage
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      toast.error("You must be logged in to access the game lobby");
      navigate("/login");
      return;
    }
    setToken(storedToken);
  }, [navigate]);

  // Fetch user's games
  const { data: gamesData, isLoading, error } = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      if (!token) return null;
      
      const response = await fetch("http://localhost:5000/api/games", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch games");
      }
      
      return response.json();
    },
    enabled: !!token,
  });

  // Create new game mutation
  const createGameMutation = useMutation({
    mutationFn: async (gameName: string) => {
      if (!token) throw new Error("Authentication required");
      
      const response = await fetch("http://localhost:5000/api/games", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: gameName,
          player_count: 4,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create game");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      toast.success("Game created successfully!");
      queryClient.invalidateQueries({ queryKey: ["games"] });
      setNewGameName("");
      navigate(`/play/${data.game.id}`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleCreateGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGameName.trim()) {
      toast.error("Please enter a game name");
      return;
    }
    createGameMutation.mutate(newGameName);
  };

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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Game Lobby</h1>
            <Button variant="outline" onClick={() => navigate("/profile")}>
              Back to Profile
            </Button>
          </div>

          {/* Create New Game */}
          <Card className="bg-white/5 border-white/10 mb-8">
            <CardHeader>
              <CardTitle>Create New Game</CardTitle>
              <CardDescription>Start a new Entanglion game session</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateGame} className="space-y-4">
                <div>
                  <Label htmlFor="game-name">Game Name</Label>
                  <Input
                    id="game-name"
                    value={newGameName}
                    onChange={(e) => setNewGameName(e.target.value)}
                    placeholder="Enter a name for your game"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <Button type="submit" disabled={createGameMutation.isPending}>
                  {createGameMutation.isPending ? "Creating..." : "Create Game"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Game List */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Your Games</CardTitle>
              <CardDescription>Join or resume your Entanglion games</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-12">Loading games...</div>
              ) : error ? (
                <div className="text-center py-12 text-red-400">
                  Error loading games: {error instanceof Error ? error.message : "Unknown error"}
                </div>
              ) : !gamesData || gamesData.games.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  You don't have any games yet. Create one to get started!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gamesData.games.map((game: Game) => (
                    <Card key={game.id} className="bg-white/10 hover:bg-white/15 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{game.name}</CardTitle>
                        <CardDescription>
                          Created by: {game.creator_name}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm">
                          <span>Status: 
                            <span className={
                              game.status === 'in_progress' ? ' text-green-400' :
                              game.status === 'waiting' ? ' text-yellow-400' :
                              game.status === 'completed' ? ' text-blue-400' : ''
                            }> {game.status.replace('_', ' ')}</span>
                          </span>
                          <span>Your role: {game.role.replace('_', ' ')}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Last updated: {new Date(game.updated_at).toLocaleString()}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="default"
                          className="w-full"
                          onClick={() => navigate(`/play/${game.id}`)}
                        >
                          {game.status === 'waiting' ? 'Join Game' : 
                           game.status === 'in_progress' ? 'Continue Game' : 
                           'View Game'}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default GameLobby;
