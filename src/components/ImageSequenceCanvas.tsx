'use client';

import { useEffect, useRef, useCallback } from 'react';
import { MotionValue, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 110;

function getFramePath(index: number): string {
  const adjustedIndex = index + 10; // Frames start at 010
  const padded = String(adjustedIndex).padStart(3, '0');
  return `/sequence/frame_${padded}_delay-0.066s.png`;
}

interface ImageSequenceCanvasProps {
  scrollYProgress: MotionValue<number>;
}

export default function ImageSequenceCanvas({ scrollYProgress }: ImageSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[index];

    if (!ctx || !img || !img.complete || img.naturalWidth === 0) return;

    // Set canvas size to match viewport
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

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

  // Preload all images
  useEffect(() => {
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      images.push(img);
    }

    imagesRef.current = images;

    // Draw first frame when loaded or immediately if cached
    if (images[0].complete) {
      drawFrame(0);
    } else {
      images[0].onload = () => drawFrame(0);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  // Listen to frame index changes
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    const rounded = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(latest)));
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
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}
