
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const PlayGame = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [targetLocation, setTargetLocation] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
    // Get token from localStorage
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      toast.error("You must be logged in to play");
      navigate("/login");
      return;
    }
    setToken(storedToken);
  }, [navigate]);

  // Fetch game data
  const { data: gameData, isLoading, error } = useQuery({
    queryKey: ["game", gameId],
    queryFn: async () => {
      if (!token) return null;
      
      const response = await fetch(`http://localhost:5000/api/games/${gameId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch game");
      }
      
      return response.json();
    },
    enabled: !!token && !!gameId,
  });

  // Join game mutation
  const joinGameMutation = useMutation({
    mutationFn: async () => {
      if (!token) throw new Error("Authentication required");
      
      const response = await fetch(`http://localhost:5000/api/games/${gameId}/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to join game");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast.success("Successfully joined the game!");
      queryClient.invalidateQueries({ queryKey: ["game", gameId] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Start game mutation
  const startGameMutation = useMutation({
    mutationFn: async () => {
      if (!token) throw new Error("Authentication required");
      
      const response = await fetch(`http://localhost:5000/api/games/${gameId}/start`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to start game");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast.success("Game started successfully!");
      queryClient.invalidateQueries({ queryKey: ["game", gameId] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Make move mutation
  const makeMoveMutation = useMutation({
    mutationFn: async (moveData: { action: string; target?: string }) => {
      if (!token) throw new Error("Authentication required");
      
      const response = await fetch(`http://localhost:5000/api/games/${gameId}/move`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(moveData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to make move");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast.success("Move successful!");
      queryClient.invalidateQueries({ queryKey: ["game", gameId] });
      setSelectedAction(null);
      setTargetLocation(null);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleJoinGame = () => {
    joinGameMutation.mutate();
  };

  const handleStartGame = () => {
    startGameMutation.mutate();
  };

  const handleSelectAction = (action: string) => {
    setSelectedAction(action);
  };

  const handleSelectLocation = (location: string) => {
    setTargetLocation(location);
  };

  const handleMakeMove = () => {
    if (!selectedAction) {
      toast.error("Please select an action first");
      return;
    }

    const moveData: { action: string; target?: string } = {
      action: selectedAction,
    };

    if (selectedAction === "move" && targetLocation) {
      moveData.target = targetLocation;
    }

    makeMoveMutation.mutate(moveData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl">Loading game data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-24">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-red-400">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Failed to load game data: {error instanceof Error ? error.message : "Unknown error"}</p>
            </CardContent>
            <CardFooter>
              <Button variant="default" onClick={() => navigate("/profile")}>
                Return to Profile
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  const game = gameData?.game;
  if (!game) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-24">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Game Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The game you're looking for doesn't exist or you don't have access to it.</p>
            </CardContent>
            <CardFooter>
              <Button variant="default" onClick={() => navigate("/profile")}>
                Return to Profile
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  // Check if the current user is part of the game
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentPlayerId = currentUser.id;
  const isPlayerInGame = game.players.some((player: any) => player.id === currentPlayerId);
  const isGameCreator = game.data.players[0].id === currentPlayerId;
  const gameStatus = game.status;

  // Render different UI based on game state
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
          className="max-w-6xl mx-auto"
        >
          {/* Game Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{game.name}</h1>
            <div className="flex items-center text-gray-400 space-x-4">
              <span>Status: <span className={
                gameStatus === 'in_progress' ? 'text-green-400' :
                gameStatus === 'waiting' ? 'text-yellow-400' :
                gameStatus === 'completed' ? 'text-blue-400' : 'text-gray-400'
              }>{gameStatus.replace('_', ' ')}</span></span>
              <span>Created by: {game.creator_name}</span>
              <span>Players: {game.players.length}/{game.data.player_count}</span>
            </div>
          </div>

          {/* Game Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Game Board */}
            <div className="lg:col-span-2">
              <Card className="bg-white/5 border-white/10 h-full">
                <CardHeader>
                  <CardTitle>Quantum Board</CardTitle>
                  <CardDescription>Navigate through the quantum realm</CardDescription>
                </CardHeader>
                <CardContent>
                  {!isPlayerInGame && gameStatus === 'waiting' ? (
                    <div className="text-center py-12">
                      <h3 className="text-xl font-semibold mb-4">You're not part of this game yet</h3>
                      <Button onClick={handleJoinGame} disabled={joinGameMutation.isPending}>
                        {joinGameMutation.isPending ? "Joining..." : "Join Game"}
                      </Button>
                    </div>
                  ) : gameStatus === 'waiting' ? (
                    <div className="text-center py-12">
                      <h3 className="text-xl font-semibold mb-4">Waiting for more players to join</h3>
                      {isGameCreator && (
                        <Button onClick={handleStartGame} disabled={startGameMutation.isPending || game.players.length < 2}>
                          {startGameMutation.isPending ? "Starting..." : "Start Game"}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="relative">
                      {/* Game board visualization */}
                      <div className="aspect-square bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg border border-white/10 p-4 relative">
                        {/* Game board sectors */}
                        <div className="grid grid-cols-3 grid-rows-3 gap-2 h-full">
                          {['sector_a', 'sector_b', 'sector_c', 'sector_d', 'start', 'sector_e', 'sector_f', 'sector_g', 'sector_h'].map((sector, index) => (
                            <div 
                              key={sector}
                              className={`
                                border border-white/20 rounded-md flex items-center justify-center p-2
                                ${targetLocation === sector ? 'bg-blue-500/30 border-blue-400' : 'hover:bg-white/5'}
                                ${sector === 'start' ? 'bg-green-900/20' : ''}
                                cursor-pointer transition-colors
                              `}
                              onClick={() => handleSelectLocation(sector)}
                            >
                              <div className="text-center">
                                <div className="font-medium">{sector.replace('_', ' ')}</div>
                                
                                {/* Show particles in this sector */}
                                {game.data.quantum_particles
                                  .filter((particle: any) => particle.position === sector)
                                  .map((particle: any) => (
                                    <div 
                                      key={particle.id} 
                                      className="inline-block m-1 w-4 h-4 rounded-full bg-purple-500"
                                      title={`${particle.type}`}
                                    />
                                  ))
                                }
                                
                                {/* Show players in this sector */}
                                <div className="flex justify-center mt-2 space-x-1">
                                  {game.data.players
                                    .filter((player: any) => player.position === sector)
                                    .map((player: any, playerIndex: number) => (
                                      <div 
                                        key={playerIndex}
                                        className={`
                                          w-6 h-6 rounded-full flex items-center justify-center text-xs
                                          ${player.id === currentPlayerId ? 'bg-blue-500' : 'bg-red-500'}
                                        `}
                                        title={player.name}
                                      >
                                        {player.name.charAt(0)}
                                      </div>
                                    ))
                                  }
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Action buttons for in-progress games */}
                      {gameStatus === 'in_progress' && (
                        <div className="mt-4 flex space-x-2">
                          <Button 
                            variant={selectedAction === 'move' ? 'default' : 'outline'} 
                            onClick={() => handleSelectAction('move')}
                          >
                            Move
                          </Button>
                          <Button 
                            variant={selectedAction === 'use_quantum_gate' ? 'default' : 'outline'} 
                            onClick={() => handleSelectAction('use_quantum_gate')}
                          >
                            Use Quantum Gate
                          </Button>
                          <Button 
                            variant={selectedAction === 'end_turn' ? 'default' : 'outline'} 
                            onClick={() => handleSelectAction('end_turn')}
                          >
                            End Turn
                          </Button>
                          <Button 
                            onClick={handleMakeMove} 
                            disabled={makeMoveMutation.isPending || !selectedAction || (selectedAction === 'move' && !targetLocation)}
                          >
                            {makeMoveMutation.isPending ? "Processing..." : "Submit Move"}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Right Panel - Game Info */}
            <div>
              <div className="space-y-6">
                {/* Players */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle>Players</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {game.players.map((player: any, index: number) => {
                        // Find more detailed player info from game data
                        const playerData = game.data.players.find((p: any) => p.id === player.id);
                        
                        return (
                          <li 
                            key={index} 
                            className={`
                              flex items-center justify-between p-2 rounded-md
                              ${player.id === currentPlayerId ? 'bg-blue-900/30 border border-blue-500/50' : 'bg-white/5'}
                            `}
                          >
                            <div>
                              <div className="font-medium">{player.name}</div>
                              <div className="text-sm text-gray-400">Role: {player.role.replace('_', ' ')}</div>
                              {playerData && (
                                <div className="text-sm text-gray-400">
                                  Position: {playerData.position.replace('_', ' ')}
                                </div>
                              )}
                            </div>
                            {playerData && playerData.collected_particles.length > 0 && (
                              <div className="flex">
                                {playerData.collected_particles.map((particle: any, i: number) => (
                                  <div 
                                    key={i}
                                    className="w-4 h-4 rounded-full bg-purple-500 mx-1"
                                    title={particle.type}
                                  />
                                ))}
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Game Events */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle>Game Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 overflow-y-auto pr-2 space-y-2">
                      {game.data.events.length === 0 ? (
                        <p className="text-gray-400">No events yet</p>
                      ) : (
                        game.data.events.map((event: any, index: number) => (
                          <div key={index} className="border-b border-white/10 pb-2 last:border-0">
                            <div className="text-sm text-gray-400">
                              {new Date(event.timestamp).toLocaleTimeString()}
                            </div>
                            <div className="text-sm">
                              {event.type === 'game_start' && 'Game started by ' + event.description.split('by ')[1]}
                              {event.type === 'particle_collected' && `${event.player_name} collected a ${event.particle_type}`}
                              {event.type === 'quantum_gate_used' && `${event.player_name} used a quantum gate`}
                              {event.type === 'turn_ended' && `${event.player_name} ended their turn. ${event.next_player}'s turn now.`}
                              {event.type === 'game_completed' && `Game completed! Winner: ${event.winner_name}`}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Game Status */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle>Game Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Particles Remaining:</span>
                        <span>{game.data.quantum_particles.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Turn:</span>
                        <span>
                          {game.data.players[game.data.current_turn]?.name || 'Not started'}
                        </span>
                      </div>
                      {gameStatus === 'completed' && game.data.winner && (
                        <div className="mt-4 text-center">
                          <div className="text-xl font-bold text-yellow-400">
                            Game Over! Winner: {game.data.players.find((p: any) => p.id === game.data.winner)?.name}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => navigate("/profile")}>
                      Back to Profile
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlayGame;
