import * as vscode from 'vscode';
import { parseClassNames } from './utils';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.sortClassNames', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            console.log('No active text editor');
            return; 
        }

        let document = editor.document;

        let textContent = document.getText();

        const sortedCode = parseClassNames(textContent);
        
        editor.edit(editBuilder => {
            let fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(textContent.length)
            );
            editBuilder.replace(fullRange, sortedCode);
        });
    });

    context.subscriptions.push(disposable);
}