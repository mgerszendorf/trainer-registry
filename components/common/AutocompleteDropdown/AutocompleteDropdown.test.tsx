import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CustomAutocomplete } from "./AutocompleteDropdown";
import userEvent from "@testing-library/user-event";

const renderWithTheme = (component: React.ReactElement) => {
    const theme = createTheme();
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("CustomAutocomplete", () => {
    const options = ["Option 1", "Option 2", "Option 3"];

    it("renders without crashing", () => {
        renderWithTheme(<CustomAutocomplete label="Test Label" options={options} />);
        expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("displays helper text when provided", () => {
        renderWithTheme(<CustomAutocomplete label="Test Label" options={options} helperText="Helper text" />);
        expect(screen.getByText("Helper text")).toBeInTheDocument();
    });

    it("shows loading icon when loading is true", () => {
        renderWithTheme(<CustomAutocomplete label="Test Label" options={options} loading={true} />);
        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("does not show loading icon when loading is false", () => {
        renderWithTheme(<CustomAutocomplete label="Test Label" options={options} loading={false} />);
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    it("renders options correctly", async () => {
        renderWithTheme(<CustomAutocomplete label="Test Label" options={options} />);
        const input = screen.getByRole("combobox");

        await userEvent.click(input);

        options.forEach(option => {
            expect(screen.getByText(option)).toBeInTheDocument();
        });
    });
});
