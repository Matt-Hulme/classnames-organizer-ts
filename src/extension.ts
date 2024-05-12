import * as vscode from 'vscode';
import { parseClassNames } from './utils';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.sortClassNames', async () => {
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
        await editor.edit(editBuilder => {
            let fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(textContent.length)
            );
            editBuilder.replace(fullRange, sortedCode);
        });
    });

    context.subscriptions.push(disposable);

    vscode.workspace.onWillSaveTextDocument(async event => {
        // Get the document
        let document = event.document;
    
        // Get the text content of the document
        let textContent = document.getText();
    
        // Call parseClassNames
        const sortedCode = parseClassNames(textContent);
    
        // Replace the original code with the sorted code
        const edit = new vscode.WorkspaceEdit().replace(
            document.uri, 
            new vscode.Range(document.positionAt(0), document.positionAt(textContent.length)), 
            sortedCode
        );
        const success = await vscode.workspace.applyEdit(edit);
g    });
}
