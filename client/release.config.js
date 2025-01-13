module.exports = {
	branches: ['main'],
	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				preset: 'conventionalcommits',
				releaseRules: [
					{ scope: 'client' }, // trigger release for commits with 'client' scope
					{ scope: null }, // trigger release for commits with no scope
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
