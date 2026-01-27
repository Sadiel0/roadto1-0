import { useEffect, useState } from 'react';
import { FIGHT_DATE } from '../utils/dateUtils';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export function useCountdownTimer(): CountdownTime {
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const now = new Date();
    const diff = FIGHT_DATE.getTime() - now.getTime();
    return Math.max(0, Math.floor(diff / 1000));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = FIGHT_DATE.getTime() - now.getTime();
      const newSeconds = Math.max(0, Math.floor(diff / 1000));
      setSecondsLeft(newSeconds);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(secondsLeft / (60 * 60 * 24));
  const hours = Math.floor((secondsLeft % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((secondsLeft % (60 * 60)) / 60);
  const seconds = secondsLeft % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds: secondsLeft,
  };
}
