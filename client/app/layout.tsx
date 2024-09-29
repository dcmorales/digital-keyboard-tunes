// main layout

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@/styles/main.scss';

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
			<body>{children}</body>
		</html>
	);
}
