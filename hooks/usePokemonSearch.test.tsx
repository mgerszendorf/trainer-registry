import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePokemonSearch } from "./usePokemonSearch";

global.fetch = jest.fn();

describe("usePokemonSearch", () => {
    const createWrapper = () => {
        const queryClient = new QueryClient();
        return ({ children }: { children: React.ReactNode }) => (
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should not fetch data when query is empty", () => {
        const { result } = renderHook(() => usePokemonSearch(), { wrapper: createWrapper() });
        expect(result.current.searchResults).toEqual([]);
        expect(result.current.isLoading).toBe(false);
    });

    it("fetches search results when query is set", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [{ name: "pikachu" }],
        });

        const { result } = renderHook(() => usePokemonSearch(), { wrapper: createWrapper() });

        result.current.setQuery("pikachu");

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.searchResults).toEqual([{ name: "pikachu" }]);
        });
    });

    it("fetches pokemon details when selectedPokemon is set", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ name: "pikachu", height: 4, weight: 60 }),
        });

        const { result } = renderHook(() => usePokemonSearch(), { wrapper: createWrapper() });

        result.current.setSelectedPokemon("pikachu");

        await waitFor(() => {
            expect(result.current.isLoadingDetails).toBe(false);
            expect(result.current.pokemonDetails).toEqual({ name: "pikachu", height: 4, weight: 60 });
        });
    });

    it("handles error when search request fails", async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Error fetching search data"));

        const { result } = renderHook(() => usePokemonSearch(), { wrapper: createWrapper() });

        result.current.setQuery("bulbasaur");

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.error).not.toBeNull();
            expect(result.current.searchResults).toEqual([]);
        });
    });

    it("handles error when pokemon details request fails", async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Error fetching Pokemon details"));

        const { result } = renderHook(() => usePokemonSearch(), { wrapper: createWrapper() });

        result.current.setSelectedPokemon("bulbasaur");

        await waitFor(() => {
            expect(result.current.isLoadingDetails).toBe(false);
            expect(result.current.pokemonDetails).toBeNull();
        });
    });
});
