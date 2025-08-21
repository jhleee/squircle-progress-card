import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PauseIcon } from './icons';

// Keyframes are injected into the document head for the blob animation.
const KEYFRAMES = `
  @keyframes move-blob-1 {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.2); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  @keyframes move-blob-2 {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(-30px, 30px) scale(1.1); }
    66% { transform: translate(40px, -10px) scale(0.8); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
`;

const SquircleProgress: React.FC<{ progress: number; isPaused: boolean; onTogglePause: () => void; }> = ({ progress, isPaused, onTogglePause }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  const prevProgressRef = useRef<number>(progress);
  useEffect(() => {
    prevProgressRef.current = progress;
  });
  const prevProgress = prevProgressRef.current;
  const hasJumped = prevProgress > 95 && progress < 5;

  const SQUIRCLE_PATH = "M 50,10 C 20,10 10,20 10,50 C 10,80 20,90 50,90 C 80,90 90,80 90,50 C 90,20 80,10 50,10 Z";

  const squircleMaskUrl = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="${SQUIRCLE_PATH}" fill="black"/></svg>')`;

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }

    // Avoid adding multiple style elements if component re-renders
    if (!document.getElementById('squircle-keyframes')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'squircle-keyframes';
        styleElement.innerHTML = KEYFRAMES;
        document.head.appendChild(styleElement);
    }
  }, []);

  const strokeDashoffset = pathLength - (pathLength * progress) / 100;
  const transitionDuration = hasJumped ? '0s' : '0.2s';

  return (
    <div className="relative w-40 h-40">
      <svg viewBox="0 0 100 100" className="absolute w-full h-full -rotate-90">
        <path
          d={SQUIRCLE_PATH}
          className="stroke-gray-200"
          strokeWidth="4"
          fill="none"
        />
        <path
          ref={pathRef}
          d={SQUIRCLE_PATH}
          className="stroke-black"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: strokeDashoffset,
            transition: `stroke-dashoffset ${transitionDuration} linear`
          }}
        />
      </svg>
      <div
        onClick={onTogglePause}
        className="absolute inset-0 m-auto w-[148px] h-[148px] cursor-pointer"
        style={{
          maskImage: squircleMaskUrl,
          WebkitMaskImage: squircleMaskUrl,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
        }}
      >
        <div className="relative w-full h-full">
          {/* Animated Blobs Background */}
          <div
            className="absolute inset-0 filter blur-xl transition-opacity duration-300"
            style={{ opacity: isPaused ? 0.3 : 0.7 }}
          >
            <div
              className="absolute top-0 left-0 w-3/4 h-3/4 bg-cyan-300 rounded-full"
              style={{ animation: 'move-blob-1 15s infinite alternate ease-in-out' }}
            />
            <div
              className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-fuchsia-300 rounded-full"
              style={{ animation: 'move-blob-2 18s infinite alternate ease-in-out' }}
            />
          </div>

          {/* Icon Layer */}
          <div className="relative w-full h-full flex items-center justify-center bg-white/5 backdrop-blur-sm">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="text-gray-800 opacity-80"
            >
              {isPaused ? <PlayIcon /> : <PauseIcon />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquircleProgress;