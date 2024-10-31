// utils/fetchCurrentDate.ts
export const fetchCurrentDate = async (): Promise<string> => {
    try {
        const response = await fetch(
            "https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Warsaw"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch current time");
        }

        const data = await response.json();
        const date = new Date(data.dateTime);

        const formatter = new Intl.DateTimeFormat("en-GB", {
            weekday: "long",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        const formattedDate = formatter.format(date);
        return formattedDate.replace(/\//g, ".");
    } catch (error) {
        console.error("Error fetching date:", error);
        return "Error fetching date";
    }
};