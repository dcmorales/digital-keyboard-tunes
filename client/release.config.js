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
		'@semantic-release/exec',
		[
			'@semantic-release/github',
			{
				tagFormat: 'client-v${version}',
				name: 'Client Release v${version}',
			},
		],
	],
};
