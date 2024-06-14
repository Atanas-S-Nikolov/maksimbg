import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/Navbar";
import GlobalNotification from "@/components/utils/GlobalNotification";
import StoreProvider from "@/providers/StoreProvider";
import { theme } from "@/utils/theme";
import { ThemeProvider } from "@mui/material";

export default function RootLayout({ children }) {
  return (
    <>
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <Navbar />
          <section className="main-content">
            {children}
            <GlobalNotification />
          </section>
          <Footer />
        </ThemeProvider>
      </StoreProvider>
    </>
  );
}
