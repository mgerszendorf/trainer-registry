import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#9747FF",
            dark: "#7135BF",
            light: "#E5D1FF",
        },
        grey: {
            100: "#2A2A2A",
            200: "#7F7F7F",
            300: "#E4E4E4",
            400: "#EEEEEE",
        },
        error: {
            main: "#FF4E4E",
        },
        action: {
            disabledBackground: "#D3D3D3",
        },
    },
    typography: {
        fontFamily: "var(--font-ibm-vga)",
    },
});

export default theme;
