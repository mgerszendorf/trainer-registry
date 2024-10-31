import { useQuery } from "@tanstack/react-query";
import { fetchCurrentDate } from "@/utils/fetchCurrentDate";

export const useCurrentTime = () => {
    const { data: currentTime, isLoading, error } = useQuery({
        queryKey: ["currentTime"],
        queryFn: fetchCurrentDate,
        refetchInterval: 60000,
        staleTime: 60000,
    });

    return { currentTime, isLoading, error };
};
