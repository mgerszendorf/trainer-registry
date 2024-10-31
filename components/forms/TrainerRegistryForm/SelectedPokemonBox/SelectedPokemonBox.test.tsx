import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SelectedPokemonBox } from "./SelectedPokemonBox";
import { DetailedPokemon } from "@/types/pokemon.types";

const renderWithTheme = (component: React.ReactElement) => {
    const theme = createTheme();
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("SelectedPokemonBox", () => {
    const mockPokemon: DetailedPokemon = {
        id: 1,
        name: "bulbasaur",
        base_experience: 64,
        sprites: {
            front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        },
        types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
    };

    it("renders loading state when loading is true", () => {
        renderWithTheme(<SelectedPokemonBox pokemon={mockPokemon} loading={true} />);
        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("displays 'Your pokemon' text when pokemon is not available", () => {
        renderWithTheme(<SelectedPokemonBox pokemon={null} loading={false} />);
        expect(screen.getByText("Your pokemon")).toBeInTheDocument();
    });

    it("displays pokemon information when pokemon is available", () => {
        renderWithTheme(<SelectedPokemonBox pokemon={mockPokemon} loading={false} />);
        expect(screen.getByText("Name: bulbasaur")).toBeInTheDocument();
        expect(screen.getByText("Base experience: 64")).toBeInTheDocument();
        expect(screen.getByText("Id: 1")).toBeInTheDocument();
        expect(screen.getByAltText("bulbasaur sprite")).toBeInTheDocument();
    });

    it("displays pokemon types", () => {
        renderWithTheme(<SelectedPokemonBox pokemon={mockPokemon} loading={false} />);
        expect(screen.getByText("grass")).toBeInTheDocument();
        expect(screen.getByText("poison")).toBeInTheDocument();
    });
});
