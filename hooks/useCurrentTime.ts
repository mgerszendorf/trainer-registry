import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentDate } from "@/utils/fetchCurrentDate";

export const useCurrentTime = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { data: currentTime = "Loading...", isLoading, error } = useQuery({
        queryKey: ["currentTime"],
        queryFn: fetchCurrentDate,
        refetchInterval: 6000000,
        staleTime: 6000000,
        retry: false,
        enabled: isClient,
    });

    return { currentTime, isLoading, error };
};
