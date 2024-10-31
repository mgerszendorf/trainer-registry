export interface DetailedPokemon {
    id: number;
    name: string;
    base_experience: number;
    sprites: {
        front_default: string;
    };
    types: PokemonType[];
}

export interface PokemonType {
    type: {
        name: string;
    };
}

export interface BasicPokemon {
    name: string;
    id: number;
}
