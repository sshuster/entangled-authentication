
import React from "react";

interface GameComponentItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

const GameComponentItem = ({ icon, title, description, bgColor, iconColor }: GameComponentItemProps) => {
  return (
    <li className="flex items-start space-x-3">
      <div className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
        <div className={iconColor}>{icon}</div>
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </li>
  );
};

export default GameComponentItem;
