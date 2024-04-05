import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/Navbar";
import StoreProvider from "@/providers/StoreProvider";
import { theme } from "@/utils/theme";
import { ThemeProvider } from "@mui/material";

export default function RootLayout({ children }) {
  return (
    <>
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <Navbar />
          <section className="main-content">{children}</section>
          <Footer />
        </ThemeProvider>
      </StoreProvider>
    </>
  );
}
