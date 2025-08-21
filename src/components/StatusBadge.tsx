import React from 'react';

const StatusBadge: React.FC<{ isPaused: boolean }> = ({ isPaused }) => {
    const statusText = isPaused ? "일시중지됨" : "이미지 생성중";
    const bgColor = isPaused ? "bg-gray-100" : "bg-purple-100";
    const textColor = isPaused ? "text-gray-600" : "text-purple-700";
    const dotColor = isPaused ? "bg-gray-400" : "bg-purple-500";
  
    return (
      <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${bgColor} ${textColor}`}>
        <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${dotColor} ${!isPaused ? 'animate-pulse' : ''}`}></span>
        <span>{statusText}</span>
      </div>
    );
};

export default StatusBadge;