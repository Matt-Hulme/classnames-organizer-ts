import * as vscode from 'vscode';
import { parseClassNames } from './utils';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.sortClassNames', () => {
        // Get the active editor
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            console.log('No active text editor');
            return; // No open text editor
        }

        // Get the document
        let document = editor.document;

        // Get the text content of the document
        let textContent = document.getText();

        // Call parseClassNames
        const sortedCode = parseClassNames(textContent);
        
        // Replace the original code with the sorted code
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