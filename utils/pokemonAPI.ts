interface PokemonData {
    id: number;
    base_experience: number;
    types: Array<{
        type: {
            name: string;
        };
    }>;
    sprites: {
        front_default: string;
    };
}

export const fetchPokemonData = async (pokemonName: string): Promise<PokemonData> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    if (!response.ok) {
        throw new Error('Error fetching Pokemon data');
    }
    const data = await response.json();
    return {
        id: data.id,
        base_experience: data.base_experience,
        types: data.types,
        sprites: {
            front_default: data.sprites.front_default,
        },
    };
}
