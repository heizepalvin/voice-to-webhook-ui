
import React from 'react';
import { Mic } from 'lucide-react';

interface AudioLevelIndicatorProps {
  audioLevel: number;
  isRecording: boolean;
}

export const AudioLevelIndicator: React.FC<AudioLevelIndicatorProps> = ({
  audioLevel,
  isRecording
}) => {
  return (
    <div className="flex items-center justify-center space-x-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <Mic 
        className={`h-4 w-4 ${
          isRecording 
            ? audioLevel > 0.1 
              ? 'text-green-500' 
              : 'text-pink-500'
            : 'text-gray-400'
        } transition-colors duration-200`}
      />
      
      {/* 심플한 막대 그래프 */}
      <div className="flex items-end space-x-1">
        {[...Array(4)].map((_, index) => {
          const isActive = audioLevel > (index * 0.25);
          
          return (
            <div
              key={index}
              className={`w-1 rounded-full transition-all duration-150 ${
                isRecording && isActive
                  ? 'bg-pink-500'
                  : 'bg-gray-200'
              }`}
              style={{ 
                height: `${8 + (index * 4)}px`
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
