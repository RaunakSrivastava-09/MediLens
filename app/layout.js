import { Lora, Poppins } from "next/font/google";
import "@/styles/globals.css";
import Providers from "@/components/Providers";

const lora = Lora({ subsets: ["latin"], variable: "--font-lora", weight: ["500", "600", "700"] });
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"]
});

export const metadata = {
  title: "MediLens — Smart Medication Companion",
  description: "Understand every prescription, in your own language."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${poppins.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
