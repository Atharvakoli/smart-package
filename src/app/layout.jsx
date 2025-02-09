import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SmartPack",
  description: "Weather-based packing suggestion application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-200`}>
          <Navbar />
          {children}
          <Footer />
      </body>
    </html>
  );
}
