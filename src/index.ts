import * as vscode from 'vscode';
import { GitExtension } from './types/git';
import './config/commitType';

export function activate(context: vscode.ExtensionContext) {
	// GIT
	function getGitExtension() {
		const vscodeGit = vscode.extensions.getExtension<GitExtension>('vscode.git');
		const gitExtension = vscodeGit && vscodeGit.exports;
		return gitExtension;
	}

	const gitExtension = getGitExtension();
	if (!gitExtension?.enabled) {
		vscode.window.showErrorMessage('Git extensions are not currently enabled, please try again after enabled!');
		return false;
	}
	let repo: any = gitExtension.getAPI(1).repositories[0];

	// Init
	console.log('Congratulations, your extension "rioukkevin.vscode-git-commit" is now active!');

	// CMD register
	const pull = vscode.commands.registerCommand('extension.myPull', () => {
		vscode.commands.executeCommand('git.pull');
	});

	const push = vscode.commands.registerCommand('extension.myPush', () => {
		vscode.commands.executeCommand('git.push');
	});

	context.subscriptions.push(pull);
	context.subscriptions.push(push);
}