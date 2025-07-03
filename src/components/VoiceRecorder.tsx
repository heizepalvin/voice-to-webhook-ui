
import React from 'react';
import { Mic, Square, AudioWaveform } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AudioLevelIndicator } from '@/components/AudioLevelIndicator';
import { useAudioLevel } from '@/hooks/useAudioLevel';

interface VoiceRecorderProps {
  isRecording: boolean;
  transcribedText: string;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onClearText: () => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  isRecording,
  transcribedText,
  onStartRecording,
  onStopRecording,
  onClearText
}) => {
  const audioLevel = useAudioLevel(isRecording);

  return (
    <>
      {/* Audio Level Indicator */}
      <AudioLevelIndicator audioLevel={audioLevel} isRecording={isRecording} />

      {/* Recording Controls */}
      <div className="flex justify-center space-x-4">
        {!isRecording ? (
          <Button 
            onClick={onStartRecording}
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Mic className="mr-2 h-6 w-6" />
            음성 인식 시작
          </Button>
        ) : (
          <Button 
            onClick={onStopRecording}
            size="lg"
            variant="destructive"
            className="px-8 py-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Square className="mr-2 h-6 w-6" />
            인식 중지
          </Button>
        )}
      </div>

      {/* Recording Status */}
      {isRecording && (
        <div className="flex items-center justify-center space-x-2 text-pink-600">
          <AudioWaveform className="h-5 w-5 animate-pulse" />
          <span className="font-medium">음성을 듣고 있습니다...</span>
        </div>
      )}

      {/* Transcribed Text */}
      {transcribedText && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              변환된 텍스트
            </label>
            <div className="bg-gray-50 rounded-lg p-4 min-h-[100px] border">
              <p className="text-gray-800 whitespace-pre-wrap">{transcribedText}</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={onClearText}
              variant="outline"
              className="px-6 py-2"
            >
              텍스트 지우기
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
