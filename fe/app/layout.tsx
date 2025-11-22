import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookieToInitialState } from "@wagmi/core";
import { headers } from "next/headers";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { wagmiHttpConfig } from "./_config/wagmi";
import { RootProviders } from "./_context/root-providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Forge",
	description: "The Art of Forging ERC1155 Begins Here.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const initialWagmiState = cookieToInitialState(
		wagmiHttpConfig,
		(await headers()).get("cookie"),
	);

	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<RootProviders initialWagmiState={initialWagmiState}>
					<Header />
					<main className="flex-1">{children}</main>
					<Footer />
				</RootProviders>
			</body>
		</html>
	);
}
