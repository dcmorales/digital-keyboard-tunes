module.exports = {
	branches: ['main'],
	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				preset: 'conventionalcommits',
				releaseRules: [
					{ scope: 'client' }, // trigger release for commits with 'client' scope
					{ scope: 'server', release: false }, // ignore server commits
				],
			},
		],
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		[
			'@semantic-release/git',
			{
				assets: ['CHANGELOG.md', 'package.json'],
				message: 'release(client): ${nextRelease.version} [skip ci]',
			},
		],
		{
			path: '@semantic-release/exec',
			cmd: 'sed -i "s/(client)//g" client/CHANGELOG.md && cd client && pnpm exec semantic-release', // remove (client) from the changelog then trigger release
		},
		{
			path: '@semantic-release/github',
			tagFormat: 'client-v${nextRelease.version}',
			name: 'Client Release v${nextRelease.version}',
		},
	],
};
