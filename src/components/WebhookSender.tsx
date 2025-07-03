
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface WebhookSenderProps {
  transcribedText: string;
  onTextCleared: () => void;
  autoSendEnabled: boolean;
  onToggleAutoSend: () => void;
  webhookUrl: string;
  onWebhookUrlChange: (url: string) => void;
}

export const WebhookSender: React.FC<WebhookSenderProps> = ({
  transcribedText,
  onTextCleared,
  autoSendEnabled,
  onToggleAutoSend,
  webhookUrl,
  onWebhookUrlChange
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const sendToWebhook = async (textToSend?: string) => {
    const text = textToSend || transcribedText;
    
    if (!webhookUrl.trim()) {
      toast.error('웹훅 URL을 입력해주세요.');
      return;
    }

    if (!text.trim()) {
      toast.error('전송할 텍스트가 없습니다.');
      return;
    }

    setIsProcessing(true);
    console.log('Sending to webhook:', webhookUrl);
    console.log('Text content:', text);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          text: text.trim(),
          timestamp: new Date().toISOString(),
          source: 'voice-to-text-app'
        }),
      });

      toast.success('텍스트가 성공적으로 전송되었습니다!');
      onTextCleared();
    } catch (error) {
      console.error("Error sending to webhook:", error);
      toast.error('웹훅 전송 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <>
      {/* Webhook URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Make.com 웹훅 URL
        </label>
        <Input
          type="url"
          placeholder="https://hook.integromat.com/..."
          value={webhookUrl}
          onChange={(e) => onWebhookUrlChange(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Auto Send Toggle */}
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            바로 전송
          </label>
          <span className="text-xs text-gray-500">
            음성 인식 완료 후 자동으로 웹훅에 전송
          </span>
        </div>
        <Switch
          checked={autoSendEnabled}
          onCheckedChange={onToggleAutoSend}
        />
      </div>

      {/* Send Button - Only show when auto send is disabled and there's text */}
      {!autoSendEnabled && transcribedText && (
        <div className="flex justify-center">
          <Button
            onClick={() => sendToWebhook()}
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
      )}

      {/* Auto Send Status */}
      {autoSendEnabled && (
        <div className="text-center text-sm text-green-600 bg-green-50 rounded-lg p-3">
          <span className="font-medium">자동 전송 활성화됨</span>
          <p className="text-xs mt-1">음성 인식이 종료되면 자동으로 웹훅에 전송됩니다</p>
        </div>
      )}
    </>
  );
};
