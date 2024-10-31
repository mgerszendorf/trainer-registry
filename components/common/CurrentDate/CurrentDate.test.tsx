import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CurrentDate } from "./CurrentDate";
import { ReactElement } from "react";

jest.mock("../../../hooks/useCurrentTime", () => ({
    useCurrentTime: jest.fn(),
}));

const mockUseCurrentTime = require("../../../hooks/useCurrentTime").useCurrentTime;

const renderWithTheme = (component: ReactElement) => {
    const theme = createTheme();
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("CurrentDate component", () => {
    it("renders without crashing", () => {
        mockUseCurrentTime.mockReturnValue({
            currentTime: "",
            isLoading: false,
            error: null,
        });

        renderWithTheme(<CurrentDate />);
        expect(screen.getByRole("heading", { level: 6 })).toBeInTheDocument();
    });

    it("displays 'Loading...' when loading", () => {
        mockUseCurrentTime.mockReturnValue({
            currentTime: "",
            isLoading: true,
            error: null,
        });

        renderWithTheme(<CurrentDate />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("displays error message on error", () => {
        mockUseCurrentTime.mockReturnValue({
            currentTime: "",
            isLoading: false,
            error: "Error",
        });

        renderWithTheme(<CurrentDate />);
        expect(screen.getByText("Error fetching time")).toBeInTheDocument();
    });

    it("displays current time when loaded", () => {
        mockUseCurrentTime.mockReturnValue({
            currentTime: "12:34 PM",
            isLoading: false,
            error: null,
        });

        renderWithTheme(<CurrentDate />);
        expect(screen.getByText("12:34 PM")).toBeInTheDocument();
    });
});
