// main layout

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import '@/styles/global.scss';

export const metadata: Metadata = {
	title: 'Digital Keyboard Tunes',
	description: 'Create custom tunes in key!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>): JSX.Element {
	return (
		<html lang="en">
			<body>
				<KeyboardOptionsProvider>
					<Header />

					<main>{children}</main>

					<Footer />
				</KeyboardOptionsProvider>
			</body>
		</html>
	);
}
