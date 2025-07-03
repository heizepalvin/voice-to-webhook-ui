
import { 
  Mic, 
  Settings, 
  Send, 
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

export interface ShortcutCard {
  icon: any;
  title: string;
  color: string;
  active?: boolean;
}

export const shortcutCards: ShortcutCard[] = [
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
