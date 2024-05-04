import * as vscode from 'vscode';
import { parseClassNames } from './utils';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.workspace.onWillSaveTextDocument(async (e) => {
    console.log('onWillSaveTextDocument event triggered');
    if (e.document.languageId === 'typescript' || e.document.languageId === 'javascript') {
      const editor = vscode.window.activeTextEditor;
      if (editor && editor.document === e.document) {
        const code = editor.document.getText();
        console.log('Before sorting class names');
        const sortedCode = parseClassNames(code);
        console.log('After sorting class names');
        if (sortedCode !== code) {
          const range = new vscode.Range(
            editor.document.positionAt(0),
            editor.document.positionAt(code.length)
          );
          const edit = new vscode.WorkspaceEdit();
          edit.replace(e.document.uri, range, sortedCode);
          await vscode.workspace.applyEdit(edit);
        }
      }
    }
  }));
}