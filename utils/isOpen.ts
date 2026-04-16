const getMexicoTime = () =>
  new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" })
  );
export const isOpenNow = (date?: Date) => {
    const now = date ?? getMexicoTime();
    const getNextOpening = (current: Date) => {
        const next = new Date(current);
        const day = current.getDay();
        const hour = current.getHours();

        if ((day === 6 || day === 0) && hour < 14) {
            next.setHours(14, 0, 0, 0);
            return next;
        }

        if (day === 6 && hour >= 22) {
            next.setDate(current.getDate() + 1);
            next.setHours(14, 0, 0, 0);
            return next;
        }

        if (day === 0 && hour >= 22) {
            next.setDate(current.getDate() + 6);
            next.setHours(14, 0, 0, 0);
            return next;
        }

        const daysUntilSaturday = (6 - day + 7) % 7;
        next.setDate(current.getDate() + daysUntilSaturday);
        next.setHours(14, 0, 0, 0);
        return next;
    };

        const day = now.getDay(); // 0 = Domingo, 6 = Sábado
        const hours = now.getHours(); // 0 - 23
        //const minutes = now.getMinutes();

        const isWeekend = day === 0 || day === 6;
        const isWithinHours = hours >= 14 && hours < 22;
        const isOpen = isWeekend && isWithinHours;

        const closingTime = new Date(now);
        closingTime.setHours(22, 0, 0, 0);

        const diffToCloseMs = closingTime.getTime() - now.getTime();
        const diffToCloseMinutes = Math.floor(diffToCloseMs / 1000 / 60);

        const isClosingSoon = isOpen && diffToCloseMinutes > 0 && diffToCloseMinutes <= 60;

        const nextOpening = getNextOpening(now);
        const diffToOpenMs = nextOpening.getTime() - now.getTime();
        const openHours = Math.floor(diffToOpenMs / 1000 / 60 / 60);
        const openMinutes = Math.floor((diffToOpenMs / 1000 / 60) % 60);

        return {isClosingSoon, diffToCloseMinutes, isOpen, isWeekend, openHours, openMinutes, hours };
    };