import type {Metadata} from "next";
import {Geist, Geist_Mono, Roboto} from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/sonner";

const roboto = Roboto({
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Desiderata Rater",
    description: "Rate die Desiderata",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body
            className={`${roboto.className} antialiased`}
        >
        <Toaster/>
        {children}
        </body>
        </html>
    );
}
