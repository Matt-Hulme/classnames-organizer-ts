import * as parser from '@babel/parser';
import generate from '@babel/generator';
import { parseClassNames } from './utils/';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.parseClassNames', () => {
        // Get the active editor
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        // Get the document
        let document = editor.document;

        // Get the text content of the document
        let textContent = document.getText();

        // Parse the text content into an AST
        let ast = parser.parse(textContent, { sourceType: 'module', plugins: ['jsx'] });

        // Generate code from the AST
        let { code } = generate(ast);

        // Pass the JSX code to parseClassNames
        const parsedClassNames = parseClassNames(code);
        
        console.log("\nParsed Class Names:", parsedClassNames);
    });

    context.subscriptions.push(disposable);
}