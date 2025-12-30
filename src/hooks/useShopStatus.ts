import { useState, useEffect } from 'react';
import { clientConfig } from '@/config/clientConfig';

interface OpenSlot {
  open: string;
  close: string;
}

const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

export const useShopStatus = () => {
  const [status, setStatus] = useState<{ isOpen: boolean; message: string }>({ isOpen: false, message: '' });

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0-6
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTime = currentHour * 60 + currentMinute;

      const hours = clientConfig.openingHours as Record<number, OpenSlot[]>;
      const todaySlots = hours[currentDay] || [];

      // 1. Vérifier si on est OUVERT maintenant
      let isOpen = false;
      for (const slot of todaySlots) {
        const [openH, openM] = slot.open.split(':').map(Number);
        const [closeH, closeM] = slot.close.split(':').map(Number);
        const openTime = openH * 60 + openM;
        const closeTime = closeH * 60 + closeM;

        if (currentTime >= openTime && currentTime < closeTime) {
          isOpen = true;
          break;
        }
      }

      if (isOpen) {
        setStatus({ isOpen: true, message: 'Ouvert' });
        return;
      }

      // 2. Si FERMÉ, trouver la prochaine ouverture
      // On cherche pour aujourd'hui, puis demain, etc.
      for (let i = 0; i < 7; i++) {
        const checkDay = (currentDay + i) % 7;
        const slots = hours[checkDay] || [];

        for (const slot of slots) {
          const [openH, openM] = slot.open.split(':').map(Number);
          const openTime = openH * 60 + openM;

          // Si c'est aujourd'hui, il faut que l'heure d'ouverture soit dans le futur
          if (i === 0 && openTime <= currentTime) continue;

          // On a trouvé le prochain créneau
          const dayName = i === 0 ? "aujourd'hui" : i === 1 ? "demain" : days[checkDay];
          setStatus({ 
            isOpen: false, 
            message: `Ouvre ${dayName === days[checkDay] ? 'le' : ''} ${dayName} à ${slot.open}` 
          });
          return;
        }
      }
      
      setStatus({ isOpen: false, message: 'Fermé temporairement' });
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Vérifier chaque minute
    return () => clearInterval(interval);
  }, []);

  return status;
};