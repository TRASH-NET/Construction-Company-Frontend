import { Open_Sans } from 'next/font/google';
import './globals.css';
import { ClerkProvider, SignedIn } from '@clerk/nextjs';
import React from 'react';
import Navbar from '@/components/ui/Navbar';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;


const font = Open_Sans({ subsets: ['latin'] })

export const metadata = {
	title: 'Construction Company',
	description: 'Construction, and proyects managments',
}


export default function RootLayout({ children }) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${font.className} flex`}>
					<SignedIn>
						<Navbar />
					</SignedIn>
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}


