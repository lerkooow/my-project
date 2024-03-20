import { ThemeProvider } from "@mui/material/styles";
import Category from "../Category/Category"
import Header from "../Header/Header"
import HomeBanner from "../HomeBanner/HomeBanner";
import BrandDifferent from "../BrandDifferent/BrandDifferent";
import NewMen from "../NewMen/NewMen";
import PopularProducts from "../PopularProducts/PopularProducts";
import JoinForm from "../JoinForm/JoinForm";
import InfoBanner from "../InfoBanner/InfoBanner";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { lightTheme, darkTheme, greyTheme } from "../themes";

function App() {

  const { switches } = useSelector(state => state.onlineStore)

  return (
    <Box sx={{ backgroundColor: switches === "light" ? lightTheme.palette.background.default : switches === "dark" ? darkTheme.palette.background.default : greyTheme.palette.background.default }}>
      <ThemeProvider theme={switches === "light" ? lightTheme : switches === "dark" ? darkTheme : greyTheme}>
        <Box sx={{ minHeight: "132px" }}>
          <Header />
          <Category />
        </Box>
        <HomeBanner />
        <BrandDifferent />
        <NewMen />
        <PopularProducts />
        <JoinForm />
        <InfoBanner />
        <Footer />
      </ThemeProvider>
    </Box >
  )
}

export default App;
