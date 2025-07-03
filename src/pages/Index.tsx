
import React from 'react';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { WebhookSender } from '@/components/WebhookSender';
import { ShortcutGrid } from '@/components/ShortcutGrid';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useAutoSend } from '@/hooks/useAutoSend';

const Index = () => {
  const {
    isRecording,
    transcribedText,
    startRecording,
    stopRecording,
    clearText
  } = useSpeechRecognition();

  const {
    autoSendEnabled,
    toggleAutoSend
  } = useAutoSend();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">음성 단축어</h1>
          <p className="text-gray-600">음성을 텍스트로 변환하고 자동화하세요</p>
        </div>

        {/* Main Control Panel */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="space-y-6">
            <WebhookSender 
              transcribedText={transcribedText}
              onTextCleared={clearText}
              autoSendEnabled={autoSendEnabled}
              onToggleAutoSend={toggleAutoSend}
            />
            
            <VoiceRecorder
              isRecording={isRecording}
              transcribedText={transcribedText}
              onStartRecording={startRecording}
              onStopRecording={stopRecording}
              onClearText={clearText}
            />
          </div>
        </div>

        {/* Shortcuts Grid */}
        <ShortcutGrid />

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>음성 인식 기능을 사용하려면 마이크 권한을 허용해주세요.</p>
          <p className="mt-1">Chrome, Safari, Edge 브라우저에서 최적화되어 있습니다.</p>
          <p className="mt-1">3초간 음성이 감지되지 않으면 자동으로 인식이 종료됩니다.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
