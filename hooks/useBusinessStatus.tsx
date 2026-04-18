import { isOpenNow } from "@/utils/isOpen";
import {useEffect, useState} from "react";
    
const getMexicoTime = () =>
  new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" })
  );
export function useBusinessStatus() {
    const [now, setNow] = useState<Date | null>(null);
    useEffect(() => {
        const updateTime = () => setNow(getMexicoTime());
        updateTime()
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval)
    }, []);

    if (!now) {
    return {
      isClosingSoon: false,
      diffToCloseMinutes: 0,
      isOpen: false,
      isWeekend: false,
      openHours: 0,
      openMinutes: 0,
      hours: 0,
    };
  }
    return isOpenNow(now);
}