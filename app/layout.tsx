import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "PandaWeather 🐼", description: "A little anime panda who lives in the weather." };
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><head><link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:wght@400;700&display=swap" rel="stylesheet"/></head><body>{children}</body></html>;
}
