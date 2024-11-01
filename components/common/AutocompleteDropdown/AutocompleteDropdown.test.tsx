import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AutocompleteDropdown } from "./AutocompleteDropdown";
import userEvent from "@testing-library/user-event";

const renderWithTheme = (component: React.ReactElement) => {
    const theme = createTheme();
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("AutocompleteDropdown", () => {
    const options = ["Option 1", "Option 2", "Option 3"];

    it("renders without crashing", () => {
        renderWithTheme(<AutocompleteDropdown label="Test Label" options={options} />);
        expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("displays helper text when provided", () => {
        renderWithTheme(<AutocompleteDropdown label="Test Label" options={options} helperText="Helper text" />);
        expect(screen.getByText("Helper text")).toBeInTheDocument();
    });

    it("shows loading icon when loading is true", () => {
        renderWithTheme(<AutocompleteDropdown label="Test Label" options={options} loading={true} />);
        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("does not show loading icon when loading is false", () => {
        renderWithTheme(<AutocompleteDropdown label="Test Label" options={options} loading={false} />);
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    it("renders options correctly", async () => {
        renderWithTheme(<AutocompleteDropdown label="Test Label" options={options} />);
        const input = screen.getByRole("combobox");

        await userEvent.click(input);

        options.forEach(option => {
            expect(screen.getByText(option)).toBeInTheDocument();
        });
    });
});
