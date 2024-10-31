export const fetchCurrentDate = async (): Promise<string> => {
    try {
        const response = await fetch("https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Warsaw");
        if (!response.ok) {
            throw new Error("Failed to fetch current time");
        }
        const data = await response.json();
        const date = new Date(data.dateTime);

        return (
            date.toLocaleDateString("en-GB", {
                weekday: "long",
            }) +
            `, ${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`
        );
    } catch (error) {
        console.error("Error fetching date:", error);
        return "Error fetching date";
    }
};
