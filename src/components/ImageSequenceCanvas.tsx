'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 110;

function getFramePath(index: number): string {
  const adjustedIndex = index + 10; // Frames start at 010
  const padded = String(adjustedIndex).padStart(3, '0');
  return `/sequence/frame_${padded}_delay-0.066s.png`;
}

export default function ImageSequenceCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Scroll tracking scoped to the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Preload all images
  useEffect(() => {
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      images.push(img);
    }

    imagesRef.current = images;

    // Draw first frame when loaded
    images[0].onload = () => {
      drawFrame(0);
    };

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imagesRef.current[index];

    if (!canvas || !ctx || !img || !img.complete) return;

    // Set canvas size to match viewport
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Draw image covering the canvas (object-fit: cover behavior)
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = rect.width / rect.height;

    let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

    if (imgAspect > canvasAspect) {
      drawHeight = rect.height;
      drawWidth = drawHeight * imgAspect;
      drawX = (rect.width - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = rect.width;
      drawHeight = drawWidth / imgAspect;
      drawX = 0;
      drawY = (rect.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  // Listen to frame index changes
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    const rounded = Math.round(latest);
    if (rounded !== currentFrameRef.current) {
      currentFrameRef.current = rounded;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(rounded));
    }
  });

  // Handle resize
  useEffect(() => {
    const handleResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  return (
    <div
      ref={containerRef}
      style={{
        height: '400vh',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
}
