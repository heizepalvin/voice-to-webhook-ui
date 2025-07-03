
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { shortcutCards } from '@/data/shortcuts';

export const ShortcutGrid: React.FC = () => {
  return (
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
  );
};
