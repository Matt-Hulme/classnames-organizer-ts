import * as vscode from 'vscode';
import { parseClassNames } from './utils/';
// Import any other modules you need from main.ts

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.parseClassNames', () => {
        // The code you place here will be executed every time your command is executed

        // Get the active editor
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        // Get the document
        let document = editor.document;

        // Use your parseClassNames function here
        // For example, you might get the text of the document with document.getText(),
        // and then pass that text to your parseClassNames function

        // Add the code from main.ts here
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}