export class TimeHelper
{
    static timeAgo(date: Date) {
        const seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);
        const intervalDays = seconds / 86400;
        const intervalHour = seconds / 3600;
        const intervalSeconds = seconds / 60;

        return {
            days: Math.floor(intervalDays),
            hour: Math.floor(intervalHour),
            minutes: Math.floor(intervalSeconds),
            seconds: Math.floor(seconds)
        }
    }
}