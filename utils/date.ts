export class DateTime {
    public static getCurrentTime(): string {
        const now = new Date();

        const time = now.toLocaleTimeString("pt-BR", {
            hour: '2-digit', minute: '2-digit',hour12: true
        });

        return time;
    }

    public static getCurrentDate(): string {
        const now = new Date();

        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        return now.toLocaleDateString('pt-BR', options);
    }
}