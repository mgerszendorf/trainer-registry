import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CustomInput } from "./CustomInput";

const renderWithTheme = (component: React.ReactElement) => {
    const theme = createTheme();
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("CustomInput", () => {
    it("renders without crashing", () => {
        renderWithTheme(<CustomInput label="Test Label" />);
        expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("displays helper text when provided", () => {
        renderWithTheme(<CustomInput label="Test Label" helperText="Helper text" />);
        expect(screen.getByText("Helper text")).toBeInTheDocument();
    });

    it("sets the placeholder text", () => {
        renderWithTheme(<CustomInput label="Test Label" placeholder="Enter text..." />);
        const input = screen.getByPlaceholderText("Enter text...");
        expect(input).toBeInTheDocument();
    });

    it("handles text input changes", () => {
        renderWithTheme(<CustomInput label="Test Label" />);
        const input = screen.getByRole("textbox");

        fireEvent.change(input, { target: { value: "Hello" } });
        expect((input as HTMLInputElement).value).toBe("Hello");
    });

    it("shows error styles when error prop is set", () => {
        renderWithTheme(<CustomInput label="Test Label" helperText="Error text" error />);
        const helperText = screen.getByText("Error text");
        expect(helperText).toBeInTheDocument();
        expect(helperText).toHaveStyle(`color: ${createTheme().palette.error.main}`);
    });
});
