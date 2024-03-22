import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
    typography: {
        fontFamily: '"Poppins", sans-serif',
        fontWeight: 700,
    },
    palette: {
        primary: {
            main: '#726E8D',
        },
        secondary: {
            main: '#22202E',
        },
        background: {
            default: '#FFFFFF',
            accent1: "#F9F9F9",
            accent2: "#FFF",
            accent3: "#5e4632",
            accent4: "rgba(198, 201, 201, 0.1)",
            paper: "#FFF",
            button: "#2A254B"
        },
        text: {
            primary: '#2A254B',
            secondary: '#383359',
            accent1: "#FFF",
        },
    },
});

export const darkTheme = createTheme({
    typography: {
        fontFamily: '"Poppins", sans-serif',
        fontWeight: 700,
    },
    palette: {
        primary: {
            main: '#FFFFFF',
        },
        secondary: {
            main: '#FFFFFF',
        },
        background: {
            default: '#22202e',
            accent1: "#000",
            accent2: "#22202e",
            accent3: "#2e1f20",
            accent4: "rgba(0, 0, 0, 0.2)",
            paper: "#22202e",
            button: "#FFFFFF"
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#9E9AA7',
            accent1: "#000",
        },
    },
});

export const greyTheme = createTheme({
    typography: {
        fontFamily: '"Poppins", sans-serif',
        fontWeight: 700,
    },
    palette: {
        primary: {
            main: '#666666',
        },
        secondary: {
            main: '#333333',
        },
        background: {
            default: 'rgba(169, 166, 166, 0.561)',
            accent1: "#424040",
            accent2: "#9c9898",
            accent3: "#1e1e1e",
            accent4: "rgba(57, 49, 49, 0.1)",
            paper: "rgba(169, 166, 166, 0.561)",
            button: "#333333"
        },
        text: {
            primary: '#333333',
            secondary: '#666666',
            accent1: "#FFF",
        },
    },
});
