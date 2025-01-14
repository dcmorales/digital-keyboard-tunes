module.exports = {
	branches: ['main'],
	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				preset: 'conventionalcommits',
				releaseRules: [
					{ scope: 'server', release: false }, // ignore server commits
				],
			},
		],
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		[
			'@semantic-release/exec',
			{
				prepareCmd: 'sed -i "s/(client)//g" client/CHANGELOG.md', // remove (client) from the changelog then trigger release
			},
		],
		[
			'@semantic-release/github',
			{
				tagFormat: 'client-v${nextRelease.version}',
				name: 'Client Release v${nextRelease.version}',
			},
		],
	],
};
