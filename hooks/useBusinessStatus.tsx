import { isOpenNow } from "@/utils/isOpen";
import {useEffect, useState} from "react";
    
const getMexicoTime = () =>
  new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" })
  );
export function useBusinessStatus() {
    const [now, setNow] = useState(getMexicoTime());
    useEffect(() => {
        const updateTime = () => setNow(getMexicoTime());
        updateTime()
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval)
    }, []);
    return isOpenNow(now);
}