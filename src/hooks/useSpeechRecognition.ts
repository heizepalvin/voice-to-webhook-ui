
import { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';

export const useSpeechRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const recognitionRef = useRef<any>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearSilenceTimeout = () => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
  };

  const startSilenceTimeout = () => {
    clearSilenceTimeout();
    silenceTimeoutRef.current = setTimeout(() => {
      console.log('3초간 음성이 감지되지 않아 자동으로 종료합니다.');
      if (recognitionRef.current && isRecording) {
        recognitionRef.current.stop();
        toast.info('3초간 음성이 감지되지 않아 자동으로 종료되었습니다.');
      }
    }, 3000);
  };

  const startRecording = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('음성 인식이 지원되지 않는 브라우저입니다.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'ko-KR';

    recognition.onstart = () => {
      setIsRecording(true);
      toast.success('음성 인식을 시작합니다.');
      startSilenceTimeout(); // 시작과 동시에 무음 타이머 시작
    };

    recognition.onresult = (event: any) => {
      clearSilenceTimeout(); // 음성이 감지되면 타이머 리셋
      
      let finalTranscript = '';
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      
      if (finalTranscript) {
        setTranscribedText(prev => prev + finalTranscript + ' ');
        startSilenceTimeout(); // 최종 텍스트가 추가된 후 다시 타이머 시작
      } else if (interimTranscript) {
        startSilenceTimeout(); // 중간 결과에서도 타이머 리셋
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      toast.error('음성 인식 중 오류가 발생했습니다.');
      setIsRecording(false);
      clearSilenceTimeout();
    };

    recognition.onend = () => {
      setIsRecording(false);
      clearSilenceTimeout();
    };

    recognition.start();
    recognitionRef.current = recognition;
  }, [isRecording]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      toast.success('음성 인식을 중지했습니다.');
    }
    setIsRecording(false);
    clearSilenceTimeout();
  }, []);

  const clearText = useCallback(() => {
    setTranscribedText('');
  }, []);

  return {
    isRecording,
    transcribedText,
    startRecording,
    stopRecording,
    clearText
  };
};
