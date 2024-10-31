import { NextResponse } from 'next/server';
import Fuse from 'fuse.js';
import pokemonsData from '../../../data/pokemon.json';

interface Pokemon {
    name: string;
    id: number;
}

const pokemons: Pokemon[] = pokemonsData.data;

const fuse = new Fuse<Pokemon>(pokemons, {
    keys: ['name'],
    threshold: 0.3,
});

const cache = new Map<string, Pokemon[]>();

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    if (!name) {
        return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
    }
    if (cache.has(name)) {
        return NextResponse.json(cache.get(name));
    }

    const results = fuse.search(name).map((result) => result.item);
    cache.set(name, results);

    return NextResponse.json(results);
};
