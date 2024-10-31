import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCurrentTime } from "./useCurrentTime";
import { fetchCurrentDate } from "../utils/fetchCurrentDate";

jest.mock("../utils/fetchCurrentDate", () => ({
    fetchCurrentDate: jest.fn(),
}));

describe("useCurrentTime", () => {
    const createWrapper = () => {
        const queryClient = new QueryClient();
        return ({ children }: { children: React.ReactNode }) => (
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        );
    };

    beforeEach(() => {
        (fetchCurrentDate as jest.Mock).mockResolvedValue("Error fetching date");
    });

    it("returns 'Loading...' before client-side rendering is detected", () => {
        const { result } = renderHook(() => useCurrentTime(), { wrapper: createWrapper() });
        expect(result.current).toEqual({
            currentTime: "Loading...",
            isLoading: true,
            error: null,
        });
    });

    it("returns fetched data after client-side rendering is detected", async () => {
        (fetchCurrentDate as jest.Mock).mockResolvedValue("Friday, 31.10.2024");

        const { result } = renderHook(() => useCurrentTime(), { wrapper: createWrapper() });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.currentTime).toBe("Friday, 31.10.2024");
            expect(result.current.error).toBeNull();
        });
    });

    it("returns error message if fetch fails", async () => {
        (fetchCurrentDate as jest.Mock).mockResolvedValue("Error fetching date");

        const { result } = renderHook(() => useCurrentTime(), { wrapper: createWrapper() });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.currentTime).toBe("Error fetching date");
            expect(result.current.error).toBeNull();
        });
    });
});