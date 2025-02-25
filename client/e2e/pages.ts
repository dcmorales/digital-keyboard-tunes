// pages
// An array of page objects used for tests that iterate through pages.

interface Page {
	name: string;
	url: string;
}

export const pages: Page[] = [
	{ name: 'home', url: process.env.STAGING_URL! },
	{ name: 'about', url: `${process.env.STAGING_URL}/about` },
];
