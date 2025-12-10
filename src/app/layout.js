import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import SmoothScroll from "../../components/LenisInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gjonson Berisha",
  description: "Cool website from a cool developer.",
};



export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* <SmoothScroll /> */}
        {children}
      </body>
    </html>
  );
}
