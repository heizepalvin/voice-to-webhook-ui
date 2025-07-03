
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Mic } from 'lucide-react';

interface AudioLevelIndicatorProps {
  audioLevel: number;
  isRecording: boolean;
}

export const AudioLevelIndicator: React.FC<AudioLevelIndicatorProps> = ({
  audioLevel,
  isRecording
}) => {
  const levelPercentage = audioLevel * 100;

  return (
    <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-4">
      <Mic 
        className={`h-5 w-5 ${
          isRecording 
            ? audioLevel > 0.1 
              ? 'text-green-500' 
              : 'text-pink-500'
            : 'text-gray-400'
        } transition-colors duration-200`}
      />
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">
            마이크 입력
          </span>
          <span className="text-xs text-gray-500">
            {isRecording ? `${Math.round(levelPercentage)}%` : '대기 중'}
          </span>
        </div>
        
        <Progress 
          value={levelPercentage} 
          className="h-2"
        />
      </div>
      
      {/* Visual bars representation */}
      <div className="flex items-end space-x-1">
        {[...Array(5)].map((_, index) => {
          const barHeight = Math.max(4, (audioLevel * 20) * (index + 1) / 5);
          const isActive = audioLevel > (index * 0.2);
          
          return (
            <div
              key={index}
              className={`w-1 rounded-full transition-all duration-100 ${
                isRecording && isActive
                  ? 'bg-gradient-to-t from-pink-400 to-pink-600'
                  : 'bg-gray-300'
              }`}
              style={{ 
                height: isRecording ? `${barHeight}px` : '4px',
                minHeight: '4px'
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
