import * as vscode from 'vscode';
import { parseClassNames } from './utils';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.workspace.onWillSaveTextDocument(async (e) => {
    if (e.document.languageId === 'typescript' || e.document.languageId === 'javascript') {
      const editor = vscode.window.activeTextEditor;
      if (editor && editor.document === e.document) {
        const code = editor.document.getText();
        const sortedCode = parseClassNames(code);
        await editor.edit((editBuilder) => {
          const fullRange = new vscode.Range(
            editor.document.positionAt(0),
            editor.document.positionAt(code.length)
          );
          editBuilder.replace(fullRange, sortedCode);
        });
        await editor.document.save();
      }
    }
  }));
}