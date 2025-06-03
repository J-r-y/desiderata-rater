import type {Metadata} from "next";
import {Roboto} from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/sonner";
import {ThemeProvider} from "@/components/provider/theme-provider";
import * as React from "react";

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
        <ThemeProvider
            attribute={"class"}
            defaultTheme={"system"}
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
