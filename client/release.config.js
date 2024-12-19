module.exports = {
	branches: ['main'],
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		[
			'@semantic-release/git',
			{
				assets: ['CHANGELOG.md', 'package.json'],
				message: 'release(frontend): ${nextRelease.version} [skip ci]',
			},
		],
		{
			path: '@semantic-release/exec',
			cmd: 'cd client && pnpm exec semantic-release',
		},
		{
			path: '@semantic-release/github',
			tagFormat: 'frontend-v${nextRelease.version}',
			name: 'Frontend Release v${nextRelease.version}',
		},
	],
};
