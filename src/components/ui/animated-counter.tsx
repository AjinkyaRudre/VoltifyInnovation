import { useState, useEffect } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

export const AnimatedCounter = ({ target, duration = 2000, suffix = "" }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
};