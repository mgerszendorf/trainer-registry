import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CustomButton } from "./CustomButton";
import { VariantType } from "./variantTypes";

const renderWithTheme = (component: React.ReactElement) => {
    const theme = createTheme();
    return { ...render(<ThemeProvider theme={theme}>{component}</ThemeProvider>), theme };
};

describe("CustomButton", () => {
    it("renders without crashing", () => {
        renderWithTheme(<CustomButton>Click me</CustomButton>);
        expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
    });

    it("renders with primary variant", () => {
        renderWithTheme(
            <CustomButton variantType={VariantType.Primary}>Primary Button</CustomButton>
        );
        const button = screen.getByRole("button", { name: "Primary Button" });
        expect(button).toHaveTextContent("Primary Button");
        expect(button).toBeEnabled();
    });

    it("renders with soft variant", () => {
        renderWithTheme(
            <CustomButton variantType={VariantType.Soft}>Soft Button</CustomButton>
        );
        const button = screen.getByRole("button", { name: "Soft Button" });
        expect(button).toHaveTextContent("Soft Button");
        expect(button).toBeEnabled();
    });

    it("is disabled when 'disabled' prop is true", () => {
        renderWithTheme(<CustomButton disabled>Disabled Button</CustomButton>);
        const button = screen.getByRole("button", { name: "Disabled Button" });
        expect(button).toBeDisabled();
    });

    it("handles click events", () => {
        const handleClick = jest.fn();
        renderWithTheme(<CustomButton onClick={handleClick}>Click me</CustomButton>);
        const button = screen.getByRole("button", { name: "Click me" });
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
