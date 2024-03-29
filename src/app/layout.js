import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LenguajeProvider } from "./context/languajeState";
import { CitiesProvider } from "./context/citiesState";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>Tempora Check</title>
      <body>
        <LenguajeProvider>
          <CitiesProvider>
            <Header />
            {children}
            {/*<Footer />*/}
          </CitiesProvider>
        </LenguajeProvider>
      </body>
    </html>
  );
}
