import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import { AuthProvider } from "./auth-context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SmartPack",
  description: "Weather-based packing suggestion application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-200`}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
