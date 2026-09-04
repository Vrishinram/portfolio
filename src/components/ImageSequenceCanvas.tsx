'use client';

import { useEffect, useRef, useCallback } from 'react';
import { MotionValue, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 110;

function getFramePath(index: number): string {
  const adjustedIndex = index + 10; // Frames start at 010
  const padded = String(adjustedIndex).padStart(3, '0');
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}/sequence/frame_${padded}_delay-0.066s.png`;
}

interface ImageSequenceCanvasProps {
  scrollYProgress: MotionValue<number>;
}

export default function ImageSequenceCanvas({ scrollYProgress }: ImageSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Find the closest loaded frame to a given index
  const getClosestLoadedImage = useCallback((targetIndex: number): { img: HTMLImageElement; index: number } | null => {
    const images = imagesRef.current;
    if (!images || images.length === 0) return null;

    // Direct match first
    const targetImg = images[targetIndex];
    if (targetImg && targetImg.complete && targetImg.naturalWidth > 0) {
      return { img: targetImg, index: targetIndex };
    }

    // Search outwards for the nearest available loaded frame
    let bestImg: HTMLImageElement | null = null;
    let bestDist = Infinity;
    let bestIndex = -1;

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (img && img.complete && img.naturalWidth > 0) {
        const dist = Math.abs(i - targetIndex);
        if (dist < bestDist) {
          bestDist = dist;
          bestImg = img;
          bestIndex = i;
        }
      }
    }

    return bestImg ? { img: bestImg, index: bestIndex } : null;
  }, []);

  const drawFrame = useCallback((targetIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const result = getClosestLoadedImage(targetIndex);
    if (!result) return;

    const { img, index: actualIndex } = result;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const targetWidth = Math.round(rect.width * dpr);
    const targetHeight = Math.round(rect.height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

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
    ctx.restore();

    lastDrawnFrameRef.current = actualIndex;
  }, [getClosestLoadedImage]);

  // Load images progressively and attach load listeners
  useEffect(() => {
    const images: HTMLImageElement[] = [];

    // Prioritize frame 0 immediately
    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    firstImg.onload = () => {
      drawFrame(currentFrameRef.current);
    };
    images.push(firstImg);

    // If already cached, draw immediately
    if (firstImg.complete && firstImg.naturalWidth > 0) {
      drawFrame(0);
    }

    // Load remaining frames
    for (let i = 1; i < FRAME_COUNT; i++) {
      const img = new Image();
      const frameIdx = i;
      img.src = getFramePath(frameIdx);
      img.onload = () => {
        // Redraw if this frame is closer to the currently requested frame than what's currently displayed
        const currentTarget = currentFrameRef.current;
        const lastDrawn = lastDrawnFrameRef.current;
        if (lastDrawn === null || Math.abs(frameIdx - currentTarget) < Math.abs(lastDrawn - currentTarget)) {
          drawFrame(currentTarget);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

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
