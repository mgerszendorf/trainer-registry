import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentDate } from "@/utils/fetchCurrentDate";

export const useCurrentTime = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { data: currentTime, isLoading, error } = useQuery({
        queryKey: ["currentTime"],
        queryFn: fetchCurrentDate,
        refetchInterval: 6000000,
        staleTime: 6000000,
        enabled: isClient,
    });

    if (!isClient) {
        return { currentTime: "Loading...", isLoading: true, error: null };
    }

    return { currentTime, isLoading, error };
};