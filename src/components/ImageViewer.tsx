import React, { useState, useCallback } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import ImageTools from './ImageTools';
import Canvas from './Canvas';

interface ImageViewerProps {
  imageUrl: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl }) => {
  const [tool, setTool] = useState<string>('pan');
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [scale, setScale] = useState<number>(1);

  const handleToolChange = useCallback((newTool: string) => {
    setTool(newTool);
    //Changes current tool when user selects Pan, Ruler, Circle, or Angle.

  }, []);

  return (
    <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden">
      <div className="absolute top-4 left-4 z-20">
        <ImageTools activeTool={tool} onToolChange={handleToolChange} />
      </div>

      <div className="absolute top-4 right-4 z-20 flex flex-col space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <label className="block text-gray-300 text-sm mb-2">Brightness</label>
          <input
            type="range"
            min="0"
            max="200"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full"
          />
          <label className="block text-gray-300 text-sm mb-2 mt-4">Contrast</label>
          <input
            type="range"
            min="0"
            max="200"
            value={contrast}
            onChange={(e) => setContrast(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <TransformWrapper
        onZoom={({ state }) => setScale(state.scale)}
        disabled={tool !== 'pan'}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="absolute bottom-4 right-4 z-20 flex space-x-2">
              <button
                onClick={() => zoomIn()}
                className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={() => zoomOut()}
                className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={() => resetTransform()}
                className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
            <TransformComponent>
              <div className="relative">
                <img
                  src={imageUrl}
                  alt="Medical scan"
                  style={{
                    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                />
                <Canvas tool={tool} imageUrl={imageUrl} scale={scale} />
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default ImageViewer;