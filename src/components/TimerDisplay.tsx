import React from 'react';

const formatTimeDetailed = (ms: number) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600).toString();
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const formatTimeRemaining = (ms: number) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60).toString();
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

interface TimerDisplayProps {
  remainingMs: number;
  totalMs: number;
  elapsedMs: number;
}

const TimeRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <p className="text-gray-400">{label}</p>
    <p className="font-mono font-medium text-gray-600 w-24 text-right">{value}</p>
  </div>
);

const TimerDisplay: React.FC<TimerDisplayProps> = ({ remainingMs, totalMs, elapsedMs }) => (
  <div className="flex flex-col items-end pl-8">
    <h2 className="text-6xl font-light tracking-tighter text-gray-800 font-mono">
      {formatTimeRemaining(remainingMs)}
    </h2>
    <div className="mt-6 space-y-2 text-right w-full">
      <TimeRow label="Total Time" value={formatTimeDetailed(totalMs)} />
      <TimeRow label="Passed Time" value={formatTimeDetailed(elapsedMs)} />
    </div>
  </div>
);

export default TimerDisplay;
