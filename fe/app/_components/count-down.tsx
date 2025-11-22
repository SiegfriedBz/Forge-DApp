"use client";

import { type FC, startTransition, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTokens } from "../_hooks/use-tokens";

type Props = {
  coolDownEndTime: number
  className?: string;
};

export const Countdown:FC<Props> = (props) => {
  const {coolDownEndTime, className } = props

  const [timeLeft, setTimeLeft] = useState<number>(0);

  const {setIsCoolDown, setCoolDownEndTime} = useTokens()

  useEffect(() => {
    if (!coolDownEndTime) return;

    const updateTimeLeft = () => {
      const now = Date.now();
      const remainingTime = Math.max(0, Math.floor((coolDownEndTime - now) / 1000));
      setTimeLeft(remainingTime);

      if(remainingTime === 0) {
        startTransition(() => {
            setIsCoolDown(false)
            setCoolDownEndTime(null)
        })
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);
    
    return () => clearInterval(interval);
  }, [coolDownEndTime, setIsCoolDown, setCoolDownEndTime]);

  return <span className={cn("font-bold", className)}>{timeLeft}</span>;
};