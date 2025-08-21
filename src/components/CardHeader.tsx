import React from 'react';
import { LogoIcon } from './icons';
import StatusBadge from './StatusBadge';

interface CardHeaderProps {
  isPaused: boolean;
}

const CardHeader: React.FC<CardHeaderProps> = ({ isPaused }) => (
  <header className="flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <div className="bg-gray-900 p-2 rounded-xl text-white">
        <LogoIcon size={24} />
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold text-lg text-gray-800">Squircle Progress</h1>
        <p className="text-sm text-gray-400">@dev_sla x @levitopiary</p>
      </div>
    </div>
    <StatusBadge isPaused={isPaused} />
  </header>
);

export default CardHeader;
