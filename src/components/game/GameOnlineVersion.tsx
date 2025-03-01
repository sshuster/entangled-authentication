
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GameOnlineVersion = () => {
  return (
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
  );
};

export default GameOnlineVersion;
