import type { Metadata } from "next";

import { Roboto } from "next/font/google";

import "./globals.css";

export const metadata: Metadata = {
	title: "Zero Dashboard",
	description: "Zero Dashboard",
};

const roboto = Roboto({
	weight: ["400", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${roboto.className} antialiased dark`}>{children}</body>
		</html>
	);
}
