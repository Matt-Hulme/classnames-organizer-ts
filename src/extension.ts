import * as vscode from 'vscode';
import { parseClassNames } from './utils';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension activated');
    context.subscriptions.push(vscode.commands.registerCommand('extension.sortClassNames', sortClassNames));

    context.subscriptions.push(vscode.workspace.onWillSaveTextDocument((e) => {
        console.log('onWillSaveTextDocument event fired');
        if (e.document.languageId === 'typescript' || e.document.languageId === 'javascript') {
            console.log('Document is TypeScript or JavaScript');
            const edit = sortClassNames(e.document);
            if (edit) {
                console.log('Edit created');
                e.waitUntil(Promise.resolve(edit));
            } else {
                console.log('No edit created');
            }
        } else {
            console.log('Document is not TypeScript or JavaScript');
        }
    }));
}

function sortClassNames(document: vscode.TextDocument): vscode.WorkspaceEdit | undefined {
    console.log('sortClassNames called');
    const code = document.getText();
    const sortedCode = parseClassNames(code);
    if (sortedCode !== code) {
        console.log('Code was sorted');
        const range = new vscode.Range(
            document.positionAt(0),
            document.positionAt(code.length)
        );
        const edit = new vscode.WorkspaceEdit();
        edit.replace(document.uri, range, sortedCode);
        return edit;
    } else {
        console.log('Code was not sorted');
        return undefined;
    }
}