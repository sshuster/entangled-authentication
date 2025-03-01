
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const GameRules = () => {
  return (
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
  );
};

export default GameRules;
