import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerProps {
  totalTime: number;
  initialElapsed?: number;
  autoStart?: boolean;
}

export const useTimer = ({ totalTime, initialElapsed = 0, autoStart = true }: UseTimerProps) => {
  const [elapsedMs, setElapsedMs] = useState(initialElapsed);
  const [isPaused, setIsPaused] = useState(!autoStart);
  const intervalRef = useRef<number | null>(null);

  const progress = totalTime > 0 ? (elapsedMs / totalTime) * 100 : 0;
  const remainingMs = totalTime - elapsedMs;

  const cleanup = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = window.setInterval(() => {
        setElapsedMs(prev => {
          const next = prev + 1000;
          if (next >= totalTime) {
            // Loop the timer
            return 0;
          }
          return next;
        });
      }, 1000);
    } else {
      cleanup();
    }
    return cleanup;
  }, [isPaused, totalTime]);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  return { elapsedMs, remainingMs, progress, isPaused, togglePause };
};
