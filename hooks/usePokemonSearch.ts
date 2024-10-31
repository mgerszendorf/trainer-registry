import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const usePokemonSearch = () => {
    const [query, setQuery] = useState("");
    const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

    const { data: searchResults = [], isLoading, error } = useQuery({
        queryKey: ["searchPokemon", query],
        queryFn: async () => {
            const response = await fetch(`/api/search?name=${query}`);
            if (!response.ok) throw new Error("Error fetching search data");
            return response.json();
        },
        enabled: Boolean(query),
    });

    const { data: pokemonDetails, isLoading: isLoadingDetails } = useQuery({
        queryKey: ["pokemonDetails", selectedPokemon],
        queryFn: async () => {
            if (!selectedPokemon) return null;
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`);
            if (!response.ok) throw new Error("Error fetching Pokemon details");
            return response.json();
        },
        enabled: Boolean(selectedPokemon),
    });

    return {
        searchResults,
        isLoading,
        error,
        setQuery,
        setSelectedPokemon,
        pokemonDetails,
        isLoadingDetails
    };
};
