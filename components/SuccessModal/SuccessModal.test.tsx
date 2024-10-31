import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SuccessModal } from "./SuccessModal";

const renderWithTheme = (component: React.ReactElement) => {
    const theme = createTheme();
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("SuccessModal", () => {
    it("renders the modal with success message when open", () => {
        renderWithTheme(<SuccessModal open={true} onClose={jest.fn()} onReset={jest.fn()} />);

        expect(screen.getByText("Success")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Reset form" })).toBeInTheDocument();
    });

    it("does not render the modal when open is false", () => {
        renderWithTheme(<SuccessModal open={false} onClose={jest.fn()} onReset={jest.fn()} />);

        expect(screen.queryByText("Success")).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: "Reset form" })).not.toBeInTheDocument();
    });

    it("calls onClose when the modal backdrop is clicked", () => {
        const onCloseMock = jest.fn();
        renderWithTheme(<SuccessModal open={true} onClose={onCloseMock} onReset={jest.fn()} />);

        fireEvent.click(document.querySelector('.MuiBackdrop-root')!);

        expect(onCloseMock).toHaveBeenCalled();
    });

    it("calls onReset when the Reset form button is clicked", () => {
        const onResetMock = jest.fn();
        renderWithTheme(<SuccessModal open={true} onClose={jest.fn()} onReset={onResetMock} />);

        const resetButton = screen.getByRole("button", { name: "Reset form" });
        fireEvent.click(resetButton);

        expect(onResetMock).toHaveBeenCalled();
    });
});
