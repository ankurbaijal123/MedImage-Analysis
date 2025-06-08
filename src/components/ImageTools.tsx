import React from 'react';
import { Move, Ruler, Circle, Compass } from 'lucide-react';

interface ToolButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const ToolButton: React.FC<ToolButtonProps> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-lg ${
      active ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    }`}
  >
    {children}
  </button>
);

interface ImageToolsProps {
  activeTool: string;
  onToolChange: (tool: string) => void;
}

const ImageTools: React.FC<ImageToolsProps> = ({ activeTool, onToolChange }) => {
  return (
    <div className="flex space-x-2">
      <ToolButton active={activeTool === 'pan'} onClick={() => onToolChange('pan')}>
        <Move className="w-5 h-5" />
      </ToolButton>
      <ToolButton active={activeTool === 'ruler'} onClick={() => onToolChange('ruler')}>
        <Ruler className="w-5 h-5" />
      </ToolButton>
      <ToolButton active={activeTool === 'circle'} onClick={() => onToolChange('circle')}>
        <Circle className="w-5 h-5" />
      </ToolButton>
      <ToolButton active={activeTool === 'angle'} onClick={() => onToolChange('angle')}>
        <Compass className="w-5 h-5" />
      </ToolButton>
    </div>
  );
};

export default ImageTools;