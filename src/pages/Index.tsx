import React, { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { 
  Mic, 
  Settings, 
  Send, 
  Square, 
  AudioWaveform,
  Globe,
  MessageSquare,
  Zap,
  Clock,
  Star,
  Calendar,
  Image,
  Music,
  Calculator,
  Camera,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);

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
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        }
      }
      
      if (finalTranscript) {
        setTranscribedText(prev => prev + finalTranscript + ' ');
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      toast.error('음성 인식 중 오류가 발생했습니다.');
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  }, []);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      toast.success('음성 인식을 중지했습니다.');
    }
    setIsRecording(false);
  }, []);

  const sendToWebhook = async () => {
    if (!webhookUrl.trim()) {
      toast.error('웹훅 URL을 입력해주세요.');
      return;
    }

    if (!transcribedText.trim()) {
      toast.error('전송할 텍스트가 없습니다.');
      return;
    }

    setIsProcessing(true);
    console.log('Sending to webhook:', webhookUrl);
    console.log('Text content:', transcribedText);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          text: transcribedText.trim(),
          timestamp: new Date().toISOString(),
          source: 'voice-to-text-app'
        }),
      });

      toast.success('텍스트가 성공적으로 전송되었습니다!');
      setTranscribedText('');
    } catch (error) {
      console.error("Error sending to webhook:", error);
      toast.error('웹훅 전송 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  const shortcutCards = [
    { icon: Mic, title: '음성 인식', color: 'bg-gradient-to-br from-pink-400 to-pink-600', active: true },
    { icon: Send, title: '웹훅 전송', color: 'bg-gradient-to-br from-blue-400 to-blue-600', active: true },
    { icon: Settings, title: '설정', color: 'bg-gradient-to-br from-gray-400 to-gray-600' },
    { icon: Globe, title: '웹 브라우저', color: 'bg-gradient-to-br from-cyan-400 to-cyan-600' },
    { icon: MessageSquare, title: '메시지', color: 'bg-gradient-to-br from-green-400 to-green-600' },
    { icon: Zap, title: '자동화', color: 'bg-gradient-to-br from-yellow-400 to-yellow-600' },
    { icon: Clock, title: '타이머', color: 'bg-gradient-to-br from-red-400 to-red-600' },
    { icon: Star, title: '즐겨찾기', color: 'bg-gradient-to-br from-purple-400 to-purple-600' },
    { icon: Calendar, title: '캘린더', color: 'bg-gradient-to-br from-indigo-400 to-indigo-600' },
    { icon: Image, title: '사진첩', color: 'bg-gradient-to-br from-orange-400 to-orange-600' },
    { icon: Music, title: '음악', color: 'bg-gradient-to-br from-rose-400 to-rose-600' },
    { icon: Calculator, title: '계산기', color: 'bg-gradient-to-br from-teal-400 to-teal-600' },
    { icon: Camera, title: '카메라', color: 'bg-gradient-to-br from-emerald-400 to-emerald-600' },
    { icon: MapPin, title: '지도', color: 'bg-gradient-to-br from-lime-400 to-lime-600' },
  ];

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
            {/* Webhook URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Make.com 웹훅 URL
              </label>
              <Input
                type="url"
                placeholder="https://hook.integromat.com/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Recording Controls */}
            <div className="flex justify-center space-x-4">
              {!isRecording ? (
                <Button 
                  onClick={startRecording}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <Mic className="mr-2 h-6 w-6" />
                  음성 인식 시작
                </Button>
              ) : (
                <Button 
                  onClick={stopRecording}
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
                
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => setTranscribedText('')}
                    variant="outline"
                    className="px-6 py-2"
                  >
                    텍스트 지우기
                  </Button>
                  <Button
                    onClick={sendToWebhook}
                    disabled={isProcessing}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        전송 중...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        웹훅으로 전송
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Shortcuts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {shortcutCards.map((card, index) => (
            <Card 
              key={index}
              className={`${card.color} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer relative overflow-hidden group`}
            >
              <div className="text-white">
                <card.icon className="h-8 w-8 mb-3" />
                <h3 className="font-semibold text-sm">{card.title}</h3>
                {card.active && (
                  <Badge className="absolute top-2 right-2 bg-white/20 text-white border-white/30 text-xs">
                    활성
                  </Badge>
                )}
              </div>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl"></div>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>음성 인식 기능을 사용하려면 마이크 권한을 허용해주세요.</p>
          <p className="mt-1">Chrome, Safari, Edge 브라우저에서 최적화되어 있습니다.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
