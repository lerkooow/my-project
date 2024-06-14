import { createTheme, TypeBackground, TypeText } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    background: TypeBackground;
    text: TypeText;
  }
  interface PaletteOptions {
    background?: Partial<TypeBackground>;
    text?: Partial<TypeText>;
  }
}

export const lightTheme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: "#726E8D",
    },
    secondary: {
      main: "#22202E",
    },
    background: {
      default: "#FFFFFF",
      accent1: "#F9F9F9",
      accent2: "#FFF",
      accent3: "#5e4632",
      accent4: "rgba(198, 201, 201, 0.1)",
      paper: "#FFF",
      button: "#2A254B",
    } as Partial<TypeBackground>,
    text: {
      primary: "#2A254B",
      secondary: "#383359",
      accent1: "#FFF",
    } as Partial<TypeText>,
  },
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#FFFFFF",
    },
    background: {
      default: "#22202e",
      accent1: "#000",
      accent2: "#22202e",
      accent3: "#2e1f20",
      accent4: "rgba(0, 0, 0, 0.2)",
      paper: "#22202e",
      button: "#FFFFFF",
    } as Partial<TypeBackground>,
    text: {
      primary: "#FFFFFF",
      secondary: "#9E9AA7",
      accent1: "#000",
    } as Partial<TypeText>,
  },
});

export const greyTheme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: "#666666",
    },
    secondary: {
      main: "#333333",
    },
    background: {
      default: "rgba(169, 166, 166, 0.561)",
      accent1: "#424040",
      accent2: "#9c9898",
      accent3: "#1e1e1e",
      accent4: "rgba(57, 49, 49, 0.1)",
      paper: "rgb(169, 166, 166)",
      button: "#333333",
    } as Partial<TypeBackground>,
    text: {
      primary: "#333333",
      secondary: "#666666",
      accent1: "#FFF",
    } as Partial<TypeText>,
  },
});
