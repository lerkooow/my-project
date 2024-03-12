import { Box, ThemeProvider, createTheme } from "@mui/material";
import Category from "./component/Category/Category"
import Header from "./component/Header/Header"
import HomeBanner from "./component/HomeBanner/HomeBanner";

function App() {

  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box sx={{ minHeight: "132px" }}>
          <Header />
          <Category />
        </Box>
        <HomeBanner />
      </ThemeProvider>
    </div>
  )
}

export default App;
