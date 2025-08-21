import React from 'react';
import { motion } from 'framer-motion';
import { useTimer } from '../hooks/useTimer';
import SquircleProgress from './SquircleProgress';
import CardHeader from './CardHeader';
import TimerDisplay from './TimerDisplay';
import CardFooter from './CardFooter';


const ProgressCard: React.FC = () => {
    const TOTAL_TIME_MS = 20 * 1000;
    const { elapsedMs, remainingMs, progress, isPaused, togglePause } = useTimer({ totalTime: TOTAL_TIME_MS });

  return (
    <>
      {/* Wrapper for the drop-shadow filter to prevent it from being clipped */}
      <div
        className="w-full max-w-md mx-auto "
        style={{ filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.08)) drop-shadow(0 0 15px rgba(160, 233, 255, 0.2))' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-white p-8 w-full rounded-[32px]"
        >
          <div className="flex flex-col">
              <CardHeader isPaused={isPaused} />

              <main className="flex items-center justify-between my-4">
                  <div className="flex-shrink-0">
                      <SquircleProgress progress={progress} isPaused={isPaused} onTogglePause={togglePause} />
                  </div>
                  <TimerDisplay remainingMs={remainingMs} totalMs={TOTAL_TIME_MS} elapsedMs={elapsedMs} />
              </main>

              <CardFooter />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ProgressCard;