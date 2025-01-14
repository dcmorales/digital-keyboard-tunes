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
			'@semantic-release/git',
			{
				assets: ['CHANGELOG.md', 'package.json'],
				message: 'release(client): ${nextRelease.version} [skip ci]',
				noCi: true,
			},
		],
		'@semantic-release/exec',
		[
			'@semantic-release/github',
			{
				tagFormat: 'client-v${nextRelease.version}',
				name: 'Client Release v${nextRelease.version}',
			},
		],
	],
};
