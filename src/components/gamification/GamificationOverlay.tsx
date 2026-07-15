'use client';

import * as React from 'react';
import { XPToast } from './XPToast';
import { AchievementModal } from './AchievementModal';
import { LevelUpModal } from './LevelUpModal';

export function GamificationOverlay() {
  const [xpData, setXpData] = React.useState({ isVisible: false, xp: 0, message: '' });
  const [achievementData, setAchievementData] = React.useState<{ 
    isVisible: boolean; 
    achievement?: { title: string; description: string; icon?: React.ReactNode; xpReward?: number; } 
  }>({ isVisible: false });
  const [levelUpData, setLevelUpData] = React.useState({ isVisible: false, newLevel: 1 });

  // For demonstration, we'll expose a global object to trigger these manually,
  // or they could be triggered by Context/Zustand in a real app.
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).triggerGamification = {
      xp: (xp: number, message: string) => setXpData({ isVisible: true, xp, message }),
      achievement: (title: string, description: string, xpReward: number) => 
        setAchievementData({ 
          isVisible: true, 
          achievement: { title, description, xpReward } 
        }),
      levelUp: (newLevel: number) => setLevelUpData({ isVisible: true, newLevel })
    };
  }, []);

  return (
    <>
      <XPToast 
        isVisible={xpData.isVisible} 
        xp={xpData.xp} 
        message={xpData.message}
        onClose={() => setXpData(prev => ({ ...prev, isVisible: false }))} 
      />
      
      {achievementData.achievement && (
        <AchievementModal
          isOpen={achievementData.isVisible}
          achievement={achievementData.achievement}
          onClose={() => setAchievementData(prev => ({ ...prev, isVisible: false }))}
        />
      )}

      <LevelUpModal
        isOpen={levelUpData.isVisible}
        newLevel={levelUpData.newLevel}
        onClose={() => setLevelUpData(prev => ({ ...prev, isVisible: false }))}
      />
    </>
  );
}
