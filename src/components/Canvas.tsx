import React, { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface CanvasProps {
  tool: string;
  imageUrl: string;
  scale: number;
}

const Canvas: React.FC<CanvasProps> = ({ tool, scale }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [midPoint, setMidPoint] = useState<Point | null>(null);
  const [measurements, setMeasurements] = useState<Array<{
    type: string;
    points: Point[];
    measurement?: string;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size to match container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and redraw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all saved measurements
    measurements.forEach((m) => drawMeasurement(ctx, m));

    // Draw current measurement if drawing
    if (drawing && startPoint) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.beginPath();

      if (tool === 'angle' && midPoint) {
        drawAngle(ctx, startPoint, midPoint, { x: startPoint.x, y: startPoint.y });
      } else if (tool === 'circle') {
        drawCircle(ctx, startPoint, { x: startPoint.x + 1, y: startPoint.y });
      } else {
        drawLine(ctx, startPoint, { x: startPoint.x + 1, y: startPoint.y });
      }
      ctx.stroke();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [drawing, measurements, scale, startPoint, midPoint, tool]);

  const drawMeasurement = (ctx: CanvasRenderingContext2D, measurement: any) => {
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();

    switch (measurement.type) {
      case 'ruler':
        drawLine(ctx, measurement.points[0], measurement.points[1]);
        break;
      case 'circle':
        drawCircle(ctx, measurement.points[0], measurement.points[1]);
        break;
      case 'angle':
        drawAngle(ctx, measurement.points[0], measurement.points[1], measurement.points[2]);
        break;
    }
  };

  const drawLine = (ctx: CanvasRenderingContext2D, start: Point, end: Point) => {
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    // Draw measurement text
    const distance = Math.sqrt(
      Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
    );
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;

    ctx.font = '14px Arial';
    ctx.fillStyle = '#3b82f6';
    ctx.fillText(`${distance.toFixed(1)}px`, midX + 5, midY - 5);
  };

  const drawCircle = (ctx: CanvasRenderingContext2D, center: Point, radiusPoint: Point) => {
    const radius = Math.sqrt(
      Math.pow(radiusPoint.x - center.x, 2) + Math.pow(radiusPoint.y - center.y, 2)
    );
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw radius measurement
    ctx.font = '14px Arial';
    ctx.fillStyle = '#3b82f6';
    ctx.fillText(`r: ${radius.toFixed(1)}px`, center.x + radius + 5, center.y);
  };

  const drawAngle = (ctx: CanvasRenderingContext2D, p1: Point, p2: Point, p3: Point) => {
    drawLine(ctx, p1, p2);
    drawLine(ctx, p2, p3);

    // Calculate and draw angle
    const angle = calculateAngle(p1, p2, p3);
    ctx.font = '14px Arial';
    ctx.fillStyle = '#3b82f6';
    ctx.fillText(`${angle.toFixed(1)}°`, p2.x + 10, p2.y + 10);
  };

  const calculateAngle = (p1: Point, p2: Point, p3: Point): number => {
    // Convert points to vectors
    const vectorA = { x: p1.x - p2.x, y: p1.y - p2.y };
    const vectorB = { x: p3.x - p2.x, y: p3.y - p2.y };
  
    // Calculate the dot product and magnitudes of the vectors
    const dotProduct = vectorA.x * vectorB.x + vectorA.y * vectorB.y;
    const magnitudeA = Math.sqrt(vectorA.x ** 2 + vectorA.y ** 2);
    const magnitudeB = Math.sqrt(vectorB.x ** 2 + vectorB.y ** 2);
  
    // Use the dot product formula to calculate the angle in radians
    const angleRad = Math.acos(dotProduct / (magnitudeA * magnitudeB));
  
    // Convert radians to degrees
    return (angleRad * 180) / Math.PI;
  };
  

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    if (tool === 'angle' && startPoint && !midPoint) {
      setMidPoint({ x, y });
    } else {
      setStartPoint({ x, y });
      setDrawing(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !canvasRef.current || tool === 'pan') return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx || !startPoint) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    measurements.forEach((m) => drawMeasurement(ctx, m));

    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();

    if (tool === 'angle' && midPoint) {
      drawAngle(ctx, startPoint, midPoint, { x, y });
    } else if (tool === 'circle') {
      drawCircle(ctx, startPoint, { x, y });
    } else {
      drawLine(ctx, startPoint, { x, y });
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !startPoint || tool === 'pan') return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    if (tool === 'angle' && midPoint) {
      setMeasurements([
        ...measurements,
        { type: 'angle', points: [startPoint, midPoint, { x, y }] },
      ]);
      setStartPoint(null);
      setMidPoint(null);
    } else {
      setMeasurements([
        ...measurements,
        { type: tool, points: [startPoint, { x, y }] },
      ]);
    }

    setDrawing(false);
    setStartPoint(null);
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-auto"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ cursor: tool === 'pan' ? 'grab' : 'crosshair' }}
    />
  );
};

export default Canvas;