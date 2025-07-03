
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WebhookSenderProps {
  transcribedText: string;
  onTextCleared: () => void;
}

export const WebhookSender: React.FC<WebhookSenderProps> = ({
  transcribedText,
  onTextCleared
}) => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

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
          onChange={(e) => setWebhookUrl(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Send Button */}
      {transcribedText && (
        <div className="flex justify-center">
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
      )}
    </>
  );
};
