import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TrainerRegistryForm } from "./TrainerRegistryForm";
import { usePokemonSearch } from "@/hooks/usePokemonSearch";

jest.mock("../../../hooks/usePokemonSearch");

const mockUsePokemonSearch = usePokemonSearch as jest.Mock;

const renderWithProviders = (component: React.ReactElement) => {
    const theme = createTheme();
    const queryClient = new QueryClient();
    return render(
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                {component}
            </ThemeProvider>
        </QueryClientProvider>
    );
};

describe("TrainerRegistryForm", () => {
    beforeEach(() => {
        mockUsePokemonSearch.mockReturnValue({
            searchResults: [],
            isLoading: false,
            error: null,
            setQuery: jest.fn(),
            setSelectedPokemon: jest.fn(),
            pokemonDetails: null,
            isLoadingDetails: false,
        });
    });

    it("renders the form with all elements", () => {
        renderWithProviders(<TrainerRegistryForm />);

        expect(screen.getByText("Trainer's name")).toBeInTheDocument();
        expect(screen.getByText("Trainer's age")).toBeInTheDocument();
        expect(screen.getByText("Pokemon name")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    });

    it("handles input changes in the form", () => {
        renderWithProviders(<TrainerRegistryForm />);

        const nameInput = screen.getByPlaceholderText("Trainer's name");
        const ageInput = screen.getByPlaceholderText("Trainer's age");

        fireEvent.change(nameInput, { target: { value: "Ash" } });
        fireEvent.change(ageInput, { target: { value: "10" } });

        expect((nameInput as HTMLInputElement).value).toBe("Ash");
        expect((ageInput as HTMLInputElement).value).toBe("10");
    });

    it("resets the form when the reset button is clicked", async () => {
        renderWithProviders(<TrainerRegistryForm />);

        const nameInput = screen.getByPlaceholderText("Trainer's name");
        const ageInput = screen.getByPlaceholderText("Trainer's age");
        const resetButton = screen.getByRole("button", { name: "Reset" });

        fireEvent.change(nameInput, { target: { value: "Ash" } });
        fireEvent.change(ageInput, { target: { value: "10" } });

        fireEvent.click(resetButton);

        await waitFor(() => {
            expect((nameInput as HTMLInputElement).value).toBe("");
            expect((ageInput as HTMLInputElement).value).toBe("");
        });
    });

    it("validates that the trainer's name is between 2 and 20 characters", async () => {
        renderWithProviders(<TrainerRegistryForm />);

        const nameInput = screen.getByPlaceholderText("Trainer's name");
        const submitButton = screen.getByRole("button", { name: "Submit" });

        fireEvent.change(nameInput, { target: { value: "A" } });
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText("Required from 2 to 20 symbols")).toBeInTheDocument();
        });

        fireEvent.change(nameInput, { target: { value: "A".repeat(21) } });
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText("Required from 2 to 20 symbols")).toBeInTheDocument();
        });
    });

    it("validates that age is between 16 and 99", async () => {
        renderWithProviders(<TrainerRegistryForm />);

        const ageInput = screen.getByPlaceholderText("Trainer's age");
        const submitButton = screen.getByRole("button", { name: "Submit" });

        fireEvent.change(ageInput, { target: { value: "15" } });
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText("Required range from 16-99")).toBeInTheDocument();
        });

        fireEvent.change(ageInput, { target: { value: "100" } });
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText("Required range from 16-99")).toBeInTheDocument();
        });
    });

    it("validates that a Pokemon is selected", async () => {
        renderWithProviders(<TrainerRegistryForm />);

        const submitButton = screen.getByRole("button", { name: "Submit" });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("Choose something")).toBeInTheDocument();
        });
    });
});
