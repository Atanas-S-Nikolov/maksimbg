import Navbar from "@/components/header/Navbar";
import { theme } from "@/utils/theme";
import { ThemeProvider } from "@mui/material";

export default function RootLayout({ children }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar/>
        <section className="main-content">
          {children}
        </section>
      </ThemeProvider>
    </>
  )
}
